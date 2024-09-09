<script>
    import barcode from '$lib/assets/images/updated_2.svg?raw';
    import {gsap} from "gsap/dist/gsap";
    import {toggleNavbar} from "$lib/stores/navStore.js";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {loaderPlayed} from "../store.js";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";

    onMount(() => {
        if (!$loaderPlayed) {
            gsap.registerPlugin(TextPlugin, ScrollTrigger);
            let loaderTimeline = gsap.timeline({
                onComplete: () => {
                    $loaderPlayed = true;
                }
            });
            // loaderTimeline.pause(0.5);
            loaderTimeline.to('.loader-page-heading-1', {
                translateY: 0,
                translateX: 0,
                rotate: 0,
                ease: 'sine',
                duration: 0.35,
                stagger: 0.1,
            });
            loaderTimeline.to('.loader-page-heading-1', {
                translateY: '100%',
                translateX: '80%',
                rotate: '45deg',
                ease: 'sine',
                duration: 0.35,
                stagger: 0.1,
            });
            loaderTimeline.to('.loader-page-heading-2', {
                translateY: 0,
                translateX: 0,
                rotate: 0,
                ease: 'sine',
                duration: 0.35,
                stagger: 0.1,
            }, '<');
            loaderTimeline.to('.loader-page-heading-2', {
                translateY: '100%',
                translateX: '80%',
                rotate: '45deg',
                ease: 'sine',
                duration: 0.35,
                stagger: 0.1,
            });
            loaderTimeline.to('.loader-page-heading-3', {
                translateY: 0,
                translateX: 0,
                rotate: 0,
                ease: 'sine',
                duration: 0.35,
                stagger: 0.1,
            }, '<');
            loaderTimeline.to('.loader-page-heading-3', {
                translateY: '100%',
                translateX: '80%',
                rotate: '45deg',
                ease: 'sine',
                duration: 0.35,
                stagger: 0.1,
            });
            loaderTimeline.to('.loader-main-div', {
                translateY: '100%',
                display: 'hidden',
                ease: 'sine',
                duration: 1,
            });
            // let loaderTextTimeline = gsap.timeline({
            // });
            // // loaderTimeline.pause();
            // // loaderTextTimeline.pause();
            //
            // loaderTextTimeline.to('.loader-text', {
            //     text: 'Cooking...',
            //     duration: 1,
            //     ease: 'none',
            // });
            // loaderTextTimeline.to('.loader-text', {
            //     text: 'Baking...',
            //     duration: 1,
            //     ease: 'none',
            // });
            // loaderTextTimeline.to('.loader-text', {
            //     text: 'Eating...',
            //     duration: 1,
            //     ease: 'none',
            // });
            // loaderTextTimeline.to('.loader-text', {
            //     text: 'Loading...',
            //     duration: 1,
            //     ease: 'none',
            // });
            //
            // loaderTimeline.to('.loader-image', {
            //     scale: 1,
            //     duration: 0.35,
            //     ease: 'expoScale(0.5,7,none)',
            //     stagger: 1,
            // })
            // loaderTimeline.to('.loader-image', {
            //     yPercent: -80,
            //     duration: 0.25,
            //     ease: 'expoScale(0.5,7,none)',
            //     stagger: 0.1,
            // });
            // loaderTimeline.to('.loader-image', {
            //     yPercent: 120,
            //     duration: 0.65,
            //     ease: "expoScale(0.2,2,none)",
            //     stagger: -0.1,
            // }, '<+0.76');
            // loaderTimeline.to('.loader', {
            //     yPercent: 100,
            //     duration: 0.75,
            // }, '<+0.7');
            // loaderTimeline.to('.loader-text', {
            //     opacity: 0,
            //     duration: 0.75,
            // }, '<');
            // loaderTimeline.to('.main-content', {
            //     translateY: 0,
            //     duration: 0.75,
            // }, '<');
        } else {
            gsap.set('.loader-main-div', {
                display: 'none',
            })
        }


    })
</script>

