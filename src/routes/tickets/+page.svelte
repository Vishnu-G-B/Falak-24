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

    function getTranslatePercentage() {
        const transformValue = window.getComputedStyle(document.getElementsByClassName('carousel-1')[0]).transform;
        const w = window.getComputedStyle(document.getElementsByClassName('carousel-1')[0]).width;
        var matrix = new WebKitCSSMatrix(transformValue);
      
        return matrix.m41/parseInt(w)*100;
      }

    function slideRight() {
        let slideRightTimeline = gsap.timeline();
        getTranslatePercentage()
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