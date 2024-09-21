import {json, redirect} from "@sveltejs/kit";
import {MongoClient} from "mongodb";
import {v4 as uuidv4} from "uuid";

const client = new MongoClient(process.env.MONGO_URL);
const userDatabase = client.db("User");
const money = client.db("Money");
const passes = money.collection("mo_passes");
const user = userDatabase.collection("us_user_data");
const event = client.db("events");
const eventRegistration = event.collection("ev_registration_data");

function addEventDateToRegistrations(registrations, eventsList) {
    return registrations.map(registration => {
        const matchingEvent = eventsList.find(event => event.EventPriority === registration.event_priority);
        return {
            ...registration,
            event_date: matchingEvent ? matchingEvent.EventDate.split("-")[2] : 1
        };
    });
}

export const load = async (event) => {
    const session = await event.locals.auth();
    if (!session?.user) {
        redirect(302, '/events?status=1&details=Sign%20In%20To%20Access');
    }

    let apiEventsURL = "https://cms.mitblrfest.org/api/events";
    const response = await fetch(apiEventsURL);
    let eventList = await response.json();

    let registrationOwnerOrSoloData = await eventRegistration.find({
        email: session.user.email,
    }, {projection: {_id: 0}}).toArray();

    let registrationMemberData = await eventRegistration.find({
        team_members: session.user.email,
        email: {$ne: session.user.email},
    }, {projection: {_id: 0}}).toArray();

    eventList = eventList.data
        .map(event => {
            const eventAttributes = event.attributes;
            let date = eventAttributes.EventDate.split("-")[2];
            return {
                ...eventAttributes,
                date
            }
        });

    let registeredEventPriorities = [
        ...registrationOwnerOrSoloData.map(event => event.event_priority),
        ...registrationMemberData.map(event => event.event_priority)
    ];

    let filteredEvents = eventList.filter(event => registeredEventPriorities.includes(event.EventPriority));
    registrationOwnerOrSoloData = addEventDateToRegistrations(registrationOwnerOrSoloData, filteredEvents);
    registrationMemberData = addEventDateToRegistrations(registrationMemberData, filteredEvents);

    let ownerData = registrationOwnerOrSoloData.filter(event => event.is_team);


    return {
        eventList: filteredEvents,
        registrationData: {ownerData: ownerData, memberData: registrationMemberData}
    }
}