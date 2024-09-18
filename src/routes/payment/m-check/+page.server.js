import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
import {redirect} from "@sveltejs/kit";
import {v4 as uuidv4} from "uuid";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const userDatabase = client.db("User");
const money = client.db("Money");
const passes = money.collection("mo_passes");
const user = userDatabase.collection("us_user_data");

let passMapping = {
    'CULTURAL': 'Flagship',
    'ESPORTS': 'Esports',
}

export const load = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) {
        redirect(302, '/?status=1&details=Sign%20In%20To%20Access');
    }

    const foundUser = await user.findOne({
        email: session.user.email,
    });
    if (!foundUser) {
        redirect(302, '/?status=1&details=User%20Not%20Registered');
    }
}


export const actions = {
    checkPaymentAndGeneratePass: async (event) => {
        const session = await event.locals.auth();
        let foundUser = await user.findOne({email: session.user.email});
        let payments = await fetchPaymentLogs(1, foundUser.userPhoneNumber);
        if (payments.data.totalDocs === 0) {
            redirect(302, '/m-check?status=1&details=No%20Payments%20Found');
        } else {
            if (payments.data.totalPages === 1) {
                for (let i = 0; i < payments.data.docs.length; i++) {
                    let foundPass = await passes.findOne({
                        email: session.user.email,
                        pass_name: passMapping[payments.data.docs[i].event_type],
                        banned: false,
                    });
                    if (!foundPass) {
                        let generatedTokenForPass;
                        while (true) {
                            generatedTokenForPass = uuidv4().toString().slice(29, 35);
                            let foundToken = await passes.findOne({
                                token: generatedTokenForPass,
                            })
                            if (!foundToken) {
                                break;
                            }
                        }
                        await passes.insertOne({
                            email: session.user.email,
                            pass_name: passMapping[payments.data.docs[i].event_type],
                            token: generatedTokenForPass,
                            banned: false,
                        })
                    }
                }
                redirect(302, '/my-tickets?status=2&details=Tickets%20Generated!');
            }
        }
    }
}

async function fetchPaymentLogs(pageNumber = 1, mobileNumber) {
    const apiUrl = `https://api.manipal.edu/api/v1/falak-single-payment-log?mobile=${mobileNumber}&pageNumber=${pageNumber}`;
    const fetchedResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
            "accesskey": process.env.MANIPAL_ACCESS_KEY,
            "accesstoken": process.env.MANIPAL_ACCESS_TOKEN,
        }
    });
    return await fetchedResponse.json();
}