<script>
    import {goto} from "$app/navigation";
</script>
<div class="h-fit w-full bg-surface flex items-center justify-center">
    <div class="h-screen w-fit p-5 flex flex-col items-center justify-center">
        <p class="brand-font text-8xl w-full text-primary text-left">DISCLAIMER!</p>
        <p class="brand-font text-3xl w-full text-primary text-left">COME BACK TO THIS PAGE AFTER YOU HAVE COMPLETED
            YOUR PAYMENT</p>
        <ul class="list-disc marker:text-primary text-2xl p-5">
            <li class="text-on-surface">
                <p class="regular-font text-xl text-on-surface text-left mt-7">Please make your payment on the site that opens next</p>
            </li>
            <li>
                <p class="regular-font text-xl text-on-surface text-left">Please save the receipt that is generated.</p>
            </li>
            <li>
                <p class="regular-font text-xl text-on-surface text-left">Your pass will be generated automatically within two days</p>
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
        <button class="w-full h-fit bg-primary py-1 brand-font text-3xl text-on-surface flex items-center justify-center"
                on:click={() => {
            window.open('https://payment.manipal.edu/falak-Login', '_blank');
        }}>
            CONTINUE
        </button>
    </div>
</div>