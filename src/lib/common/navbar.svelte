<script>
    import {onMount} from 'svelte';
    import {isNavbarOpen} from '$lib/stores/navStore.js';
    import horizontalBarcode from "$lib/assets/images/horizontalBarCode.svg?raw";
    import {browser} from '$app/environment';
    import {gsap} from "gsap";

    let heightTimeline;
    let containerHeight;
    let containerMovement;

    function setupAnimation() {
        if (containerHeight && containerMovement) {
            heightTimeline = gsap.timeline({paused: true});
            heightTimeline
                .to(containerHeight, {
                    height: "auto",
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .to(containerMovement, {
                    translateY: 0,
                    ease: "power1.inOut",
                    duration: 0.5
                }, "<");
        }
    }

    onMount(() => {
        setupAnimation();
    });

    $: if (containerHeight && containerMovement && !heightTimeline) {
        setupAnimation();
    }

    $: if (browser && heightTimeline) {
        if ($isNavbarOpen) {
            heightTimeline.play();
            document.getElementById("hamburger")?.classList.add("is-active");
        } else {
            heightTimeline.reverse();
            document.getElementById("hamburger")?.classList.remove("is-active");
        }
    }

    function closeNavbar() {
        $isNavbarOpen = false;
    }
</script>

<div class="fixed w-[375px] h-auto left-1/2 z-[999] top-0 transform -translate-x-1/2 border-solid border-0 border-surface">
    <div bind:this={containerHeight} class="h-0 w-full overflow-hidden">
        <div class="h-full w-full bg-on-surface text-primary brand-font uppercase px-6 border-b-4 border-solid border-surface">
            {@html horizontalBarcode}
            <ul class="py-6">
                <li class="">
                    <a href="/" aria-current="page"
                       class="text-5xl block text-center py-1 underline text-alt">Home</a>
                </li>
                <li class="">
                    <a href="/schedule" class="text-5xl block text-center py-1 hover:text-alt">Schedule</a>
                </li>
                <li class="">
                    <a href="/practical" class="text-5xl block text-center py-1 hover:text-alt">Practical</a>
                </li>
                <li class="">
                    <a href="/partners" class="text-5xl block text-center py-1 hover:text-alt">Partners</a>
                </li>
            </ul>
        </div>
    </div>
    <div bind:this={containerMovement}
         class="w-full h-[3.75rem] flex transform -translate-y-full bg-on-surface justify-center items-center">
        <div class="w-1/2 h-full px-5 py-2">
            <!-- Logo placeholder -->
            <!--            <img src="{logo}">-->

        </div>
        <div class="w-1/2 h-full flex justify-between items-center pl-5">
            <button class="bg-primary text-on-surface relative regular-font text-xl text-center py-1.5 corner-br px-5 hover:bg-surface duration-300 ease-in transition-all"
                    style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);">
                Tickets
                <div class="absolute bottom-0 right-0 bg-surface"></div>
            </button>
            <div class="hidden is-active"></div>
            <button id="hamburger" class="hamburger hamburger--collapse is-active" type="button" on:click={closeNavbar}>
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
        </div>
    </div>
</div>

<style>
    .hamburger {
        padding: 0 10px 0 0;
        display: inline-block;
        cursor: pointer;
        transition-property: opacity, filter;
        transition-duration: 0.15s;
        transition-timing-function: linear;
        font: inherit;
        color: inherit;
        text-transform: none;
        background-color: transparent;
        border: 0;
        margin: 0;
        overflow: visible;
    }

    .hamburger.is-active .hamburger-inner,
    .hamburger.is-active .hamburger-inner::before,
    .hamburger.is-active .hamburger-inner::after {
        background-color: #000;
    }

    .hamburger-box {
        width: 40px;
        height: 24px;
        display: inline-block;
        position: relative;
    }

    .hamburger-inner {
        display: block;
        top: 50%;
        margin-top: -2px;
    }

    .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {
        width: 35px;
        height: 3px;
        background-color: #000;
        border-radius: 4px;
        position: absolute;
        transition-property: transform;
        transition-duration: 0.15s;
        transition-timing-function: ease;
    }

    .hamburger-inner::before, .hamburger-inner::after {
        content: "";
        display: block;
    }

    .hamburger-inner::before {
        top: -10px;
    }

    .hamburger-inner::after {
        bottom: -10px;
    }

    .hamburger--collapse .hamburger-inner {
        top: auto;
        bottom: 0;
        transition-duration: 0.13s;
        transition-delay: 0.13s;
        transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .hamburger--collapse .hamburger-inner::after {
        top: -20px;
        transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), opacity 0.1s linear;
    }

    .hamburger--collapse .hamburger-inner::before {
        transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    .hamburger--collapse.is-active .hamburger-inner {
        transform: translate3d(0, -10px, 0) rotate(-45deg);
        transition-delay: 0.22s;
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .hamburger--collapse.is-active .hamburger-inner::after {
        top: 0;
        opacity: 0;
        transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333), opacity 0.1s 0.22s linear;
    }

    .hamburger--collapse.is-active .hamburger-inner::before {
        top: 0;
        transform: rotate(-90deg);
        transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333), transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .corner-br {
        -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - .625rem), calc(100% - .625rem) 100%, 0 100%);
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - .625rem), calc(100% - .625rem) 100%, 0 100%)
    }
</style>