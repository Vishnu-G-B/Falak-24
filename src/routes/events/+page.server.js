export const load = async (event) => {
    //API REQUEST URL TO STRAPI
    let apiEventsURL = "https://cms.mitblrfest.org/api/events";

    try {
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
                    ...eventAttributes,
                    eventDate
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
            .filter(event => event.EventPriority >= 3000)
            .sort(sortByDate);

        // console.log(main_events);
        // console.log(cultural_events);
        // console.log(esports_events);

        return {
            main_events,
            cultural_events,
            esports_events,
        }

    } catch
        (error) {
        console.error(error);
        return {
            events: {
                mainevents: [],
                cultural: [],
                esports: []
            },
            error: error.message
        }
    }
}