<script>
    import {page} from "$app/stores";
    import {gsap} from "gsap/dist/gsap";
    import {browser} from "$app/environment";

    let snackStatus;
    let details;
    let backgroundColor;
    let foregroundColor;

    function flyIn() {
        gsap.to('.snackbar', {
            top: '28px',
            ease: 'sine',
        });
        setTimeout(() => {
            gsap.to('.snackbar', {
                top: '-100%',
                ease: 'sine',
            });
        }, 3000);
    }

    $: if (browser) {
        snackStatus = $page.url.searchParams.get('status');
        details = $page.url.searchParams.get('details');

        if (snackStatus) {
            if (snackStatus === '1') {
                backgroundColor = '#ffb4ab';
                foregroundColor = '#690005';
            } else if (snackStatus === '2') {
                backgroundColor = '#d4edda';
                foregroundColor = '#155724';
            }
            flyIn();
        }
    }
</script>

<div class="fixed w-[325px] sm:w-[375px] h-auto left-1/2 z-[999] -top-[100%] transform -translate-x-1/2 flex items-center justify-center p-2 snackbar" style="background-color: {backgroundColor}">
    <p class="text-3xl brand-font uppercase pt-1" style="color: {foregroundColor}">{details}</p>
</div>