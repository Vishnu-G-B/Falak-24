import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
import {redirect} from "@sveltejs/kit";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const money = client.db("Money");
const passes = money.collection("mo_passes");
const userDatabase = client.db("User");
const user = userDatabase.collection("us_user_data");

export const load = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) {
        redirect(302, '/tickets?status=1&details=Signed%20Out');
    } else {
        let foundUser = await user.findOne({email: session.user.email})
        if (!foundUser) {
            redirect(302, '/tickets?status=1&details=User%20Not%20Registered');
        } else {
            let ownedPasses = await passes.find({
                email: session.user.email,
                banned: false,
                pass_name: {$nin: ['CC__v1', 'staff__v1']}
            }).toArray()
            console.log(ownedPasses);
            if (ownedPasses.length === 2) {
                redirect(302, '/?status=2?details=Passes%20Already%20Owned');
            }
        }
    }
}