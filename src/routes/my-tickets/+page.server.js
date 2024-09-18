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
    const session = await event.locals.auth();
    if (!session?.user) {
        redirect(302, '/tickets?status=1&details=Sign%20In%20To%20Access');
    }

    let foundPasses = await passes.find({email: session.user.email, banned: false}, {projection: {_id: 0}}).toArray();
    return {passes: foundPasses};
}