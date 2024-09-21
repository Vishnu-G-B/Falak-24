<script>
    import CompeteCard from '$lib/common/competeCard.svelte';
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
    import {onMount} from "svelte";
    import {gsap} from 'gsap/dist/gsap.js';
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

    onMount(() => {
        gsap.registerPlugin(TextPlugin)
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
        <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">M</span><span
            class="main-page-heading -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">A</span><span
            class="main-page-heading -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">N</span><span
            class="main-page-heading -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">A</span><span
            class="main-page-heading -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">G</span><span
            class="main-page-heading -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">E</span>
    </div>
    <div class="h-fit w-full flex flex-row items-center justify-center -mt-5">
        <p class="text-2xl lg:text-2xl xl:text-3xl regular-font esports-pass-text-main"></p>
    </div>
</div>
<div class="OwnerSoloManageDiv h-full w-full flex flex-col justify-center items-center mt-32 gap-[10rem] mb-10">
    {#if data.registrationData.ownerData.length === 0}
        <CompeteCard
                prefix={'l'+ '124'}
                eventDate="4"
                eventName="Team Owner"
                eventPriority={5000}
                memberlist={[]}
                description="You are not the owner of a team yet!"
                disableshift={true}/>
    {:else}
        {#each data.registrationData.ownerData as event}
            <CompeteCard
                    prefix={'k'+event.event_priority}
                    eventDate={event.event_date}
                    eventName={event.event_name}
                    eventPriority={event.event_priority}
                    memberlist={event.team_members}
                    isMember={false}
                    disableshift={false}
            />
        {/each}
    {/if}
    {#if data.registrationData.memberData.length === 0}
        <CompeteCard
                prefix={'l'+ '124'}
                eventDate="4"
                eventName="Team Member"
                eventPriority={5000}
                memberlist={[]}
                description="You are not a part of a team yet!"
                disableshift={true}/>
    {:else}
        {#each data.registrationData.memberData as event}
            <CompeteCard
                    prefix={'k'+event.event_priority}
                    eventDate={event.event_date}
                    eventName={event.event_name}
                    eventPriority={event.event_priority}
                    memberlist={event.team_members}
                    isMember={true}
                    disableshift={false}
            />
        {/each}
    {/if}
</div>