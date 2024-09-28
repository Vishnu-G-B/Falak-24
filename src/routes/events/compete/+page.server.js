import {redirect} from "@sveltejs/kit";
import {MongoClient} from "mongodb";
import {v4 as uuidv4} from "uuid";

const client = new MongoClient(process.env.MONGO_URL);
const userDatabase = client.db("User");
const money = client.db("Money");
const passes = money.collection("mo_passes");
const user = userDatabase.collection("us_user_data");
const event = client.db("events");
const eventRegistration = event.collection("ev_registration_data");

export let load = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) {
        redirect(302, '/events?status=1&details=Sign%20In%20To%20Access');
    }
    let apiEventsURL = "https://cms.mitblrfest.org/api/events";
    const response = await fetch(apiEventsURL);
    let eventList = await response.json();

    let registrationOwnerOrSoloData = await eventRegistration.find({
        email: session.user.email,
    }, {projection: {_id: 0}}).toArray();

    let registrationMemberData = await eventRegistration.find({
        team_members: session.user.email,
        email: {$ne: session.user.email},
    }, {projection: {_id: 0}}).toArray();

    return {
        eventList: eventList.data,
        registrationData: {ownerOrSolo: registrationOwnerOrSoloData, member: registrationMemberData}
    }
}

export const actions = {
    attemptEventRegistration: async (event) => {
        const session = await event.locals.auth();

        let foundUser = await user.findOne({email: session.user.email});
        if (!foundUser) {
            redirect(302, '/tickets?status=1&details=User%20Not%Registered&register=true');
        }

        let foundPasses = await passes.find(
            {email: session.user.email, banned: false}, {projection: {_id: 0}}
        ).toArray();

        console.log(foundPasses);

        if (!foundPasses) {
            redirect(302, '/tickets?status=1&details=No%20Tickets%20Bought');
        }

        const formData = await event.request.formData();
        let eventPriority = formData.get('eventPriority');
        let teamName = formData.get('teamName');

        if (eventPriority.toString() === 'undefined') {
            return {
                success: false,
                state: '?status=1&details=No Tampering Please',
            }
        }

        let apiEventsURL = `https://cms.mitblrfest.org/api/events?filters[EventPriority][$eq]=${eventPriority}`;
        const response = await fetch(apiEventsURL);
        let jsonResponse = await response.json();
        // check if jsonResponse is empty
        let requiredEvent = jsonResponse.data[0].attributes;

        if (!requiredEvent.isClosed) {
            let hasRequiredPass = false;
            if (foundUser.is_mahe) {
                for (let i = 0; i < foundPasses.length; i++) {
                    if (foundPasses[i].pass_name === requiredEvent.passRequiredM) {
                        hasRequiredPass = true
                        break
                    }
                }
            } else if (!foundUser.is_mahe) {
                if (requiredEvent.passRequiredNM === 'none') {
                    hasRequiredPass = true;
                } else if (requiredEvent.passRequiredNM === 'deny') {
                    return {
                        success: false,
                        state: `?status=1&details=Not Open For NON MAHE Students`,
                    }
                } else {
                    for (let i = 0; i < foundPasses.length; i++) {
                        if (foundPasses[i].pass_name === requiredEvent.passRequiredNM) {
                            hasRequiredPass = true;
                            break
                        }
                    }
                }
            }

            if (hasRequiredPass) {
                // check if already a team owner? or already registered in a solo event
                let findRegistration = await eventRegistration.findOne({
                    email: session.user.email,
                    event_priority: requiredEvent.EventPriority,
                });
                if (findRegistration) {
                    return {
                        success: false,
                        state: `?status=1&details=Already Registered For ${requiredEvent.EventName}`
                    }
                } else {
                    let registrationCount = await eventRegistration.countDocuments({event_priority: requiredEvent.EventPriority});
                    if (requiredEvent.maxTeamMembers !== -1 && registrationCount >= requiredEvent.maxTeamMembers) {
                        return {
                            success: false,
                            state: `?status=1&details=Maximum Event Registrations Reached :(`
                        }
                    }
                    if (requiredEvent.isTeamEvent) {
                        // check if not part of any team
                        let member = await eventRegistration.findOne({
                            is_team: true,
                            email: {$ne: session.user.email},
                            team_members: session.user.email,
                            event_priority: requiredEvent.EventPriority,
                        });
                        if (member) {
                            return {
                                success: false,
                                state: `?status=1&details=Already Part Of Another Team For This Event`,
                            }
                        } else {
                            let generatedToken;
                            while (true) {
                                generatedToken = uuidv4().toString().slice(29, 35);
                                let foundToken = await eventRegistration.findOne({
                                    join_code: generatedToken,
                                })
                                if (!foundToken) {
                                    break;
                                }
                            }
                            await eventRegistration.insertOne({
                                email: session.user.email,
                                event_name: requiredEvent.EventName,
                                team_name: teamName,
                                is_team: true,
                                team_member_count: 1,
                                join_code: generatedToken,
                                max_team_members: requiredEvent.maxTeamMembers,
                                team_members: [session.user.email],
                                event_priority: requiredEvent.EventPriority,
                            })
                        }
                    } else {
                        await eventRegistration.insertOne({
                            email: session.user.email,
                            event_name: requiredEvent.EventName,
                            is_team: false,
                            event_priority: eventPriority,
                        });
                    }
                }
                return {
                    success: true,
                    state: `?status=2&details=Registration%20Successfull%20For%20${requiredEvent.EventName}`
                }
            } else {
                redirect(302, `/tickets?status=1&details=Please Buy The ${foundUser.is_mahe ? requiredEvent.passRequiredM : requiredEvent.passRequiredNM} Ticket To Register`);
            }
        } else {
            let getEventData = await eventRegistration.find({
                email: session.user.email,
            });
            return {
                success: false,
                state: `?status=1&details=Registration%20For%20${requiredEvent.EventName}%20Is%20Closed`,
            }
        }
    },
    joinTeam: async (event) => {
        const session = await event.locals.auth();
        let foundUser = await user.findOne({
            email: session.user.email,
        }, {projection: {_id: 0}});
        if (!foundUser) {
            redirect(302, '/tickets?status=1&details=User Not Registered&register=true');
        }

        const formData = await event.request.formData();
        let joinCode = formData.get('joinCode');

        console.log(joinCode);
        if (joinCode === 'undefined' || joinCode === 'null') {
            return {
                success: false,
                state: '?status=1&details=No Tampering Please',
            }
        } else if (joinCode.toString().length !== 6) {
            return {
                success: false,
                state: '?status=1&details=No Tampering Please',
            }
        }

        let foundTeam = await eventRegistration.findOne({
            join_code: joinCode.toString(),
        });
        if (!foundTeam) {
            return {
                success: false,
                state: '?status=1&details=Invalid Join Code',
            }
        }

        if (foundTeam.team_member_count === foundTeam.max_team_members) {
            return {
                success: false,
                state: '?status=1&details=Team Full',
            }
        }
        if (foundTeam.email === session.user.email || foundTeam.team_members.includes(session.user.email)) {
            return {
                success: false,
                state: '?status=1&details=Already Joined This Team!',
            }
        }

        let apiEventsURL = `https://cms.mitblrfest.org/api/events?filters[EventName][$eq]=${foundTeam.event_name}`;
        const response = await fetch(apiEventsURL);
        let jsonResponse = await response.json();
        if (jsonResponse.data[0]) {
            let requiredEvent = jsonResponse.data[0].attributes;

            if (!requiredEvent.isTeamEvent) {
                return {
                    success: 'false',
                    state: '?status=1&details=Catastrophic Failure Contact IT Department',
                }
            }

            if (requiredEvent.passRequiredNM === 'Esports' || requiredEvent.passRequiredM === 'Esports') {
                let passFound = await passes.findOne({
                    email: session.user.email,
                    banned: false,
                    pass_name: 'Esports',
                });
                if (!passFound) {
                    redirect(302, `/tickets?status=1&details=Please Buy The Esports Pass To Join A Team`);
                }
            } else if (requiredEvent.passRequiredM === 'Flagship' && foundUser.is_mahe) {
                let passFound = await passes.findOne({
                    email: session.user.email,
                    banned: false,
                    pass_name: 'Flagship',
                });
                if (!passFound) {
                    redirect(302, `/tickets?status=1&details=Please Buy The Flagship Pass To Join A Team`);
                }
            }

            await eventRegistration.updateOne({
                join_code: joinCode,
            }, {
                $push: {'team_members': session.user.email},
                $inc: {'team_member_count': 1},
            });
            return {success: true, state: '?status=2&details=Joined The Team Successfully!'};
        } else {
            return {
                success: false,
                state: '?status=2&details=Event Does Not Exist. If We Are Wrong, Please Let The IT Team Know.'
            }
        }
    }
}
