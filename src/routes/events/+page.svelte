<script>
    import EventCard from "$lib/common/EventCard.svelte";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
    import {gsap} from "gsap/dist/gsap.js";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {onMount} from "svelte";

    onMount(() => {
        gsap.registerPlugin(TextPlugin, ScrollTrigger);
        gsap.set('.eventdiv', {
            y: -100,
            scale: 0.8,
            opacity: 0
        });

        let onLoadTimeline = gsap.timeline();
        onLoadTimeline.to('.main-page-heading', {
            translateY: 0,
            translateX: 0,
            rotate: 0,
            stagger: 0.1,
            ease: 'power4.out',
        });
        onLoadTimeline.to('.cultural-pass-text-main', {
            text: 'Cultural',
            delay: '0.5'
        }, '<');
        onLoadTimeline.to('.sports-pass-text-main', {
            text: 'Sports',
        }, '<');
        onLoadTimeline.to('.esports-pass-text-main', {
            text: 'E-Sports',
        }, '<');
        onLoadTimeline.to('.eventdiv', {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.1
        });
        onLoadTimeline.to('#scroll-indicator', {
            bottom: 10,
            duration: 1,
            ease: 'power4.out',
        }, '<')

        const sections = [
            {id: "main-events", text: "Main Events"},
            {id: "cultural-events", text: "Cultural Events"},
            {id: "sports-events", text: "Sports Events"},
            {id: "esports-events", text: "E-Sports Events"}
        ];

        sections.forEach((section, index) => {
            ScrollTrigger.create({
                id: `${section.id}`,
                trigger: `#${section.id}`,
                start: "top center+=19%",
                end: "bottom top",
                onEnter: () => updateIndicator(section.text, section.id),
                onEnterBack: () => updateIndicator(section.text, section.id),
            });
        });

        function updateIndicator(text, id) {
            gsap.to("#scroll-indicator", {
                duration: 1,
                text: {
                    // padSpace: true,
                    // preserveSpaces: true,
                    value: text,
                    delimiter: ""
                },
                ease: "power2.out"
            });
            // gsap.to(".page-heading-parent", {
            //     duration: 1,
            //     text: {
            //         padSpace: true,
            //         preserveSpaces: true,
            //         value: text,
            //         delimiter: ""
            //     },
            //     ease: "power2.out"
            // })
        }
    })

    export let data;
</script>


<div class="h-screen w-full fixed top-0">
    <AICanvasClaude2/>
</div>
<div class="brand-font text-[9rem] sm:text-[45vh] xl:text-[45vh] text-on-surface overflow-hidden h-fit w-[90%] sm:w-fit text-center justify-center items-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="h-fit w-full flex flex-row items-center justify-between">
        <p class="text-2xl lg:text-2xl xl:text-3xl regular-font cultural-pass-text-main"></p>
        <p class="text-2xl lg:text-2xl xl:text-3xl regular-font sports-pass-text-main"></p>
    </div>
    <div class="h-fit w-fit overflow-hidden flex flex-row items-center justify-center leading-[1] page-heading-parent">
        <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">E</span><span
            class="main-page-heading -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">V</span><span
            class="main-page-heading -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">E</span><span
            class="main-page-heading -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">N</span><span
            class="main-page-heading -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">T</span><span
            class="main-page-heading -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">S</span>
    </div>
    <div class="h-fit w-full flex flex-row items-center justify-center -mt-5">
        <p class="text-2xl lg:text-2xl xl:text-3xl regular-font esports-pass-text-main"></p>
    </div>
</div>
<div class="flex flex-col mt-20 flex-wrap gap-[20rem] items-center justify-center min-h-screen relative w-full overflow-hidden">
    <div id="main-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">
        {#each data.main_events as mainevent}
            <EventCard
                    prefix={'h'+mainevent.EventPriority}
                    eventName={mainevent.EventName}
                    eventDate={mainevent.eventDate}
                    eventDesc={mainevent.EventDescription}
                    prizePool={mainevent.PrizePool}
                    rulebookLink={mainevent.RulebookLink}
                    eventTagline={(mainevent.EventTagline === 'none' || mainevent.EventTagline === null) ? '\u00A0' : mainevent.EventTagline}
            />
        {/each}
    </div>
    <div id="cultural-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">
        {#each data.cultural_events as mainevent}
            <EventCard prefix={'h'+mainevent.EventPriority} eventName={mainevent.EventName}
                       eventDate={mainevent.eventDate} eventDesc={mainevent.EventDescription}
                       prizePool={mainevent.PrizePool} rulebookLink={mainevent.RulebookLink}
                       eventTagline={(mainevent.EventTagline == 'none' || mainevent.EventTagline == null) ?'\u00A0':mainevent.EventTagline}/>
        {/each}
    </div>
    <!--    <div id="sports-events"-->
    <!--         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">-->
    <!--        {#each data.sports_events as mainevent}-->
    <!--            <EventCard prefix={'h'+mainevent.EventPriority} eventName={mainevent.EventName}-->
    <!--                       eventDate={mainevent.eventDate} eventDesc={mainevent.EventDescription}-->
    <!--                       prizePool={mainevent.PrizePool} rulebookLink={mainevent.RulebookLink}-->
    <!--                       eventTagline={(mainevent.EventTagline == 'none' || mainevent.EventTagline == null) ?'\u00A0':mainevent.EventTagline}/>-->
    <!--        {/each}-->
    <!--    </div>-->
    <div id="esports-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">
        {#each data.esports_events as mainevent}
            <EventCard prefix={'h'+mainevent.EventPriority} eventName={mainevent.EventName}
                       eventDate={mainevent.eventDate} eventDesc={mainevent.EventDescription}
                       prizePool={mainevent.PrizePool} rulebookLink={mainevent.RulebookLink}
                       eventTagline={(mainevent.EventTagline == 'none' || mainevent.EventTagline == null) ?'\u00A0':mainevent.EventTagline}/>
        {/each}
    </div>
</div>

<div class="fixed bottom-5 z-10 left-1/2 transform -translate-x-1/2 bg-primary text-on-surface py-2 px-4 rounded-full
            shadow-lg font-bold flex justify-center items-center gap-4">
    <div id="scroll-indicator" class="regular-font text-xl sm:text-3xl text-center">
        Main Events
    </div>
    <div class="h-[24px] w-[24px] object-cover">
        <svg fill="#ffffff" height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path id="XMLID_224_"
                      d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z">
            </path> </g></svg>
    </div>
</div>

<div></div>