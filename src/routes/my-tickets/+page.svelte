<script>
    import {gsap} from "gsap/dist/gsap";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
    import {onMount} from "svelte";
    import Ticket from "$lib/common/Ticket.svelte";

    export let data;

    let currentIndex = {
        'cultural': 0,
        'sports': 0,
        'esports': 0,
    };
    let carouselStatus = {
        'cultural': false,
        'sports': false,
        'esports': false,
    };
    let animationPlaying = false;

    onMount(() => {
        gsap.registerPlugin(TextPlugin);
        let onLoadTimeline = gsap.timeline();
        // onLoadTimeline.pause();
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
        onLoadTimeline.to('.cultural-ticket-div', {
            translateY: 0,
            rotate: 0,
            delay: 1.25,
            ease: 'sine',
        }, '<');
        for (let i = 0; i <= data.passes.length; i++) {
            onLoadTimeline.to(`.cultural-carousel-${i + 1}`, {
                translateX: `${12 * i}%`,
                translateZ: `${-8 * i}em`,
            }, '<');
        }
        onLoadTimeline.to('.cultural-controller-left', {
            translateX: 0,
        }, "<");
        onLoadTimeline.to('.cultural-controller-right', {
            translateX: 0,
        }, "<");
    });

    function getTranslatePercentage(element) {
        const transformValue = window.getComputedStyle(element[0]).transform;
        const w = window.getComputedStyle(element[0]).width;
        const h = window.getComputedStyle(element[0]).height;
        var matrix = new WebKitCSSMatrix(transformValue);

        const style = window.getComputedStyle(element[0]);
        const rotationMatrix = style.transform || style.webkitTransform || style.mozTransform;

        let angle;
        if (rotationMatrix === 'none') {
            angle = 0;
        } else {
            const values = rotationMatrix.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }

        return {
            x: matrix.m41 / parseInt(w) * 100,
            y: matrix.m42 / parseInt(h) * 100,
            rotation: angle,
        };
    }

    function slideRight(prefix) {
        if (!animationPlaying && carouselStatus[prefix]) {
            if (currentIndex[prefix] !== data.passes.length) {
                let slideRightTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= data.passes.length; i++) {
                    let translateValues = getTranslatePercentage(document.getElementsByClassName(`${prefix}-carousel-${i + 1}`));
                    console.log(translateValues);
                    slideRightTimeline.to(`.${prefix}-carousel-${i + 1}`, {
                        translateX: `${translateValues.x + 80}%`,
                        translateY: `${translateValues.y + 20}%`,
                        rotate: `${translateValues.rotation + 20}deg`,
                        ease: 'sine',
                    }, '<');
                }
                currentIndex[prefix]++;
            }
        }
    }

    function slideLeft(prefix) {
        if (!animationPlaying) {
            if (currentIndex[prefix] !== 0) {
                let slideLeftTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= data.passes.length; i++) {
                    let translateValues = getTranslatePercentage(document.getElementsByClassName(`${prefix}-carousel-${i + 1}`));
                    console.log(translateValues);
                    slideLeftTimeline.to(`.${prefix}-carousel-${i + 1}`, {
                        translateX: `${translateValues.x - 80}%`,
                        translateY: `${translateValues.y - 20}%`,
                        rotate: `${translateValues.rotation - 20}deg`,
                        ease: 'sine',
                    }, '<');
                }
                currentIndex[prefix]--;
            }
        }
    }

    export function openTickets(prefix) {
        carouselStatus[prefix] = true;
        let ticketTimeline = gsap.timeline();
        for (let i = 2; i <= data.passes.length + 1; i++) {
            ticketTimeline.to(`.${prefix}-carousel-${i}`, {
                translateX: `${-80 * (i - 1)}%`,
                translateY: `${-20 * (i - 1)}%`,
                translateZ: 0,
                rotate: `${-20 * (i - 1)}deg`,
                ease: 'sine',
            }, '<+=0.1');
        }
    }
