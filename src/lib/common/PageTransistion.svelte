<script>
    import {gsap} from "gsap/dist/gsap";
    import {onNavigate} from "$app/navigation";

    onNavigate(() => {
        return new Promise((resolve) => {
            let transition = gsap.timeline({
                onComplete: () => {
                    closeTransition.play(0);
                    resolve();
                }
            });
            let closeTransition = gsap.timeline();
            closeTransition.pause(0);
            transition.to('.main-transition', {
                translateY: 0,
                opacity: 1,
                display: 'flex',
                duration: 0.8,
                ease: "sine.inOut",
            });
            closeTransition.to('.main-transition', {
                translateY: '100%',
                // opacity: 0,
                duration: 0.8,
                display: 'none',
                ease: "sine",
                onComplete: () => {
                    gsap.set('.main-transition', {clearProps: true});
                }
            });
        });
    });
</script>

<div class="h-screen w-full fixed top-0 -translate-y-[100%] bg-primary main-transition z-[300] flex-col items-center justify-center hidden">
    <!--{@html logo}-->
</div>