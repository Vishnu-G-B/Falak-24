import {json} from "@sveltejs/kit";
import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
const eventDb = client.db("events");
const eventRegistration = eventDb.collection("ev_registration_data");

export async function POST({request}) {
    const {email, eventPriority, memberEmail} = await request.json();
    console.log(email, eventPriority, memberEmail);
    let foundUser = await eventRegistration.findOne({email: email, event_priority: eventPriority});
    if (!foundUser) {
        return json({success: false, error: "/?status=1&details=You%20Are%20Not%20The%20Team%20Leader"});
    }
    console.log(foundUser);
    try {
        // Remove the member from the team_members array
        await eventRegistration.updateOne(
            {email, event_priority: eventPriority},
            {$pull: {team_members: memberEmail}}
        );
        return json({success: true, error: "/?status=2&details=Successfully%20Removed%20Member"});
    } catch (error) {
        return json({success: false, error: error.message});
    }
}
