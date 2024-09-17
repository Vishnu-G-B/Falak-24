<script>
    import barcode from "$lib/assets/images/svgs/updated_2.svg";
    import {gsap} from "gsap/dist/gsap";

    export let prefix;

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
</script>
<div class="relative w-[320px] min-[375px]:w-[325px] sm:w-[375px] h-[435px]">
    <div class="w-full h-full absolute flex flex-col flex-shrink-0 overflow-hidden bg-surface z-[2] {prefix}-main-div origin-bottom-left">
        <div class="flex flex-col items-start justify-center mt-6 pl-6 pr-6 h-full">
            <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[37%]">
                <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
            </div>
            <p class="text-[10px] text-on-surface regular-font font-thin">WHEN</p>
            <div class="flex flex-row items-end justify-between w-full mt-5">
                <div class="flex flex-col items-start justify-center">
                    <p class="text-5xl text-on-surface/70 brand-font">MAY</p>
                    <p class="text-5xl text-on-surface/70 brand-font">2024</p>
                </div>
                <p class="text-8xl text-on-surface/70 brand-font leading-[1]">12</p>
            </div>
            <div class="h-[20px] w-full bg-primary mt-4"></div>
            <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                <p class="brand-font text-6xl text-on-surface">EVENT NAME</p>
            </div>
            <div class="h-full w-full flex flex-col items-start justify-between z-[2]">
                <p class="regular-font text-xl text-on-surface/80">Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                </p>
                <div class="h-full w-full flex flex-row items-center justify-between gap-5">
                    <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface">Register</button>
                    <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface"
                            on:click={() => {showDetail(prefix)}}>Details
                    </button>
                </div>
            </div>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consectetur ipsam nisi porro quo?
                Adipisci distinctio est
            </p>
            <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                <p class="brand-font text-4xl text-on-surface">PRIZE POOL</p>
            </div>
            <div class="w-full h-fit flex flex-row items-center justify-around">
                <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">
                    <div class="h-3 w-3 bg-yellow-700 rounded-full"></div>
                    <p class="regular-font text-lg text-on-surface/80">$1000</p>
                </div>
                <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">
                    <div class="h-3 w-3 bg-gray-500 rounded-full"></div>
                    <p class="regular-font text-lg text-on-surface/80">$1000</p>
                </div>
                <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">
                    <div class="h-3 w-3 bg-yellow-950 rounded-full"></div>
                    <p class="regular-font text-lg text-on-surface/80">$1000</p>
                </div>
            </div>
            <div class="h-full w-full flex flex-row items-end justify-between gap-5 z-[2] -translate-y-[38px]">
                <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface">Rulebook</button>
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