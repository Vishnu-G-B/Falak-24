<script>
    import {goto} from "$app/navigation";
</script>

<svelte:head>
    <title>DISCLAIMER!</title>
</svelte:head>


<div class="min-h-screen h-fit w-full bg-surface flex items-center justify-center mt-12 overflow-x-hidden">
    <div class="h-fit w-fit p-5 flex flex-col items-center justify-center">
        <p class="brand-font text-8xl w-full text-primary text-left">DISCLAIMER!</p>
        <p class="brand-font text-3xl w-full text-primary text-left">COME BACK TO THIS PAGE AFTER YOU HAVE COMPLETED
            YOUR PAYMENT</p>
        <ul class="list-disc marker:text-primary text-2xl p-5">
            <li class>
                <p class="regular-font text-xl text-on-surface text-left mt-7">The MOBILE NUMBER needs to be the SAME on
                    both the payments site and the fests site</p>
            </li>
            <li class="text-on-surface">
                <p class="regular-font text-xl text-on-surface text-left">Please make your payment on the site that
                    opens next</p>
            </li>
            <li class="text-on-surface">
                <p class="regular-font text-xl text-on-surface text-left">Please come back to this page after making
                    your payment to generate your passes</p>
            </li>
            <li>
                <p class="regular-font text-xl text-on-surface text-left">Please save the receipt that is generated.</p>
            </li>
            <li>
                <p class="regular-font text-xl text-on-surface text-left">We are sorry for this inconvenience.</p>
            </li>
            <li>
                <p class="regular-font text-xl text-on-surface text-left">Also make sure to enter the same details
                    as
                    entered on the fests website.</p>
            </li>
        </ul>
        <button class="w-full h-fit bg-primary py-1 brand-font text-3xl pt-2 text-on-surface flex items-center justify-center"
                on:click={async () => {
            window.open('https://payment.manipal.edu/falak-Login', '_blank');
            await goto('/payment/m-check');
        }}>
            CONTINUE
        </button>
    </div>
</div>