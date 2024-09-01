<script>
    import barcode from '$lib/assets/images/2.svg?raw';
    import RandomImageGrid from "$lib/common/RandomImageGrid.svelte";
    import {gsap} from "gsap/dist/gsap";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import image from "$lib/assets/images/1.jpg";
    import image1 from "$lib/assets/images/3.jpg";
    import image2 from "$lib/assets/images/2.jpg";
    import {loaderPlayed} from "../store.js";
    import logo from "$lib/assets/images/logo_inverted.svg?raw";
    // import {onMount} from "svelte";

    onMount(() => {
        if(!$loaderPlayed) {
            gsap.registerPlugin(TextPlugin);
            let loaderTimeline = gsap.timeline({
                onComplete: () => {
                    $loaderPlayed = true;
                }
            });
            let loaderTextTimeline = gsap.timeline();
            // loaderTimeline.pause();
            // loaderTextTimeline.pause();

            loaderTextTimeline.to('.loader-text', {
                text: 'Cooking...',
                duration: 1,
                ease: 'none',
            });
            loaderTextTimeline.to('.loader-text', {
                text: 'Baking...',
                duration: 1,
                ease: 'none',
            });
            loaderTextTimeline.to('.loader-text', {
                text: 'Eating...',
                duration: 1,
                ease: 'none',
            });
            loaderTextTimeline.to('.loader-text', {
                text: 'Loading...',
                duration: 1,
                ease: 'none',
            });

            loaderTimeline.to('.loader-image', {
                scale: 1,
                duration: 0.35,
                ease: 'expoScale(0.5,7,none)',
                stagger: 1,
            })
            loaderTimeline.to('.loader-image', {
                yPercent: -80,
                duration: 0.25,
                ease: 'expoScale(0.5,7,none)',
                stagger: 0.1,
            });
            loaderTimeline.to('.loader-image', {
                yPercent: 120,
                duration: 0.65,
                ease: "expoScale(0.2,2,none)",
                stagger: -0.1,
            }, '<+0.76');
            loaderTimeline.to('.loader', {
                yPercent: 100,
                duration: 0.75,
            }, '<+0.7');
            loaderTimeline.to('.loader-text', {
                opacity: 0,
                duration: 0.75,
            }, '<');
            loaderTimeline.to('.main-content', {
                translateY: 0,
                duration: 0.75,
            }, '<');
        } else {
            gsap.set('.loader', {
                display: 'none',
            })
        }
    })
</script>
<!--LOADER-->
<div class="h-screen w-full fixed top-0 bg-on-surface z-[200] loader">
    <div class="h-full w-full flex flex-col items-center justify-center">
        <div class="h-[350px] w-full relative flex flex-col items-center justify-end">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] border-2 border-surface loader-image scale-0">
                <img src="{image}" alt="" class="h-full w-full object-cover">
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] border-2 border-surface loader-image scale-0">
                <img src="{image1}" alt="" class="h-full w-full object-cover">
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] border-2 border-surface loader-image scale-0">
                <img src="{image2}" alt="" class="h-full w-full object-cover">
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] border-2 border-surface loader-image z-[4] scale-0">
                <img src="{image}" alt="" class="h-full w-full object-cover">
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] border-2 border-surface loader-image z-[5] scale-0">
                <img src="{image1}" alt="" class="h-full w-full object-cover">
            </div>
        </div>
        <div class="h-fit w-full overflow-hidden flex flex-col items-center">
            <p class="text-xl regular-font text-surface loader-text mt-14">Loading...</p>
        </div>
    </div>
</div>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-surface main-content">

    <div class="h-screen w-full overflow-hidden absolute top-0">
        <RandomImageGrid/>
    </div>

    <div class="h-screen w-[375px] bg-surface relative flex flex-col">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2.75rem] w-full">
            {@html logo}
        </div>
        <div class="h-1/2 w-full flex flex-col justify-center items-end relative">
            <div class="absolute top-12 right-[22px] flex flex-row items-center justify-center gap-3 pr-3 z-[100]">
                <button class="bg-on-surface text-surface relative regular-font text-xl text-center py-1.5 corner-br px-5 hover:bg-primary hover:text-on-surface duration-300 ease-in transition-all"
                        style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);" on:click={() => {goto('/testing')}}>
                    Tickets
                    <div class="absolute bottom-0 right-0 bg-surface"></div>
                </button>
                <button on:click={() => {window.toggleMenu()}} class="text-xl text-on-surface regular-font tracking-tight">Menu</button>
            </div>
            <time class="leading-none px-5 h-fit w-full grid grid-cols-12 pb-4" datetime="2024-10-04">
                <span class="brand-font translate-y-[0.08em] col-span-3 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">04</span>
                <span class="brand-font translate-y-[0.08em] col-span-2 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">10</span>
                <span class="brand-font translate-y-[0.08em] col-span-4 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">2024</span>
            </time>
        </div>
        <div class="h-fit w-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 flex flex-col items-start justify-center">
            <p class="brand-font font-[400] z-[2] text-on-surface text-[10rem] leading-[8.125rem]">FALAK</p>
            <p class="brand-font text-on-surface text-[10rem] leading-[8.25rem]">FESTIVAL</p>
        </div>
        <div class="h-[30%] w-full absolute bottom-0 px-8 items-center flex flex-col justify-center gap-1 pb-10">
            <p class="regular-font text-on-surface text-[16px]">FASTEN YOUR SEATBELTS!</p>
            <div class="h-full w-full flex flex-row justify-center gap-1">
                <div class="h-full w-fit relative flex flex-col items-end justify-end">
                    {@html barcode}
                </div>
                <div class="h-full w-fit flex flex-col items-center justify-end">
                    <p class="regular-font text-on-surface">2024</p>
                    <div class="bg-on-surface text-surface px-3 py-2 regular-font">FLK</div>
                </div>
            </div>
        </div>
        <!--        <div class="absolute top-0 h-[20px] w-full bg-primary"></div>-->
        <!--        <div class="absolute bottom-0 h-[20px] w-full bg-primary"></div>-->
        <div class="absolute right-0 top-0 h-[33vh] w-[20px] bg-primary"></div>
        <div class="absolute left-0 top-0 h-[33vh] w-[20px] bg-primary"></div>
        <p class="absolute left-[20px] top-6 regular-font text-[16px] font-thin rotate-180 text-on-surface"
           style="writing-mode: vertical-rl;">DEPARTURE</p>
        <div class="absolute left-0 bottom-0 min-h-[30vh] max-h-[40vh] w-[20px] bg-primary"></div>
        <div class="absolute right-0 bottom-0 min-h-[30vh] max-h-[40vh] w-[20px] bg-primary"></div>
    </div>
    <div class="h-screen w-full bg-pink-600"></div>
</div>