<script>
    import footerImg from "$lib/assets/images/footer.gif";
    import {createEventDispatcher} from "svelte";

    const showMoreDispatch = createEventDispatcher();
    function handleShowMore() {
        showMoreDispatch('showMoreClick');
    }

    export let mainTitle;
    export let isPassHeading;
    export let showBuyButton;
</script>

<div class="w-[325px] h-[550px] relative bg-surface shadow-2xl flex-shrink-0">
    <div class="absolute top-0 h-full w-full bg-surface flex flex-col p-3">
        <div class="w-full flex flex-row items-start justify-between">
            <div class="flex flex-col gap-12">
                <p class="text-[16px] font-thin regular-font text-on-surface rotate-180 translate-y-[12px] translate-x-[4px]"
                   style="writing-mode: vertical-rl;">
                    LANDING
                </p>
                <div class="flex flex-col">
                    <p class="text-8xl brand-font text-on-surface bg-surface w-full -translate-x-[14px] z-[2] pt-2">
                        {mainTitle}
                    </p>
                </div>
            </div>
            <p class="text-xl regular-font text-surface bg-on-surface p-2 translate-y-[12px] -translate-x-[24px] text-nowrap">
                FLK 24
            </p>
        </div>
        <div class="w-full h-full flex flex-col items-center justify-between relative p-5">
            <p class="text-xl regular-font text-on-surface">
                Step into a vibrant celebration of talent, culture, and creativity. Open to all—join the experience!
                Coming Soon!
            </p>
            <div class="h-full w-full flex flex-row items-end justify-between gap-2">
                <img src="{footerImg}" alt="gif" class="h-1/5 w-full">
                {#if showBuyButton}
                    <div class="px-3 py-1 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface">
                        Buy Ticket
                    </div>
                {:else}
                    <button class="px-3 py-1 h-fit w-fit text-nowrap bg-primary regular-font text-on-surface"
                        on:click={handleShowMore}>
                        See All Passes
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