<script>
    import "../app.css";
    import PageTransistion from "$lib/common/PageTransistion.svelte";
    import Navbar from "$lib/common/navbar.svelte";
    import Lenis from "lenis";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {onMount} from "svelte";
    import InfoSnackbar from "$lib/common/InfoSnackbar.svelte";
    import {inject} from '@vercel/analytics';
    import {dev} from '$app/environment';
    import UnsupportedUserAgent from "$lib/common/UnsupportedUserAgent.svelte";

    inject({mode: dev ? 'development' : 'production'});

    let isInstagram;
    let isSamsungBrowser;

    onMount(() => {
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        isInstagram = (ua.indexOf('Instagram') > -1);
        isSamsungBrowser = (ua.indexOf('SamsungBrowser') > -1);

        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
            lerp: 0.05
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
    })
</script>
{#if isInstagram || isSamsungBrowser}
    <UnsupportedUserAgent/>
{/if}
<InfoSnackbar/>
<Navbar/>
<PageTransistion/>
<div class="main-wrapper bg-surface min-h-screen">
    <slot/>
</div>