import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
import {redirect} from "@sveltejs/kit";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const userDatabase = client.db("User");
const money = client.db("Money");
const passes = money.collection("mo_passes");
const user = userDatabase.collection("us_user_data");

export const load = async (event) => {
    //API REQUEST URL TO STRAPI
    let apiEventsURL = "https://cms.mitblrfest.org/api/events";

    try {
        const session = await event.locals.auth();
        let foundUser;
        let foundPasses;
        let userSignedIn;
        if (session?.user) {
            userSignedIn = true;
            foundUser = await user.findOne({
                email: session.user.email,
            }, {projection: {_id: 0}});
            foundPasses = await passes.find({
                email: session.user.email, banned: false,
            }, {projection: {_id: 0}}).toArray();
        } else {
            userSignedIn = false;
        }
        const response = await fetch(apiEventsURL);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        let eventList = await response.json();

        eventList = eventList.data
            .map(event => {
                const eventAttributes = event.attributes;
                let eventDate = eventAttributes.EventDate.split("-")[2];
                return {
                    ...eventAttributes, eventDate
                }
            })
        // const categorizedEvents = {
        //     mainevents: [],
        //     cultural: [],
        //     esports: []
        // };
        // eventList.forEach(event => {
        //     const priority = event.attributes.EventPriority;
        //     if (priority >= 1000 && priority < 2000) {
        //         categorizedEvents.mainevents.push(event);
        //     } else if (priority >= 2000 && priority < 3000) {
        //         categorizedEvents.cultural.push(event);
        //     } else if (priority >= 3000) {
        //         categorizedEvents.esports.push(event);
        //     }
        // });


        const sortByDate = (a, b) => new Date(a.EventDate) - new Date(b.EventDate);

        const main_events = eventList
            .filter(event => event.EventPriority >= 1000 && event.EventPriority < 2000)
            .sort(sortByDate);
        const cultural_events = eventList
            .filter(event => event.EventPriority >= 2000 && event.EventPriority < 3000)
            .sort(sortByDate);
        const esports_events = eventList
            .filter(event => event.EventPriority >= 3000 && event.EventPriority < 4000)
            .sort(sortByDate);
        const sports_events = eventList
            .filter(event => event.EventPriority >= 4000)
            .sort(sortByDate)

        // console.log(main_events);
        // console.log(cultural_events);
        // console.log(esports_events);

        return {
            main_events, cultural_events, esports_events, sports_events, foundUser, foundPasses, userSignedIn
        }


    } catch (error) {
        console.error(error);
        return {
            events: {
                mainevents: [], cultural: [], esports: []
            }, error: error.message
        }
    }
}

export const actions = {
    attemptRegistration: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) {
            return {success: false, state: '?status=1&details=Sign%20In%20To%20Access'};
        }
        let foundUser = await user.findOne({email: session.user.email});
        if (!foundUser) {
            redirect(302, '/tickets?status=1&details=User%20Not%20Registered&register=true');
        }

        let foundPasses = await passes.find(
            {email: session.user.email, banned: false}, {projection: {_id: 0}}
        ).toArray();

        console.log(foundPasses);

        if (!foundPasses) {
            redirect(302, '/tickets?status=1&details=No%20Tickets%20Bought');
        }

        const formData = await event.request.formData();
        let passRequiredNM = formData.get('passRequiredNM');
        let passRequiredM = formData.get('passRequiredM');
        let eventPriority = formData.get('eventPriority');
        let eventName = formData.get('eventName');

        let hasRequiredPass = false;
        if (foundUser.is_mahe) {
            for (let i = 0; i < foundPasses.length; i++) {
                if (foundPasses[i].pass_name === passRequiredM) {
                    hasRequiredPass = true
                    break
                }
            }
        } else if (!foundUser.is_mahe) {
            if(passRequiredNM === 'none') {
                hasRequiredPass = true;
            }
            for (let i = 0; i < foundPasses.length; i++) {
                if (foundPasses[i].pass_name === passRequiredNM) {
                    hasRequiredPass = true;
                    break
                }
            }
        }

        if (hasRequiredPass) {
            return {redirectTo: `/events/compete?register=true&event-priority=${eventPriority}&event-name=${eventName}`}
        } else {
            console.log('redirect to tickets');
            console.log(passRequiredM);
            return {redirectTo: `/tickets?status=1&details=Please%20Buy%20The%20${(foundUser.is_mahe ? passRequiredM : passRequiredNM)}%20Ticket%20To%20Register`}
        }
    }
}
