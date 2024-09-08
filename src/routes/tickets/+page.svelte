<script>
    import Ticket from "$lib/common/Ticket.svelte";
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";

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
    let currentIndex = 1;

    onMount(() => {
    })

    function getTranslatePercentage(element) {
        const transformValue = window.getComputedStyle(element).transform;
        const w = window.getComputedStyle(element).width;
        var matrix = new WebKitCSSMatrix(transformValue);
        const h = window.getComputedStyle(element).height;
        return {
            x: (matrix.m41 / parseInt(w)) * 100,
            y: (matrix.m42 / parseInt(h)) * 100,
        }
    }

    function slideRight() {
        // console.log(getTranslatePercentage())
        let slideRightTimeline = gsap.timeline();
        for (let i = 0; i < culturalPasses.length; i++) {
            let tempEl = document.querySelector(`carousel-${i + 1}`)
            console.log(typeof tempEl)
            // getTranslatePercentage(tempEl)
        }
    }
</script>

<div class="min-h-screen w-full flex flex-row flex-shrink-0 items-center justify-center gap-2 relative">
    <div class="h-fit w-fit absolute carousel-1 z-[{culturalPasses.length + 2}]" on:click={() => {slideRight()}}>
        <Ticket mainTitle="CULTURAL" isPassHeading="{false}" showBuyButton="{false}"/>
    </div>
    {#each culturalPasses as cultrualTicket, index}
        <div class="h-fit w-fit absolute carousel-{index+2}"
             style="transform: translate(-{105 * (index+1)}%, -{20 * (index+1)}%) rotate(-{12 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">
            <Ticket mainTitle="CULTURAL" isPassHeading="{false}" showBuyButton="{false}"/>
        </div>
    {/each}
</div>