</script>

<div class="min-h-screen w-full flex flex-col flex-shrink-0 items-center justify-center gap-2 relative overflow-hidden">
    <div class="h-screen w-full fixed top-0">
        <AICanvasClaude2/>
    </div>
    <div class="brand-font text-[6rem] sm:text-[30vh] lg:text-[40vh] xl:text-[45vh] text-on-surface overflow-hidden h-fit w-fit flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="h-fit w-full flex flex-row items-center justify-between">
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font cultural-pass-text-main"></p>
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font sports-pass-text-main"></p>
        </div>
        <div class="h-fit w-fit overflow-hidden flex flex-row items-center justify-center leading-[1]">
            <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">M</span>
            <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">Y</span>
            <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">&nbsp;</span>
            <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">T</span><span
                class="main-page-heading -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">I</span><span
                class="main-page-heading -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">C</span><span
                class="main-page-heading -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">K</span><span
                class="main-page-heading -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">E</span><span
                class="main-page-heading -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">T</span><span
                class="main-page-heading -translate-y-[1400px] -translate-x-[80%] -rotate-[45deg]">S</span>
        </div>
        <div class="h-fit w-full flex flex-row items-center justify-center -mt-5">
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font esports-pass-text-main"></p>
        </div>
    </div>
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets"
         style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl -translate-x-[100%] cultural-controller-left flex items-center justify-center"
                    on:click={() => {slideLeft('cultural')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                    </g>
                </svg>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl translate-x-[100%] cultural-controller-right flex items-center justify-center"
                    on:click={() => {slideRight('cultural')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                    </g>
                </svg>
            </button>
        </div>
        <div class="h-fit w-fit cultural-heading-ticket cultural-ticket-div absolute cultural-carousel-1 origin-bottom-left -translate-y-[100%]"
             style="z-index: {data.passes.length + 2};">
            <Ticket mainTitle="TICKETS" isPassHeading="{false}" showBuyButton="{false}" description="{true}"
                    descriptionText="Your Owned Tickets Will Be Shown Here."
                    secondaryDescriptionText="{(data.passes.length === 0) ? 'Currently you do not own any tickets': `Currently you have ${data.passes.length} ticket(s)`}"
                    disableActionButton="{data.passes.length === 0}"
                    on:showMoreClick={() => {openTickets('cultural')}}/>
        </div>
        {#if data.passes.length !== 0}
            {#each data.passes as culturalTicket, index}
                <div class="h-fit w-fit cultural-content-ticket cultural-ticket-div absolute cultural-carousel-{index+2} origin-bottom-left -translate-y-[100%]"
                     style="z-index: {data.passes.length - index+1}">
                    <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                    <Ticket mainTitle="{culturalTicket.pass_name.toUpperCase()}" isPassHeading="{false}"
                            showBuyButton="{false}"
                            description="{true}" descriptionText="" enlargeSecondary="{true}" secondaryDescriptionText="{culturalTicket.token}"
                            noButton="{true}" disableActionButton="{false}"/>
                </div>
            {/each}
        {/if}
        <!--{#each culturalPasses as culturalTicket, index}-->
        <!--    <div class="h-fit w-fit cultural-content-ticket cultural-ticket-div absolute cultural-carousel-{index+2} origin-bottom-left -translate-y-[100%]"-->
        <!--         style="z-index: {culturalPasses.length - index+1}">-->
        <!--        &lt;!&ndash;                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">&ndash;&gt;-->
        <!--        <Ticket mainTitle="{culturalTicket.name}" isPassHeading="{false}" showBuyButton="{true}"-->
        <!--                price="{culturalTicket.price}" includesArray="{culturalTicket.points}" description="{false}"-->
        <!--                on:buyClicked={() => {showDataForm()}}/>-->
        <!--    </div>-->
        <!--{/each}-->
    </div>
</div>