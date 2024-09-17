<script>
    import {gsap} from "gsap/dist/gsap";

    export function animateLoadingPhase(prefix) {
        gsap.to(`.${prefix}-button-inner-text`, {
            opacity: 0,
            duration: 0,
        })
        gsap.to(`.${prefix}-loader-refresh`, {
            display: "flex",
            scale: 1,
            opacity: 1,
            ease: "circ.out",
            duration: 0.3,
        })
        let load = gsap.timeline({repeat: -1,})
        load.to(`.${prefix}-loader-refresh-dot`, {
            scale: 0.75,
            opacity: 0.8,
            ease: "bounce.out",
        });
        load.to(`.${prefix}-loader-refresh-dot`, {
            scale: 1,
            opacity: 1,
            ease: "bounce.out",
        });
    }

    export function stopLoadingPhase(prefix) {
        gsap.to(`.${prefix}-button-inner-text`, {
            opacity: 1,
            duration: 0,
        });
        gsap.to(`.${prefix}-loader-refresh`, {
            display: 'hidden',
            scale: 0,
            opacity: 0,
            duration: 0.3,
        })
    }
</script>