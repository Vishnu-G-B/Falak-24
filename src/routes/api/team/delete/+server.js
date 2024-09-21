import {json} from "@sveltejs/kit";
import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
const eventDb = client.db("events");
const eventRegistration = eventDb.collection("ev_registration_data");

export async function POST({request}) {
    const {email, eventPriority} = await request.json();
    let foundUser = await eventRegistration.findOne({email: email, event_priority: eventPriority});
    if (!foundUser) {
        return json({success: false, error: "/?status=1&details=You%20Are%20Not%20The%20Team%20Leader\""});
    }


    try {
        // Delete the entire document
        await eventRegistration.deleteOne({email, event_priority: eventPriority});
        return json({success: true, error: "/?status=2&details=Successfully%20Deleted%20Team"});
    } catch (error) {
        return json({success: false, error: error.message});
    }
}