<!--LOADER-->
<div class="h-screen w-full fixed top-0 bg-primary z-[200] loader-main-div">
    <div class="h-full w-full flex flex-col items-center justify-center relative">
        <div class="h-fit w-fit overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p class="text-[3.8rem] sm:text-9xl text-on-surface brand-font flex flex-row items-center justify-center">
                <span class="loader-page-heading-1 keep-stroke -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">U</span><span
                    class="loader-page-heading-1 keep-stroke -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">N</span><span
                    class="loader-page-heading-1 keep-stroke -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">I</span><span
                    class="loader-page-heading-1 keep-stroke -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">T</span><span
                    class="loader-page-heading-1 keep-stroke -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">E</span>
                <span class="loader-page-heading-1 -translate-y-[1400px] -translate-x-[80%] -rotate-[45deg]">&nbsp;C</span>
                <span class="loader-page-heading-1 -translate-y-[1600px] -translate-x-[80%] -rotate-[45deg]">U</span><span
                    class="loader-page-heading-1 -translate-y-[1800px] -translate-x-[80%] -rotate-[45deg]">L</span>
                <span class="loader-page-heading-1 -translate-y-[2000px] -translate-x-[80%] -rotate-[45deg]">T</span>
                <span class="loader-page-heading-1 -translate-y-[2000px] -translate-x-[80%] -rotate-[45deg]">U</span>
                <span class="loader-page-heading-1 -translate-y-[2200px] -translate-x-[80%] -rotate-[45deg]">R</span>
                <span class="loader-page-heading-1 -translate-y-[2400px] -translate-x-[80%] -rotate-[45deg]">E</span>
                <span class="loader-page-heading-1 -translate-y-[2600px] -translate-x-[80%] -rotate-[45deg]">S</span>
            </p>
        </div>
        <div class="h-fit w-full overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p class="text-[3.8rem] sm:text-9xl text-on-surface brand-font flex flex-row items-center justify-center">
                <span class="loader-page-heading-2 -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">C</span><span
                    class="loader-page-heading-2 -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">E</span><span
                    class="loader-page-heading-2 -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">L</span><span
                    class="loader-page-heading-2 -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">E</span><span
                    class="loader-page-heading-2 -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">B</span><span
                    class="loader-page-heading-2 -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">R</span><span
                    class="loader-page-heading-2 -translate-y-[1400px] -translate-x-[80%] -rotate-[45deg]">A</span>
                <span class="loader-page-heading-2 -translate-y-[1600px] -translate-x-[80%] -rotate-[45deg]">T</span><span
                    class="loader-page-heading-2 -translate-y-[1800px] -translate-x-[80%] -rotate-[45deg]">E</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[2000px] -translate-x-[80%] -rotate-[45deg]">&nbsp;T</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[2000px] -translate-x-[80%] -rotate-[45deg]">O</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[2200px] -translate-x-[80%] -rotate-[45deg]">G</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[2400px] -translate-x-[80%] -rotate-[45deg]">E</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[2600px] -translate-x-[80%] -rotate-[45deg]">T</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[2800px] -translate-x-[80%] -rotate-[45deg]">H</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[3000px] -translate-x-[80%] -rotate-[45deg]">E</span>
                <span class="loader-page-heading-2 keep-stroke -translate-y-[3200px] -translate-x-[80%] -rotate-[45deg]">R</span>
            </p>
        </div>
        <div class="h-fit w-full overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p class="text-[3.8rem] sm:text-9xl text-on-surface brand-font flex flex-row items-center justify-center">
                <span class="loader-page-heading-3 keep-stroke -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">D</span><span
                    class="loader-page-heading-3 keep-stroke -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">I</span><span
                    class="loader-page-heading-3 keep-stroke -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">S</span><span
                    class="loader-page-heading-3 keep-stroke -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">C</span><span
                    class="loader-page-heading-3 keep-stroke -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">O</span><span
                    class="loader-page-heading-3 keep-stroke -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">V</span><span
                    class="loader-page-heading-3 keep-stroke -translate-y-[1400px] -translate-x-[80%] -rotate-[45deg]">E</span>
                <span class="loader-page-heading-3 keep-stroke -translate-y-[1600px] -translate-x-[80%] -rotate-[45deg]">R</span><span
                    class="loader-page-heading-3 -translate-y-[1800px] -translate-x-[80%] -rotate-[45deg]">&nbsp;F</span>
                <span class="loader-page-heading-3 -translate-y-[2000px] -translate-x-[80%] -rotate-[45deg]">A</span>
                <span class="loader-page-heading-3 -translate-y-[2200px] -translate-x-[80%] -rotate-[45deg]">L</span>
                <span class="loader-page-heading-3 -translate-y-[2400px] -translate-x-[80%] -rotate-[45deg]">A</span>
                <span class="loader-page-heading-3 -translate-y-[2600px] -translate-x-[80%] -rotate-[45deg]">K</span>
            </p>
        </div>
    </div>
