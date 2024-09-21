<script>
    import EventCard from "$lib/common/EventCard.svelte";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
    import {gsap} from "gsap/dist/gsap.js";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin";
    import {onMount} from "svelte";
    import barcode from "$lib/assets/images/svgs/updated_2.svg";

    let subnavOpen = false;

    onMount(() => {
        gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin);
        gsap.set('.eventdiv', {
            y: -100,
            scale: 0.8,
            opacity: 0
        });
        gsap.set("#svgButton", {
            transformPerspective: 600, transformOrigin: "50% 50%"
        })

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
            {id: "main-events", text: "Main&nbsp;Events"},
            {id: "cultural-events", text: "Cultural&nbsp;Events"},
            {id: "sports-events", text: "Sports&nbsp;Events"},
            {id: "esports-events", text: "E-Sports&nbsp;Events"}
        ];

        let currentSection = sections[0];

        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: `#${section.id}`,
                start: "top center",
                end: "bottom center",
                onEnter: () => updateIndicator(section),
                onEnterBack: () => updateIndicator(section),
                onLeave: () => {
                    if (index < sections.length - 1) {
                        updateIndicator(sections[index + 1]);
                    }
                },
                onLeaveBack: () => {
                    if (index > 0) {
                        updateIndicator(sections[index - 1]);
                    }
                }
            });
        });

        function updateIndicator(section) {
            if (section !== currentSection) {
                currentSection = section;
                gsap.to("#scroll-indicator", {
                    duration: 0.5,
                    text: {
                        value: section.text,
                        delimiter: ""
                    },
                    ease: "power2.out"
                });
            }
        }
    });

    function showDetail(prefix) {
        let showDetailTimeline = gsap.timeline();
        showDetailTimeline.to(`.${prefix}-main-div`, {
            translateX: '80%',
            translateY: '20%',
            rotate: '20deg',
            opacity: 0,
            zIndex: 1,
            ease: 'sine',
        });
        showDetailTimeline.to(`.${prefix}-description-div`, {
            translateX: '0%',
            translateY: '0%',
            rotate: '0deg',
            opacity: 1,
            zIndex: 2,
            ease: 'sine',
        }, '<');
    }

    function hideDetail(prefix) {
        let hideDetailTimeline = gsap.timeline();
        hideDetailTimeline.to(`.${prefix}-description-div`, {
            translateX: '-80%',
            translateY: '-20%',
            rotate: '-20deg',
            opacity: 0,
            zIndex: 1,
            ease: 'sine',
        });
        hideDetailTimeline.to(`.${prefix}-main-div`, {
            translateX: '0%',
            translateY: '0%',
            rotate: '0deg',
            opacity: 1,
            zIndex: 2,
            ease: 'sine',
        }, '<');
    }

    function togglesubnav() {
        if (!subnavOpen) {
            gsap.to(".subnav", {
                height: "175px",
                duration: 0.3,
                ease: 'power2.inOut',
            });
            gsap.to("#svgButton", {
                rotation: 180,
                force3D: true,
                duration: 0.3,
                ease: 'power2.inOut',
            })
            subnavOpen = !subnavOpen;
        } else {
            gsap.to(".subnav", {
                height: "0px",
                duration: 0.3,
                ease: 'power2.inOut',
            });
            gsap.to("#svgButton", {
                rotation: 0,
                force3D: true,
                duration: 0.3,
                ease: 'power2.inOut',
            })
            subnavOpen = !subnavOpen;
        }
    }

    function handleScroll(idName) {
        gsap.to(window, {
            duration: 3,
            scrollTo: "#" + idName,
        });
    }

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
<div class="flex flex-col mt-10 flex-wrap gap-[20rem] items-center justify-center min-h-screen relative w-full
            overflow-hidden mb-14">
    <div id="main-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">

        <div class="relative w-[320px] min-[375px]:w-[325px] sm:w-[400px] h-[475px] eventdiv">
            <div class="w-full h-full absolute flex flex-col flex-shrink-0 overflow-hidden bg-surface z-[2] p-main-div origin-bottom-left">
                <div class="flex flex-col items-start justify-center mt-6 pl-6 pr-6 h-full">
                    <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[32%]">
                        <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
                    </div>
                    <p class="text-[10px] text-on-surface regular-font font-thin">WHEN</p>
                    <div class="flex flex-row items-end justify-between w-full mt-5">
                        <div class="flex flex-col items-start justify-center">
                            <p class="text-5xl text-on-surface/70 brand-font">OCTOBER</p>
                            <p class="text-5xl text-on-surface/70 brand-font">2024</p>
                        </div>
                        <p class="text-8xl text-on-surface/70 brand-font leading-[1]">07</p>
                    </div>
                    <div class="h-[20px] w-full bg-primary mt-4"></div>
                    <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                        <p class="brand-font text-6xl text-on-surface">Pro-Show</p>
                    </div>
                    <div class="h-full w-full flex flex-col items-start justify-between z-[2] relative">
                        <p class="regular-font text-xl text-on-surface/80"></p>
                    </div>

                </div>
                <div class="w-full h-fit flex flex-row items-center justify-between gap-5 px-10
                    absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10">
                    <button class="h-fit w-full bg-primary p-1 regular-font text-on-surface"
                            on:click={() => {showDetail("p")}}>
                        Details
                    </button>
                </div>
                <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
                <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
                <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
                <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
            </div>
            <div class="w-full h-full absolute flex-shrink-0 flex flex-col overflow-hidden bg-surface p-description-div origin-bottom-left"
                 style="transform: translate3d(-80%, -20%, 0) rotate(-20deg); opacity: 0;">
                <div class="flex flex-col items-start justify-start mt-3 px-4 pb-4 pt-1 h-full w-full">
                    <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[32%]">
                        <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
                    </div>
                    <div class="w-full h-full flex justify-center items-center bg-surface text-center text-on-surface
                                text-6xl brand-font px-2">
                        Details will be announced soon!
                    </div>
                </div>
                <div class="w-full h-fit flex flex-row items-center justify-between gap-5 px-10
                    absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10">
                    <button class="h-fit w-full bg-primary p-1 regular-font text-on-surface"
                            on:click={() => {hideDetail("p")}}>
                        Back
                    </button>
                </div>
                <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
                <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
                <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
                <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
            </div>
        </div>
        <!--{#each data.main_events as mainevent}-->
        <!--    <EventCard-->
        <!--            prefix={'h'+mainevent.EventPriority}-->
        <!--            eventName={mainevent.EventName}-->
        <!--            eventDate={mainevent.eventDate}-->
        <!--            eventDesc={mainevent.EventDescription}-->
        <!--            prizePool={mainevent.PrizePool}-->
        <!--            rulebookLink={mainevent.RulebookLink}-->
        <!--            eventTagline={(mainevent.EventTagline === 'none' || mainevent.EventTagline === null) ? '\u00A0' : mainevent.EventTagline}-->
        <!--    />-->
        <!--{/each}-->
    </div>
    <div id="cultural-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">
        {#each data.cultural_events as mainevent}
            <EventCard prefix={'h'+mainevent.EventPriority} eventName={mainevent.EventName}
                       eventDate={mainevent.eventDate} eventDesc={mainevent.EventDescription}
                       prizePool={mainevent.PrizePool} rulebookLink={mainevent.RulebookLink}
                       userSignedIn="{data.userSignedIn}"
                       eventPriority="{mainevent.EventPriority}"
                       passRequiredM="{mainevent.passRequiredM}"
                       passRequiredNM="{mainevent.passRequiredNM}"
                       eventTagline={(mainevent.EventTagline == 'none' || mainevent.EventTagline == null) ?'\u00A0':mainevent.EventTagline}/>
        {/each}
    </div>
    <div id="sports-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">
        {#each data.sports_events as mainevent}
            <EventCard prefix={'h'+mainevent.EventPriority} eventName={mainevent.EventName}
                       eventDate={mainevent.eventDate} eventDesc={mainevent.EventDescription}
                       prizePool={mainevent.PrizePool} rulebookLink={"none"}
                       userSignedIn="{data.userSignedIn}"
                       eventPriority="{mainevent.EventPriority}"
                       passRequiredM="{mainevent.passRequiredM}"
                       passRequiredNM="{mainevent.passRequiredNM}"
                       eventTagline={(mainevent.EventTagline == 'none' || mainevent.EventTagline == null) ?'\u00A0':mainevent.EventTagline}/>
        {/each}
    </div>
    <div id="esports-events"
         class="flex flex-col items-center gap-5 justify-center min-h-screen relative w-full overflow-hidden">
        {#each data.esports_events as mainevent}
            <EventCard prefix={'h'+mainevent.EventPriority} eventName={mainevent.EventName}
                       eventDate={mainevent.eventDate} eventDesc={mainevent.EventDescription}
                       prizePool={mainevent.PrizePool} rulebookLink={mainevent.RulebookLink}
                       userSignedIn="{data.userSignedIn}"
                       eventPriority="{mainevent.EventPriority}"
                       passRequiredM="{mainevent.passRequiredM}"
                       passRequiredNM="{mainevent.passRequiredNM}"
                       eventTagline={(mainevent.EventTagline == 'none' || mainevent.EventTagline == null) ?'\u00A0':mainevent.EventTagline}/>
        {/each}
    </div>
</div>

<div class="fixed bottom-5 z-10 left-1/2 transform -translate-x-1/2 bg-primary text-on-surface py-2 px-2 rounded-full
            shadow-lg font-bold flex justify-center items-center gap-2 w-[220px] sm:w-[250px]">
    <div id="scroll-indicator"
         class="regular-font text-xl sm:text-2xl text-center ">
        Main&nbsp;Events
    </div>
    <button class=" h-[24px] w-[24px] border-l-2 border-solid border-on-surface pl-2" on:click={togglesubnav}>
        <svg fill="#ffffff" height="100%" width="100%" version="1.1" id="svgButton" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                    <path id="XMLID_224_"
                          d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z">
                </path> </g></svg>
    </button>
</div>

<div class="subnav fixed bottom-20 z-10 left-1/2 transform -translate-x-1/2 bg-primary text-on-surface rounded-3xl
            w-[230px] h-[0px] px-2 flex flex-col justify-center items-center gap-2 overflow-hidden
            shadow-lg font-bold regular-font text-xl sm:text-2xl text-center">
    <button class="subnavText mt-2" on:click={() => {handleScroll("main-events")}}>Main Events</button>
    <button class="subnavText" on:click={() => {handleScroll("cultural-events")}}>Cultural Events</button>
    <button class="subnavText" on:click={() => {handleScroll("sports-events")}}>Sports Events</button>
    <button class="subnavText mb-2" on:click={() => {handleScroll("esports-events")}}>E-Sports Events</button>
</div>