<script>
    import "../app.css";
    import PageTransistion from "$lib/common/PageTransistion.svelte";
    import Navbar from "$lib/common/navbar.svelte";
    import Lenis from "lenis";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
    import {onMount} from "svelte";

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 0.5,
            touchMultiplier: 0.5,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        // gsap.ticker.lagSmoothing(0);
    })
</script>

<Navbar/>
<PageTransistion/>
<div class="main-wrapper bg-surface min-h-screen">
    <slot/>
</div>

