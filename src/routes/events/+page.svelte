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
            {id: "esports-events", text: "E-Sports Events"}
        ];

        sections.forEach((section, index) => {
            ScrollTrigger.create({
                id: `${section.id}`,
                // markers: true,
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
                    padSpace: true,
                    preserveSpaces: true,
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
<div class="brand-font text-[6rem] sm:text-[45vh] xl:text-[45vh] text-on-surface overflow-hidden h-fit w-[90%] sm:w-fit text-center justify-center items-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="h-fit w-full flex flex-row items-center justify-between">
        <p class="text-xl lg:text-2xl xl:text-3xl regular-font cultural-pass-text-main"></p>
        <p class="text-xl lg:text-2xl xl:text-3xl regular-font sports-pass-text-main"></p>
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
        <p class="text-xl lg:text-2xl xl:text-3xl regular-font esports-pass-text-main"></p>
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

<div id="scroll-indicator"
     class="fixed -bottom-40 z-10 left-1/2 transform -translate-x-1/2 bg-primary text-on-surface py-2 px-4 rounded-full shadow-lg sm:text-2xl font-bold">
    Main Events
</div>