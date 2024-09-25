<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";

    let browserName;
    onMount(() => {
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        var isInstagram = (ua.indexOf('Instagram') > -1);
        let isSamsungBrowser = (ua.indexOf('SamsungBrowser') > -1);
        if (isInstagram) {
            browserName = 'Instagram In-App Browser';
        } else if (isSamsungBrowser) {
            browserName = 'Samsung Browser';
        }
    });

    function hideForm(prefix) {
        let dataTimeline = gsap.timeline();
        dataTimeline.to(`.${prefix}-data-form`, {
            top: "100%",
            duration: 0.5,
            ease: "power4.out",
        });
        dataTimeline.to(`.${prefix}-data-form`, {
            display: 'none',
        });
    }

    $: reBrowserName = browserName
</script>
<div class="h-screen w-full fixed backdrop-blur-2xl flex register-data-form items-center justify-center z-[1000] px-4 pt-4">
    <button class="h-screen w-full bg-transparent absolute top-0" on:click={() => {hideForm('register')}}></button>
    <div class="h-fit w-fit max-w-[450px] relative border-4 border-primary bg-surface flex flex-col items-center justify-center z-[6] px-5 pt-5 pb-5 gap-5">
        <p class="text-2xl regular-font text-on-surface text-center"><span class="text-error">{reBrowserName}</span> is an unsupported browser. Please use
            another
            browser. You can view the website, but registration and login might not work as expected</p>
        <p class="text-xl regular-font text-on-surface/50 text-center">Click anywhere outside to close</p>
    </div>
</div>