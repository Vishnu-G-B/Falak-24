<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        const vh = (coef) => window.innerHeight * (coef / 100);
        // Content Showcase timelines

        // STAGE 1 Timelines
        let scrollAnimStage1 = gsap.timeline({
            scrollTrigger: {
                markers: false,
                id: "stage1",
                trigger: '.scrollAnimParent',
                start: 'top top',
                end: 'top+=' + vh(150) + ' top',
                scrub: 1,
            }
        });

        scrollAnimStage1
            .to(".scrollAnimStage1", {
                opacity: 1,
                duration: 0.1,
                ease: "power2.inOut"
            })
            .to(".scrollAnimStage1", {
                translateZ: "50em",
            }, "<");

        let scrollControllerStage1 = gsap.timeline({
            scrollTrigger: {
                markers: false,
                id: "scrollController",
                trigger: '.scrollStage1Parent',
                start: 'bottom 20%',
                end: 'bottom top',
                scrub: 1,
            }
        });

        scrollControllerStage1
            .to('.scrollAnimStage1', {
                opacity: 0,
                duration: 0.2,
            })
            .to(".sectionTextStage1", {
                translateY: "-100%",
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<")

            .to(".sectionTextStage2", {
                translateY: "0%",
                opacity: 1,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<")
            .to(".scrollAnimParent", {
                backgroundColor: "#BEB7A4",
                duration: 0.5,
                ease: "power2.inOut",
            }, "<")


        // STAGE 2 Timelines

        let scrollAnimStage2 = gsap.timeline({
            scrollTrigger: {
                markers: false,
                id: "stage2",
                trigger: '.scrollAnimParent',
                start: 'top+=' + vh(100.1) + ' top',
                end: 'top+=' + vh(250) + ' top',
                scrub: 1,
            }
        });

        scrollAnimStage2
            .to(".scrollAnimStage2", {
                opacity: 1,
                duration: 0.1,
                ease: "power2.inOut"
            }, "<")
            .to(".scrollAnimStage2", {
                translateZ: "50em",
            }, "<");

        let scrollControllerStage2 = gsap.timeline({
            scrollTrigger: {
                markers: false,
                id: "scrollController2",
                trigger: ".scrollStage2Parent",
                start: 'bottom 20%',
                end: 'bottom top',
                scrub: 1,
            }
        });

        scrollControllerStage2
            .to(".scrollAnimStage2", {
                opacity: 0,
                duration: 0.2,
            })
            .to(".sectionTextStage2", {
                translateY: "-100%",
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<+=0.2")
            .to(".sectionTextStage3", {
                translateY: "0%",
                opacity: 1,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<")
            .to(".scrollAnimParent", {
                backgroundColor: "#2D898B",
                duration: 0.5,
                ease: "power2.inOut",
            }, "<")

        // STAGE 3 Timelines

        let scrollAnimStage3 = gsap.timeline({
            scrollTrigger: {
                markers: false,
                id: "stage2",
                trigger: '.scrollAnimParent',
                start: 'top+=' + vh(200.1) + ' top',
                end: 'top+=' + vh(350) + ' top',
                scrub: 1,
            }
        });

        scrollAnimStage3
            .to(".scrollAnimStage3", {
                opacity: 1,
                duration: 0.1,
                ease: "power2.inOut"
            }, "<")
            .to(".scrollAnimStage3", {
                translateZ: "50em",
            }, "<");

        let scrollControllerStage3 = gsap.timeline({
            scrollTrigger: {
                markers: false,
                id: "scrollController3",
                trigger: ".scrollStage3Parent",
                start: 'bottom 20%',
                end: 'bottom top',
                scrub: 1,
            }
        });

        scrollControllerStage3
            .to(".scrollAnimStage3", {
                opacity: 0,
                duration: 0.2,
            })
            .to(".sectionTextStage3", {
                translateY: "-100%",
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<+=0.2");
    });

</script>

<div class="scrollAnimParent h-[400vh] w-full bg-surface relative" style="perspective: 800px;">
    <div class="scrollStage1Parent h-screen w-full sticky top-0 overflow-hidden"
         style="perspective: 800px;">
        <div class="h-fit w-fit p-2 absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2
                overflow-hidden">
            <div class="sectionTextStage1 font-tripSans text-on-surface text-center text-9xl transform">
                Cultural
            </div>
        </div>
        <div class="scrollAnimStage1 h-[6.25rem] w-[18.75rem] bg-primary absolute left-[45%] top-1/3 rounded
                border-2 border-on-surface border-solid
                transform -translate-x-1/2 -translate-y-1/2 opacity-0
                flex justify-center items-center text-center">
            Button Rotate
        </div>
        <div class="scrollAnimStage1 h-[19rem] w-[12rem] bg-primary absolute left-3/4 top-1/3 rounded
                border-2 border-on-surface border-solid
                transform -translate-x-1/2 -translate-y-1/2 opacity-0
                flex justify-center items-center text-center">
            Image Vertical
        </div>
        <div class="scrollAnimStage1 h-[12.5rem] w-[20.625rem] bg-primary absolute left-2/4 top-[68%] rounded
                border-2 border-on-surface border-solid
                transform -translate-x-1/2 -translate-y-1/2 opacity-0
                flex justify-center items-center text-center">
            Image Horizontal
        </div>
    </div>
    <div class="scrollStage2Parent h-screen w-full sticky top-0 overflow-hidden"
         style="perspective: 800px;">
        <div class="h-fit w-fit p-2 absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2
                        overflow-hidden">
            <div class="sectionTextStage2 font-tripSans text-on-surface text-center text-9xl
                        transform translate-y-full opacity-0">
                Sports
            </div>
        </div>
        <div class="scrollAnimStage2 h-[6.25rem] w-[18.75rem] bg-primary absolute left-[45%] top-1/3 rounded
                        border-2 border-on-surface border-solid
                        transform -translate-x-1/2 -translate-y-1/2 opacity-0
                        flex justify-center items-center text-center">
            Button Rotate
        </div>
        <div class="scrollAnimStage2 h-[19rem] w-[12rem] bg-primary absolute left-3/4 top-1/3 rounded
                        border-2 border-on-surface border-solid
                        transform -translate-x-1/2 -translate-y-1/2 opacity-0
                        flex justify-center items-center text-center">
            Image Vertical
        </div>
        <div class="scrollAnimStage2 h-[12.5rem] w-[20.625rem] bg-primary absolute left-2/4 top-[68%] rounded
                        border-2 border-on-surface border-solid
                        transform -translate-x-1/2 -translate-y-1/2 opacity-0
                        flex justify-center items-center text-center">
            Image Horizontal
        </div>
    </div>
    <div class="scrollStage3Parent h-screen w-full sticky top-0 overflow-hidden"
         style="perspective: 800px;">
        <div class="h-fit w-fit p-2 absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2
                        overflow-hidden">
            <div class="sectionTextStage3 font-tripSans text-on-surface text-center text-9xl
                        transform translate-y-full opacity-0">
                Something
            </div>
        </div>
        <div class="scrollAnimStage3 h-[6.25rem] w-[18.75rem] bg-primary absolute left-[45%] top-1/3 rounded
                        border-2 border-on-surface border-solid
                        transform -translate-x-1/2 -translate-y-1/2 opacity-0
                        flex justify-center items-center text-center">
            Button Rotate
        </div>
        <div class="scrollAnimStage3 h-[19rem] w-[12rem] bg-primary absolute left-3/4 top-1/3 rounded
                        border-2 border-on-surface border-solid
                        transform -translate-x-1/2 -translate-y-1/2 opacity-0
                        flex justify-center items-center text-center">
            Image Vertical
        </div>
        <div class="scrollAnimStage3 h-[12.5rem] w-[20.625rem] bg-primary absolute left-2/4 top-[68%] rounded
                        border-2 border-on-surface border-solid
                        transform -translate-x-1/2 -translate-y-1/2 opacity-0
                        flex justify-center items-center text-center">
            Image Horizontal
        </div>
    </div>
</div>