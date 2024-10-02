// +page.server.js
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
    'MAHE Pass': 'Flagship',
    'Solo Dance': 'Solo Dance NM',
    'Group Dance': 'Group Dance NM',
    'Solo Singing': 'Solo Singing NM',
    'eSports': 'Esports',
    'Mono Acting': 'Mono Acting NM',
    'Fashion Show': 'Fashion Show NM',
    'Battle of Bands': 'BOB NM',
    'Drama': 'Drama NM',
    'Photography': 'Photo-Op NM',
    'Short Film Making': 'Film Making NM',
    'Ad Design': 'Ad Design NM',
    'Football': 'Football',
    'Basketball(Boys)': 'Mens Basketball',
    'Basketball(girls)': 'Womens Basketball',
    'Cricket': 'Cricket',
    'Volleyball': 'Volleyball',
    'Athletics': 'Athletics',
    'Badminton(Boys)': 'Mens Badminton',
    'Badminton(girls)': 'Womens Badminton',
    'Badminton(mixed)': 'Mixed Badminton',
    'Table Tennis': 'Table Tennis',
    'Chess': 'Chess',
    'Echo Pulse': 'Echo Pulse NM',
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
    return {
        email: foundUser.email,
        phoneNumber: foundUser.userPhoneNumber,
    }
}


export const actions = {
    checkPaymentAndGeneratePass: async (event) => {
        const session = await event.locals.auth();
        let foundUser = await user.findOne({email: session.user.email});
        if (!foundUser) {
            redirect(302, '/tickets?status=1&details=User%20Not%20Registered');
        }
        console.log(foundUser.userPhoneNumber);
        let payments = await fetchPaymentLogs(1, foundUser.userPhoneNumber);
        console.log(payments.data.docs);
        if (!payments) {
            redirect(302, '/payment/m-check?status=1&details=No%20Payments%20Found');
        }
        if (payments.data.totalDocs === 0) {
            redirect(302, '/payment/m-check?status=1&details=No%20Payments%20Found');
        } else {

            if (payments.data.totalPages === 1) {
                for (let i = 0; i < payments.data.docs.length; i++) {
                    console.log("Event Name as per Manipal API", payments.data.docs[i].event_name);
                    console.log("Event mapping as per our Database", passMapping[payments.data.docs[i].event_name]);
                    let trimmed;
                    if (payments.data.docs[i].event_name) {
                        trimmed = payments.data.docs[i].event_name.trim();
                    }
                    let passName = passMapping[trimmed];

                    if (passName !== undefined) {
                        let foundPass = await passes.findOne({
                            email: session.user.email,
                            pass_name: passName.toString(),
                            banned: false,
                        });

                        console.log('foundPass', foundPass)
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
                                pass_name: passMapping[trimmed],
                                token: generatedTokenForPass,
                                banned: false,
                            })
                        }
                    }
                    if (payments.data.docs[i].esports) {
                        console.log("Esports Generated through esports=True");
                        let esportsPassFound = await passes.findOne({
                            email: session.user.email,
                            pass_name: 'Esports',
                            banned: false,
                        });
                        if (!esportsPassFound) {
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
                                pass_name: 'Esports',
                                token: generatedTokenForPass,
                                banned: false,
                            })
                        }
                    }
                }
                redirect(302, '/my-tickets?status=2&details=Tickets%20Generated!');
            }
        }
    },
    updatePhoneNumber: async (event) => {
        const session = await event.locals.auth();
        if (!session?.user) {
            redirect(302, '/tickets?status=1&details=Sign In To Access');
        }

        const data = await event.request.formData();
        const newPhoneNumber = data.get('newPhoneNumber').trim();
        const phoneNumberRegex = /^[0-9]{10}$/;
        if (!phoneNumberRegex.test(newPhoneNumber)) {
            return {success: false, message: "Invalid phone number format"};
        }
        try {
            const email = session.user.email;
            const userPasses = await passes.find({email: email}).toArray();
            if (userPasses.length !== 0) {
                return {
                    success: false,
                    message: "You cannot change your phone number if you have already have a pass! Contact IT.",
                    code: "scamPt"
                };
            }
            console.log(userPasses.length);
            const foundUser = await user.findOne({email});
            if (!foundUser) {
                return {success: false, message: "User not authenticated"};
            }
            const existingUser = await user.findOne({userPhoneNumber: newPhoneNumber});
            console.log(existingUser);
            if (existingUser) {
                return {success: false, message: "This phone number is already associated with another account"};
            }

            const result = await user.updateOne(
                {email: email},
                {$set: {userPhoneNumber: newPhoneNumber}}
            );

            if (result.modifiedCount === 1) {
                return {success: true, message: "Phone number updated successfully!"};
            } else {
                return {success: false, message: "Failed to update phone number, contact IT."};
            }
        } catch (error) {
            console.error("Error updating phone number:", error);
            return {success: false, message: "An error occurred while updating the phone number"};
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
