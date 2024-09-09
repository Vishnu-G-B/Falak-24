<script>
    import Ticket from "$lib/common/Ticket.svelte";
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";

    let culturalPasses = [
        {
            name: 'Western Solo Dance',
            price: 1000,
        },
        {
            name: 'Western Group Dance',
            price: 1000,
        },
        {
            name: 'Battle Of Bands',
            price: 1000,
        }
    ];
    let currentIndex = {
        'cultural': 0,
        'sports': 0,
        'esports': 0,
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
        for(let i = 0; i <= culturalPasses.length; i++) {
            onLoadTimeline.to(`.cultural-carousel-${i+1}`, {
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

    })

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
        if (!animationPlaying) {
            if (currentIndex[prefix] !== culturalPasses.length) {
                let slideRightTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= culturalPasses.length; i++) {
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
                for (let i = 0; i <= culturalPasses.length; i++) {
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
        let ticketTimeline = gsap.timeline();
        for (let i = 2; i <= culturalPasses.length + 1; i++) {
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
    <div class="brand-font text-[26vh] sm:text-[40vh] xl:text-[45vh] text-on-surface overflow-hidden h-fit w-fit flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="h-fit w-full flex flex-row items-center justify-between">
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font cultural-pass-text-main"></p>
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font sports-pass-text-main"></p>
        </div>
        <div class="h-fit w-fit overflow-hidden flex flex-row items-center justify-center leading-[1]">
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
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets" style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl -translate-x-[100%] cultural-controller-left"
                    on:click={() => {slideLeft('cultural')}}>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl translate-x-[100%] cultural-controller-right"
                    on:click={() => {slideRight('cultural')}}>
            </button>
        </div>
        <!--        <div class="h-fit w-fit main-page-ticket absolute origin-bottom-left">-->
        <!--            <Ticket mainTitle="TICKETS" isPassHeading="{false}" showBuyButton="{false}"/>-->
        <!--        </div>-->
        <div class="h-fit w-fit cultural-heading-ticket cultural-ticket-div absolute cultural-carousel-1 origin-bottom-left z-[{culturalPasses.length + 2}] -translate-y-[100%]">
            <Ticket mainTitle="CULTURAL" isPassHeading="{false}" showBuyButton="{false}"
                    on:showMoreClick={() => {openTickets('cultural')}}/>
        </div>
        {#each culturalPasses as cultrualTicket, index}
            <div class="h-fit w-fit cultural-content-ticket cultural-ticket-div absolute cultural-carousel-{index+2} origin-bottom-left -translate-y-[100%]"
                 style="z-index: {culturalPasses.length - index+1}">
                <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                <Ticket mainTitle="CULTURAL" isPassHeading="{false}" showBuyButton="{false}"/>
            </div>
        {/each}
    </div>
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets" style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl sports-controller-left"
                    on:click={() => {slideLeft('sports')}}>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl sports-controller-right"
                    on:click={() => {slideRight('sports')}}>
            </button>
        </div>
        <div class="h-fit w-fit sports-heading-ticket sports-ticket-div absolute sports-carousel-1 origin-bottom-left z-[{culturalPasses.length + 2}]">
            <Ticket mainTitle="SPORTS" isPassHeading="{false}" showBuyButton="{false}"
                    on:showMoreClick={() => {openTickets('sports')}}/>
        </div>
        {#each culturalPasses as cultrualTicket, index}
            <div class="h-fit w-fit sports-content-ticket sports-ticket-div absolute sports-carousel-{index+2} origin-bottom-left"
                 style="transform: translate3d({12 * (index+1)}%, 0, {-8 * (index+1)}em); z-index: {culturalPasses.length - index+1}">
                <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                <Ticket mainTitle="SPORTS" isPassHeading="{false}" showBuyButton="{false}"/>
            </div>
        {/each}
    </div>
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets" style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl esports-controller-left"
                    on:click={() => {slideLeft('esports')}}>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl esports-controller-right"
                    on:click={() => {slideRight('esports')}}>
            </button>
        </div>
        <div class="h-fit w-fit sports-heading-ticket sports-ticket-div absolute esports-carousel-1 origin-bottom-left z-[{culturalPasses.length + 2}]">
            <Ticket mainTitle="E-SPORTS" isPassHeading="{false}" showBuyButton="{false}"
                    on:showMoreClick={() => {openTickets('esports')}}/>
        </div>
        {#each culturalPasses as cultrualTicket, index}
            <div class="h-fit w-fit esports-content-ticket esports-ticket-div absolute esports-carousel-{index+2} origin-bottom-left"
                 style="transform: translate3d({12 * (index+1)}%, 0, {-8 * (index+1)}em); z-index: {culturalPasses.length - index+1}">
                <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                <Ticket mainTitle="E-SPORTS" isPassHeading="{false}" showBuyButton="{false}"/>
            </div>
        {/each}
    </div>
</div>
