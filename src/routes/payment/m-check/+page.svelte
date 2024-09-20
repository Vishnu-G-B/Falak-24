<script>
    import HelperAnimations from "$lib/common/HelperAnimations.svelte";
    import {enhance} from "$app/forms";
    import {goto} from "$app/navigation";

    let helperAnimations;
</script>

<HelperAnimations bind:this={helperAnimations}/>
<div class="h-screen w-full flex flex-col items-center justify-center">
    <div class="h-[450px] mt-14 bg-surface flex flex-col items-center justify-start w-[320px] sm:w-[375px] relative">
        <div class="flex flex-row justify-between items-center">
            <p class="text-6xl brand-font text-on-surface mt-[20px] ml-[24px] mr-[24px]">JUST MADE A PAYMENT</p>
        </div>
        <div class="flex flex-row items-center mt-[50px] justify-center w-full gap-5 ">
            <p class="brand-font text-3xl text-on-surface">YOU</p>
            <p class="brand-font text-on-surface text-3xl">✈</p>
            <p class="brand-font text-3xl text-on-surface">MIT</p>
        </div>
        <div class="flex flex-col items-center mt-[28px] justify-center w-fit gap-5">
            <form action="?/checkPaymentAndGeneratePass" method="post" use:enhance={(event) => {
                helperAnimations.animateLoadingPhase('generate');
            }}>
                <button class="bg-primary text-on-surface relative w-fit regular-font text-xl text-center py-1.5 corner-br px-5
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                        type="submit"
                        style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);">
                    <p class="generate-button-inner-text">
                        Generate Pass
                    </p>
                    <div class="h-full w-full flex-col items-center justify-center generate-loader-refresh hidden scale-0 absolute top-0 left-0">
                        <div class="rounded-full bg-on-surface h-8 w-8 generate-loader-refresh-dot"></div>
                    </div>
                </button>
            </form>
            <button class="bg-primary text-on-surface w-full relative regular-font text-xl text-center py-1.5 corner-br px-5
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                    style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);"
                    on:click={() => {goto('/tickets')}}>
                Go Back
            </button>
        </div>
        <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
        <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
        <div class="absolute bottom-0 right-0 bg-on-surface p-2 text-surface h-fit w-fit regular-font mb-[20px] mr-[24px]">
            FLK 2024
        </div>
        <div class="absolute bottom-0 left-0 text-on-surface  p-2 h-fit w-fit regular-font mb-[20px] ml-[24px]">
            ARRIVAL
        </div>
    </div>
</div>