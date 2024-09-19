<script>
    import {onMount} from 'svelte';
    import {isNavbarOpen, toggleNavbar} from '$lib/stores/navStore.js';
    import horizontalBarcode from "$lib/assets/images/svgs/horizontalBarCode.svg?raw";
    import {browser} from '$app/environment';
    import {goto} from "$app/navigation";
    import {gsap} from "gsap";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {page} from "$app/stores";
    import {signIn, signOut} from "@auth/sveltekit/client";

    let heightTimeline;
    let containerHeight;
    let containerMovement;
    let minimalNav;
    let isHomePage;

    function setupAnimation() {
        if (containerHeight && containerMovement) {
            heightTimeline = gsap.timeline({paused: true, id: "navbarExpandTimeline"});
            heightTimeline
                .to(containerHeight, {
                    height: "auto",
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .to(containerMovement, {
                    display: "flex",
                    translateY: 0,
                    ease: "power1.inOut",
                    duration: 0.5
                }, "<");
        }
    }

    onMount(() => {
        setupAnimation();
        gsap.registerPlugin(TextPlugin);

        if (browser) {
            const showMinimalNavThreshold = 60;

            window.addEventListener('scroll', () => {
                if (isHomePage) {
                    if (window.scrollY > showMinimalNavThreshold) {
                        gsap.to(minimalNav, {translateY: 0, duration: 0.3});
                    } else {
                        gsap.to(minimalNav, {translateY: '-100%', duration: 0.3});
                    }
                }
            });
        }
    });

    $: isHomePage = $page.url.pathname === "/";

    $: if (browser && heightTimeline) {
        if ($isNavbarOpen) {
            heightTimeline.play();
            document.getElementById("hamburger")?.classList.add("is-active");
        } else {
            heightTimeline.reverse();
            document.getElementById("hamburger")?.classList.remove("is-active");
        }
    }

    $: if (browser && minimalNav) {
        if (isHomePage) {
            gsap.set(minimalNav, {translateY: '-100%'});
        } else {
            gsap.to(minimalNav, {translateY: 0, duration: 0.3, delay: 0.2});
        }
    }

    async function handleNavigation(path) {
        if ($page.url.pathname !== path) {
            gsap.set(minimalNav, {opacity: 0});
            gsap.to(".nav-links", {
                opacity: 0,
                duration: 0.1,
                ease: "power1.inOut",
            });
            let textMappings = {
                "/": "Home",
                "/events": "Events",
                "/my-tickets": "My Tickets",
                "/tickets": "Tickets",
            }
            gsap.to("#loading-text", {
                display: "flex",
                opacity: 1,
                duration: 0.3,
                ease: "power1.inOut",
            });
            gsap.to("#loading-text-div", {
                duration: 0.3,
                ease: "power1.inOut",
                text: {
                    value: textMappings[path],
                    delimiter: "",
                },
            })
            await goto(path);
        }
    }
</script>

<div class="fixed w-[325px] sm:w-[375px] h-auto left-1/2 z-[999] top-0 transform -translate-x-1/2 border-solid border-0 border-surface">
    <div bind:this={containerHeight} class="h-0 w-full overflow-hidden relative">
        <div class="h-full w-full bg-on-surface text-primary brand-font uppercase px-6 border-b-4 border-solid border-surface relative">
            <div id="loading-text" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                        w-full h-full bg-on-surface justify-center items-center
                        text-7xl hidden opacity-0 flex-col opacity-1 brand-font">
                <div id="loading-text-div"></div>
                <div class="loader"></div>
            </div>
            {@html horizontalBarcode}
            <ul class="py-6 w-full">
                <li class="nav-links w-full flex justify-center items-center">
                    <button on:click={() => {handleNavigation("/")}} aria-current="page"
                            class="text-5xl block text-center py-1 {($page.url.pathname === '/') ? 'underline' : ''} cursor-pointer uppercase">
                        Home
                    </button>
                </li>
                <li class="nav-links w-full flex justify-center items-center">
                    <button on:click={() => {handleNavigation("/events")}} aria-current="page"
                            class="text-5xl block text-center py-1 {($page.url.pathname === '/events') ? 'underline' : ''} cursor-pointer uppercase">
                        Events
                    </button>
                </li>
                <li class="nav-links w-full flex justify-center items-center">
                    <button on:click={() => {handleNavigation("/my-tickets")}} aria-current="page"
                            class="text-5xl block text-center py-1 {($page.url.pathname === '/my-tickets') ? 'underline' : ''} cursor-pointer uppercase">
                        My Tickets
                    </button>
                </li>

                <!--                <li class="w-full flex justify-center items-center">-->
                <!--                    <button class="text-5xl block text-center py-1 hover:text-alt cursor-pointer uppercase">Coming-->
                <!--                        Soon...-->
                <!--                    </button>-->
                <!--                </li>-->
                <!--                <li class="">-->
                <!--                    <a href="/practical" class="text-5xl block text-center py-1 hover:text-alt">Practical</a>-->
                <!--                </li>-->
                <!--                <li class="">-->
                <!--                    <a href="/partners" class="text-5xl block text-center py-1 hover:text-alt">Partners</a>-->
                <!--                </li>-->
            </ul>
        </div>
    </div>
    <div bind:this={containerMovement}
         class="w-full h-[3.75rem] hidden transform -translate-y-full bg-on-surface justify-center items-center">
        <div class="w-1/2 h-full px-5 py-2">
            <!-- Logo placeholder -->
            <!--            <img src="{logo}">-->
            <button class="bg-primary text-on-surface relative regular-font text-xl text-center py-1.5 corner-br px-5
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                    style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);"
                    on:click={async () => {
                        if($page.data.session?.user){
                            await signOut({ callbackUrl: '/?status=1&details=Signed%20Out%20Successfully'});
                        } else {
                            await signIn('google', {callbackUrl: `${$page.url.pathname}?status=2&details=Signed%20In`})
                        }
                    }}>
                {#if $page.data.session?.user}
                    Sign Out
                {:else}
                    Sign In
                {/if}
            </button>
        </div>
        <div class="w-1/2 h-full flex justify-between items-center sm:pl-5">
            <button class="bg-primary text-on-surface relative regular-font text-xl text-center py-1.5 corner-br px-5
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                    style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);"
                    on:click={() => {handleNavigation("/tickets")}}>
                Tickets
                <div class="absolute bottom-0 right-0 bg-surface"></div>
            </button>
            <div class="hidden is-active"></div>
            <button id="hamburger" class="hamburger hamburger--collapse is-active" type="button"
                    on:click={toggleNavbar}>
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
        </div>
    </div>
</div>

<!-- Minimal Nav -->
<div class="minimalNav fixed w-[325px] sm:w-[375px] h-[60px] left-1/2 z-[998] top-0 -translate-x-1/2 border-solid border-0
            border-surface bg-white transform corner-br -translate-y-full"
     bind:this={minimalNav}
>
    <div class="h-full w-full flex justify-center items-center">
        <div class="h-full w-full flex justify-between items-center px-2">
            <button class="bg-primary text-on-surface relative regular-font text-xl text-center py-1.5 corner-br px-5
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                    style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);"
                    on:click={() => {handleNavigation("/tickets")}}>
                Tickets
                <div class="absolute bottom-0 right-0 bg-surface"></div>
            </button>
            <button id="hamburger" class="hamburger hamburger--collapse" type="button" on:click={toggleNavbar}>
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

    .loader {
        width: 48px;
        height: 48px;
        position: relative;
        z-index: 999;
    }

    .loader:before {
        content: '';
        width: 48px;
        height: 5px;
        background: #0156cf;
        position: absolute;
        top: 60px;
        left: 0;
        border-radius: 50%;
        animation: shadow324 0.5s linear infinite;
    }

    .loader:after {
        content: '';
        width: 100%;
        height: 100%;
        background: #0156cf;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        animation: jump7456 0.5s linear infinite;
    }

    @keyframes jump7456 {
        15% {
            border-bottom-right-radius: 3px;
        }

        25% {
            transform: translateY(9px) rotate(22.5deg);
        }

        50% {
            transform: translateY(18px) scale(1, .9) rotate(45deg);
            border-bottom-right-radius: 40px;
        }

        75% {
            transform: translateY(9px) rotate(67.5deg);
        }

        100% {
            transform: translateY(0) rotate(90deg);
        }
    }

    @keyframes shadow324 {

        0%,
        100% {
            transform: scale(1, 1);
        }

        50% {
            transform: scale(1.2, 1);
        }
    }
</style>