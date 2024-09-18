import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
import {fail, redirect} from "@sveltejs/kit";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);
const userDatabase = client.db("User");
const user = userDatabase.collection("us_user_data");

export const load = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) {
        return {registered: false};
    } else {
        let userData = await user.findOne({
            email: session.user.email,
        }, {projection: {_id: 0}});
        if (userData) {
            return {registered: true, userData: userData}
        } else {
            return {registered: false};
        }
    }
}


export const actions = {
    registerUserAndProceed: async (event) => {
        const session = await event.locals.getSession();
        if (!session?.user) {
            redirect(302, '/?status=1&details=Signed%20Out');
        } else {
            let errors = {userNameError: '', userPhoneNumberError: '', userLearnerIdError: '', isMaheError: ''};
            const formData = await event.request.formData();
            const userName = formData.get('userName');
            const userPhoneNumber = formData.get('userPhoneNumber');
            const userLearnerId = formData.get('userLearnerId');
            const isMahe = formData.get('isMahe');
            // const redirectToEvents = formData.get('redirectToEvents');
            // const redirectToken = formData.get('redirectToken');
            if (userName.length >= 2 && userName?.match(/^[A-Za-z\s]*$/) && userName !== 'undefined') {
                errors.userNameError = '';
            } else {
                errors.userNameError = 'Please enter a valid name';
            }

            if (userPhoneNumber.length !== 10 || userPhoneNumber.toString() === 'undefined') {
                errors.userPhoneNumberError = 'Please enter a valid phone number';
            }
            let found = await user.findOne({
                userPhoneNumber: userPhoneNumber,
            })
            if (found) {
                errors.userPhoneNumberError = "Mobile Number Already Registered!";
            }

            if (isMahe === 'true') {
                if (!userLearnerId.includes('manipal.edu')) {
                    console.log("SOMETHING");
                    errors.userLearnerIdError = 'Please enter a valid learner id';
                }
            } else if (isMahe === 'undefined') {
                errors.isMaheError = 'Please select a valid option';
            }

            if (errors.userNameError || errors.userPhoneNumberError || errors.userLearnerIdError) {
                return fail(400, errors);
            } else {
                let foundUser = await user.findOne({
                    email: session.user.email
                })
                if (!foundUser) {
                    if (isMahe === 'false') {
                        await user.insertOne({
                            email: session.user.email,
                            user_name: userName,
                            userPhoneNumber: userPhoneNumber,
                            is_mahe: isMahe === 'true',
                        })
                    } else if (isMahe === 'true') {
                        await user.insertOne({
                            email: session.user.email,
                            user_name: userName,
                            userPhoneNumber: userPhoneNumber,
                            userLearnerId: userLearnerId,
                            is_mahe: isMahe === 'true',
                        })
                    }
                    // if (redirectToEvents === 'true') {
                    // redirect(302, '/events/compete')
                    // } else {
                    return {redirect: '/payment/disclaimer'};
                    // }
                    // redirect(302, `/payment/${redirectToken}`);
                } else {
                    // if (redirectToEvents === 'true') {
                    //     redirect(302, '/events/compete')
                    // } else {
                    return {redirect: '/payment/disclaimer'};
                    // }
                    // redirect(302, `/payment/${redirectToken}`);
                }
            }
        }
    }
}