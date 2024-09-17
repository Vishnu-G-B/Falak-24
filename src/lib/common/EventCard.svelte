<script>
    import barcode from "$lib/assets/images/svgs/updated_2.svg";
    import {gsap} from "gsap/dist/gsap";


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

    export let prefix;
    export let eventName, eventDate, eventDesc, prizePool, rulebookLink;
    export let eventTagline = "&nbsp;".repeat(100);
</script>
<div class="relative w-[320px] min-[375px]:w-[325px] sm:w-[400px] h-[475px] eventdiv">
    <div class="w-full h-full absolute flex flex-col flex-shrink-0 overflow-hidden bg-surface z-[2] {prefix}-main-div origin-bottom-left">
        <div class="flex flex-col items-start justify-center mt-6 pl-6 pr-6 h-full">
            <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[40%]">
                <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
            </div>
            <p class="text-[10px] text-on-surface regular-font font-thin">WHEN</p>
            <div class="flex flex-row items-end justify-between w-full mt-5">
                <div class="flex flex-col items-start justify-center">
                    <p class="text-5xl text-on-surface/70 brand-font">OCTOBER</p>
                    <p class="text-5xl text-on-surface/70 brand-font">2024</p>
                </div>
                <p class="text-8xl text-on-surface/70 brand-font leading-[1]">{eventDate}</p>
            </div>
            <div class="h-[20px] w-full bg-primary mt-4"></div>
            <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                <p class="brand-font text-6xl text-on-surface">{eventName}</p>
            </div>
            <div class="h-full w-full flex flex-col items-start justify-between z-[2] relative">
                <p class="regular-font text-xl text-on-surface/80">{@html eventTagline}</p>
            </div>

        </div>
        <div class="w-full h-fit flex flex-row items-center justify-between gap-5 px-10
                    absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10">
            <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface" disabled>Register</button>
            <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface"
                    on:click={() => {showDetail(prefix)}}>Details
            </button>
        </div>
        <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
        <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
    </div>

    <div class="w-full h-full absolute flex-shrink-0 flex flex-col overflow-hidden bg-surface {prefix}-description-div origin-bottom-left"
         style="transform: translate3d(-80%, -20%, 0) rotate(-20deg); opacity: 0;">
        <div class="flex flex-col items-start justify-start mt-3 pl-6 pr-6 h-full">
            <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[37%]">
                <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
            </div>
            <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                <p class="brand-font text-4xl text-on-surface">DESCRIPTION</p>
            </div>
            <p class="regular-font text-lg text-on-surface/80">
                {eventDesc}
            </p>
            {#if (prizePool != 0 && prizePool != null)}
                <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                    <p class="brand-font text-4xl text-on-surface">PRIZE POOL</p>
                </div>
            {/if}
            <div class="w-full h-fit flex flex-row items-center justify-around">
                {#if (prizePool != 0 && prizePool != null)}
                    <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">
                        <div class="h-3 w-3 bg-yellow-700 rounded-full"></div>
                        <p class="regular-font text-lg text-on-surface/80">
                            Winners will draw from a prize pool of upto ₹{prizePool}</p>
                    </div>
                {/if}
                <!--{#if (secondPrize != 0)}-->
                <!--    <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">-->
                <!--        <div class="h-3 w-3 bg-gray-500 rounded-full"></div>-->
                <!--        <p class="regular-font text-lg text-on-surface/80">₹{secondPrize}</p>-->
                <!--    </div>-->
                <!--{/if}-->
                <!--{#if (thirdPrize != 0)}-->
                <!--    <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">-->
                <!--        <div class="h-3 w-3 bg-yellow-950 rounded-full"></div>-->
                <!--        <p class="regular-font text-lg text-on-surface/80">₹{thirdPrize}</p>-->
                <!--    </div>-->
                <!--{/if}-->
            </div>

            <div class="h-full w-full flex flex-row items-end justify-between gap-5 z-[2] -translate-y-[38px]">
                {#if (rulebookLink != "none")}
                    <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface"
                            on:click={window.open(rulebookLink,"_blank")}>
                        Rulebook
                    </button>
                {:else}
                    <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface"
                            disabled>
                        Rulebook
                    </button>
                {/if}
                <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface"
                        on:click={() => {hideDetail(prefix)}}>Back
                </button>
            </div>
        </div>
        <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
        <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
    </div>
</div>