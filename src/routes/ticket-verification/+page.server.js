import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
import {redirect} from "@sveltejs/kit";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const attendanceDb = client.db('Attendance');
const authMapping = attendanceDb.collection('att_auth_mapping');
const markedTickets = attendanceDb.collection('att_marked_tickets');
const userDatabase = client.db("User");
const money = client.db("Money");
const passes = money.collection("mo_passes");
const user = userDatabase.collection("us_user_data");
const event = client.db("events");
const eventRegistration = event.collection("ev_registration_data");

export const load = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) {
        redirect(302, '/?status=1&details=Sign In To Access');
    }

    let foundMapping = await authMapping.findOne({email: session.user.email})
    if (!foundMapping) {
        redirect(302, '/?status=1&details=Not Authorised');
    }

    let permissions = foundMapping.event_access.split(',').filter(function (x) {
        return x != "";
    });
    let allowedEvents = [];
    console.log(permissions);
    if (permissions[0] !== 'ALL#') {
        for (let permission of permissions) {
            let apiEventsURL = `https://cms.mitblrfest.org/api/events?filters[EventPriority][$eq]=${permission}`;
            const response = await fetch(apiEventsURL);
            let jsonResponse = await response.json();
            allowedEvents.push(jsonResponse.data[0]);
        }
    } else {
        let apiEventsURL = `https://cms.mitblrfest.org/api/events`;
        const response = await fetch(apiEventsURL);
        let jsonResponse = await response.json();
        allowedEvents = jsonResponse.data;
    }

    return {allowedEvents: allowedEvents};
}


export const actions = {
    getPassDetails: async (event) => {
        const formData = await event.request.formData();
        let passToken = formData.get('passToken');
        let eventPriority = formData.get('eventPriority');
        console.log(passToken, eventPriority);

        if (eventPriority.toString() === 'undefined') {
            return {
                success: false,
                state: '?status=1&details=No Tampering Please',
            }
        }

        let foundMarked = await markedTickets.findOne({
            pass_token: passToken,
            event_priority: Number(eventPriority),
        });
        if (foundMarked) {
            return {
                success: false,
                state: '?status=1&details=User Already Marked For This Event'
            }
        }

        const foundPass = await passes.findOne({
            token: passToken,
            banned: false,
        });
        if (!foundPass) {
            return {
                success: false,
                state: '?status=1&details=Pass Does Not Exist'
            }
        }

        const foundUser = await user.findOne({
            email: foundPass.email,
        }, {projection: {_id: 0}});
        if (!foundUser) {
            return {
                success: false,
                state: '?status=1&details=Can Not Find Users Registration Details'
            }
        }

        let apiEventsURL = `https://cms.mitblrfest.org/api/events?filters[EventPriority][$eq]=${eventPriority}`;
        const response = await fetch(apiEventsURL);
        let jsonResponse = await response.json();
        let requiredEvent = jsonResponse.data[0].attributes;
        let correctPass = false;
        if (foundUser.is_mahe) {
            if (requiredEvent.EventName !== 'Proshow') {
                if (requiredEvent.passRequiredM !== foundPass.pass_name) {
                    {
                        return {
                            success: false,
                            state: `?status=1&details=Pass is ${foundPass.pass_name} but the event is ${requiredEvent.EventName}. Not Compatible`
                        }
                    }
                }
            }
        } else {
            if (requiredEvent.passRequiredNM === foundPass.pass_name) {
            } else {
                return {
                    success: false,
                    state: `?status=1&details=Pass is ${foundPass.pass_name} but the event is ${requiredEvent.EventName.replace('.', '')}. Not Compatible`
                }
            }
        }

        if (eventPriority.toString() === '1') {
            return {
                success: true,
                foundUser: foundUser,
                foundEventRegistration: {event_priority: "1", email: foundPass.email, event_name: "Proshow"}
            };
        }
        const foundUserRegistration = await eventRegistration.findOne({
            email: foundPass.email,
            event_priority: requiredEvent.EventPriority,
        }, {projection: {_id: 0}});
        if (!foundUserRegistration) {
            return {
                success: false,
                state: '?status=1&details=User Not Registered For This Event But The Pass Exists'
            }
        }
        return {success: true, foundUser: foundUser, foundEventRegistration: foundUserRegistration};
    },

    markAttendance: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) {
            redirect(302, '/?status=1&details=Sign In To Access');
        }

        const formData = await event.request.formData();
        let email = formData.get('email');
        let passToken = formData.get('passToken');
        let eventPriority = formData.get('eventPriority');
        console.log(passToken, eventPriority);

        if (eventPriority.toString() === 'undefined') {
            return {
                success: false,
                state: '?status=1&details=No Tampering Please',
            }
        }

        let foundPass = await passes.findOne({
            email: email,
            token: passToken,
            banned: false,
        });
        if (!foundPass) {
            return {
                success: false,
                state: '?status=1&details=No Pass Found For The Given Token',
            }
        }

        let foundUser = await user.findOne({
            email: email,
        });
        if (!foundUser) {
            return {
                success: false,
                state: '?status=1&details=No User Found',
            }
        }

        let apiEventsURL = `https://cms.mitblrfest.org/api/events?filters[EventPriority][$eq]=${eventPriority}`;
        const response = await fetch(apiEventsURL);
        let jsonResponse = await response.json();
        let requiredEvent = jsonResponse.data[0].attributes;
        if (foundUser.is_mahe) {
            if (requiredEvent.EventName !== 'Proshow') {
                if (requiredEvent.passRequiredM !== foundPass.pass_name) {
                    {
                        return {
                            success: false,
                            state: `?status=1&details=Pass is ${foundPass.pass_name} but the event is ${requiredEvent.EventName}. Not Compatible`
                        }
                    }
                }
            }
        } else {
            if (requiredEvent.passRequiredNM === foundPass.pass_name) {
            } else {
                return {
                    success: false,
                    state: `?status=1&details=Pass is ${foundPass.pass_name} but the event is ${requiredEvent.EventName.replace('.', '')}. Not Compatible`
                }
            }
        }

        let foundMarked = await markedTickets.findOne({
            email: foundUser.email,
            event_priority: requiredEvent.EventPriority,
        });
        if (foundMarked) {
            return {
                success: false,
                state: '?status=1&details=User Already Marked',
            }
        }

        await markedTickets.insertOne({
            email: foundUser.email,
            event_priority: requiredEvent.EventPriority
        });
        return {
            success: true,
            state: '?status=2&details=User Marked Successfully',
        }
    }
}

