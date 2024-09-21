<script>
    import "../app.css";
    import PageTransistion from "$lib/common/PageTransistion.svelte";
    import Navbar from "$lib/common/navbar.svelte";
    import Lenis from "lenis";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {onMount} from "svelte";
    import InfoSnackbar from "$lib/common/InfoSnackbar.svelte";
    import { inject } from '@vercel/analytics';
    import { dev } from '$app/environment';

    inject({ mode: dev ? 'development' : 'production' });

    onMount(() => {
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

<InfoSnackbar/>
<Navbar/>
<PageTransistion/>
<div class="main-wrapper bg-surface min-h-screen">
    <slot/>
</div>