</div>

<!-- Landing Page -->
<div class="min-h-screen w-full flex flex-col items-center justify-center bg-surface main-content">
    <div class="h-screen w-full absolute top-0 overflow-hidden">
        <AICanvasClaude2/>
    </div>
    <div class="h-screen min-h-fit w-[325px] sm:w-[375px] bg-surface relative flex flex-col">
        <div class="h-1/2 w-full flex flex-col justify-center items-end relative">
            <div class="absolute top-12 right-[22px] flex flex-row items-center justify-center gap-3 pr-3 z-[100]">
                <button class="bg-on-surface text-surface relative regular-font text-xl text-center py-1.5 corner-br px-5 hover:bg-primary hover:text-on-surface duration-300 ease-in transition-all"
                        style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);"
                        on:click={() => {goto('/tickets')}}>
                    Tickets
                    <div class="absolute bottom-0 right-0 bg-surface"></div>
                </button>
                <button class="text-xl text-on-surface regular-font tracking-tight"
                        on:click={toggleNavbar}>Menu
                </button>
            </div>
            <time class="leading-none px-5 h-fit w-full grid grid-cols-12 pb-4 datetime-falak-main"
                  datetime="2024-10-04">
                <span class="brand-font translate-y-[0.08em] col-span-3 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">04</span>
                <span class="brand-font translate-y-[0.08em] col-span-2 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">10</span>
                <span class="brand-font translate-y-[0.08em] col-span-4 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">2024</span>
            </time>

        </div>
        <div class="h-fit w-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 flex flex-col items-start justify-center">
            <div class="content h-[15rem] w-full">
                <p class="absolute brand-font font-[400] z-[2] text-on-surface text-[9rem] leading-[8.125rem]">
                    FALAK <br> FESTIVAL
                </p>
                <p class="absolute brand-font text-on-surface text-[9rem] leading-[8.25rem]">
                    FALAK <br> FESTIVAL
                </p>
            </div>
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
        <div class="absolute right-0 top-0 h-[33vh] w-[20px] bg-primary"></div>
        <div class="absolute left-0 top-0 h-[33vh] w-[20px] bg-primary"></div>
        <p class="absolute left-[20px] top-6 regular-font text-[16px] font-thin rotate-180 text-on-surface"
           style="writing-mode: vertical-rl;">DEPARTURE</p>
        <div class="absolute left-0 bottom-0 min-h-[30vh] max-h-[40vh] w-[20px] bg-primary"></div>
        <div class="absolute right-0 bottom-0 min-h-[30vh] max-h-[40vh] w-[20px] bg-primary"></div>
    </div>
</div>


<style>
    .content {
        position: relative;
    }

    .content p:nth-child(1) {
        color: transparent;
        -webkit-text-stroke: 2px #F5FFFA;
    }

    .content p:nth-child(2) {
        color: #F5FFFA;
        -webkit-text-stroke: 2px #F5FFFA;
        animation: animate 3s ease-in-out infinite;
    }

    @keyframes animate {
        0%,
        100% {
            clip-path: polygon(
                    0% 65%, /* Moved up */ 16% 60%, /* Moved up */ 33% 70%, /* Moved down */ 54% 65%, /* Moved up */ 70% 75%, /* Moved down */ 84% 62%, /* Moved up */ 100% 70%, /* Moved down */ 100% 100%,
                    0% 100%
            );
        }

        50% {
            clip-path: polygon(
                    0% 75%, /* Moved down */ 15% 80%, /* Moved down */ 34% 70%, /* Moved up */ 51% 75%, /* Moved down */ 67% 65%, /* Moved up */ 84% 78%, /* Moved down */ 100% 70%, /* Moved up */ 100% 100%,
                    0% 100%
            );
        }
    }

    .keep-stroke {
        color: transparent;
        -webkit-text-stroke: 2px #F5FFFA;
    }
</style>
