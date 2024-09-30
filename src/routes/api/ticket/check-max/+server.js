import {json} from "@sveltejs/kit";
import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
const eventDb = client.db("events");
const eventRegistration = eventDb.collection("ev_registration_data");

export async function POST({request}) {
    const {email, toCheck} = await request.json();
    for (let priority of toCheck) {
        let apiEventsURL = `https://cms.mitblrfest.org/api/events?filters[EventPriority][$eq]=${priority}`;
        const response = await fetch(apiEventsURL);
        let jsonResponse = await response.json();
        let requiredEvent = jsonResponse.data[0].attributes;

        let numberOfRegistrations = await eventRegistration.countDocuments({event_priority: priority});
        if (!requiredEvent.isClosed) {
            if (requiredEvent.maxTeams === -1) {
                return json({redirect: true});
            }
            if (numberOfRegistrations >= requiredEvent.maxTeams) {
                return json({redirect: false, state: '?status=1&details=Maximum Event Registrations Reached :('});
            } else {
                return json({redirect: true});
            }
        } else {
            return json({
                redirect: false,
                state: '?status=1&details=Registrations Are Closed, Please do not buy the pass'
            });
        }

    }
}
