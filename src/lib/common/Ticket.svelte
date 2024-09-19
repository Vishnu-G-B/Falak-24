<script>
    import footerImg from "$lib/assets/images/footer.gif";
    import {createEventDispatcher} from "svelte";
    import {page} from "$app/stores";
    import {signIn} from "@auth/sveltekit/client";
    import HelperAnimations from "$lib/common/HelperAnimations.svelte";
    import {goto} from "$app/navigation";

    const showMoreDispatch = createEventDispatcher();
    const buyDispatch = createEventDispatcher();
    let helperAnimations;

    function handleShowMore() {
        showMoreDispatch('showMoreClick');
    }

    function handleBuy() {
        buyDispatch('buyClicked');
    }

    export let mainTitle;
    export let description;
    export let descriptionText = "Step into a vibrant celebration of talent, culture, and creativity. Open to all—join the experience! Coming Soon!";
    export let secondaryDescriptionText = "";
    export let disableActionButton = false;
    export let noButton = false;
    export let showGenerateButton = false;
    export let enlargeSecondary = false;
    export let showBuyButton;
    export let includesArray;
    export let price;
</script>
<HelperAnimations bind:this={helperAnimations}/>

<div class="w-[300px] h-[525px] sm:w-[325px] sm:h-[550px] relative bg-surface shadow-2xl flex-shrink-0">
    <div class="absolute top-0 h-full w-full bg-surface flex flex-col p-3">
        <div class="w-full flex flex-row items-start justify-between">
            <div class="flex flex-col gap-12">
                <p class="text-[16px] font-thin regular-font text-on-surface rotate-180 translate-y-[12px] translate-x-[4px]"
                   style="writing-mode: vertical-rl;">
                    LANDING
                </p>
                <div class="flex flex-col">
                    <p class="text-7xl sm:text-8xl brand-font text-on-surface bg-surface w-full -translate-x-[14px] z-[2] pt-2">
                        {mainTitle}
                    </p>
                </div>
            </div>
            <p class="text-xl regular-font text-surface bg-on-surface p-2 translate-y-[12px] -translate-x-[20px]
                        sm:-translate-x-[24px] text-nowrap">
                FLK 24
            </p>
        </div>
        <div class="w-full h-full flex flex-col items-center justify-between relative p-5">
            {#if description}
                <p class="text-xl regular-font text-on-surface">
                    {descriptionText} <br>
                    {#if enlargeSecondary}
                        <span class="regular-font text-3xl">
                            {secondaryDescriptionText}
                        </span>
                    {:else}
                        {secondaryDescriptionText}
                    {/if}
                </p>
            {:else}
                <div class="h-fit w-full flex flex-col items-center justify-center py-2 regular-font text-lg px-5">
                    <ul class="list-disc marker:text-green-600 marker:text-2xl text-on-surface">
                        {#each includesArray as includeValue}
                            <li>{includeValue}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
            <div class="h-full w-full flex flex-row items-end justify-center gap-2 group cursor-pointer">
                {#if !noButton && !disableActionButton}
                    {#if showBuyButton}
                        <img src="{footerImg}" alt="gif" class="h-[37px] w-[40%] sm:w-[55%]">
                        {#if $page.data.session}
                            <button class="px-3 py-2 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface group-hover:bg-surface relative duration-300 ease transition-all"
                                    on:click={() => {helperAnimations.animateLoadingPhase('ticket-buy'); handleBuy();}}>
                                <p class="ticket-buy-button-inner-text">Buy <span
                                        class="ml-2 bg-surface p-2 group-hover:bg-primary duration-300 ease transition-all">₹{price}</span>
                                </p>
                                <div class="h-full w-full flex-col items-center justify-center ticket-buy-loader-refresh hidden scale-0 absolute top-0 left-0">
                                    <div class="rounded-full bg-on-surface h-8 w-8 ticket-buy-loader-refresh-dot"></div>
                                </div>
                            </button>
                        {:else}
                            <button class="px-3 py-2 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface group-hover:bg-surface duration-300 ease transition-all"
                                    on:click={async () => {
                                        await signIn('google', {callbackUrl: `${$page.url.pathname}?status=2&details=Signed%20In`})
                                    }}>
                                Login
                            </button>
                        {/if}
                    {:else}
                        {#if !showGenerateButton}
                            <img src="{footerImg}" alt="gif" class=" h-[31px] w-[40%] sm:w-[50%]">
                        {:else}
                            <button class="px-3 py-1 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface"
                                    on:click={async () => {goto('/payment/m-check')}}>
                                Generate Pass
                            </button>
                        {/if}
                        <button class="px-3 py-1 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface"
                                on:click={handleShowMore}>
                            See All Tickets
                        </button>
                    {/if}
                {:else if noButton && !disableActionButton}
                    <img src="{footerImg}" alt="gif" class="h-[31px] w-full">
                {:else}
                    <button class="px-3 py-1 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface"
                            on:click={async () => {goto('/payment/m-check')}}>
                        Generate Pass
                    </button>
                    <button class="px-3 py-1 h-fit w-fit text-nowrap bg-primary/50 cursor-not-allowed regular-font text-on-surface"
                            disabled>
                        See All Tickets
                    </button>
                {/if}
            </div>
        </div>
    </div>
    <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
    <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
    <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
    <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
</div>