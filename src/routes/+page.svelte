<script>
    import barcode from '$lib/assets/images/barcode-kortrijk-belgium.svg?raw';
    // import {onMount} from "svelte";
</script>
<div class="min-h-screen w-full flex flex-col items-center justify-center bg-surface">
    <div class="h-screen w-[375px] bg-surface relative flex flex-col">
        <div class="h-1/2 w-full flex flex-col justify-center items-end relative">
            <div class="absolute top-12 right-[22px] flex flex-row items-center justify-center gap-3 pr-3 z-[100]">
                <button class="bg-on-surface text-surface relative regular-font text-xl text-center py-1.5 corner-br px-5 hover:bg-primary duration-300 ease-in transition-all"
                        style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);">
                    Tickets
                    <div class="absolute bottom-0 right-0 bg-surface"></div>
                </button>
                <p class="text-xl text-on-surface regular-font tracking-tight">Menu</p>
            </div>
            <time class="leading-none px-5 h-fit w-full grid grid-cols-12 pb-4" datetime="2024-10-04">
                <span class="brand-font translate-y-[0.08em] col-span-3 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">04</span>
                <span class="brand-font translate-y-[0.08em] col-span-2 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">10</span>
                <span class="brand-font translate-y-[0.08em] col-span-4 text-right text-[3.75rem] text-on-surface font-thin leading-[60px]">2024</span>
            </time>
        </div>
        <div class="h-fit w-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 flex flex-col items-start justify-center">
            <p class="brand-font font-[400] z-[2] text-on-surface text-[10rem] leading-[8.125rem]">FALAK</p>
            <p class="brand-font text-on-surface text-[10rem] leading-[8.25rem]">FESTIVAL</p>
        </div>
        <div class="h-[30%] w-full absolute bottom-0 px-8 items-center flex flex-row justify-center gap-1 pb-10">
            <div class="h-full w-fit relative flex flex-col items-end justify-end">
                {@html barcode}
            </div>
            <div class="h-full w-fit flex flex-col items-center justify-end">
                <p class="regular-font text-on-surface">2024</p>
                <div class="bg-on-surface text-surface px-3 py-2 regular-font">FLK</div>
            </div>
        </div>
        <!--        <div class="absolute top-0 h-[20px] w-full bg-primary"></div>-->
        <!--        <div class="absolute bottom-0 h-[20px] w-full bg-primary"></div>-->
        <div class="absolute right-0 top-0 h-[33vh] w-[20px] bg-primary"></div>
        <div class="absolute left-0 top-0 h-[33vh] w-[20px] bg-primary"></div>
        <p class="absolute left-[20px] top-6 regular-font text-[16px] font-thin rotate-180"
           style="writing-mode: vertical-rl;">DEPARTURE</p>
        <div class="absolute left-0 bottom-0 min-h-[30vh] max-h-[40vh] w-[20px] bg-primary"></div>
        <div class="absolute right-0 bottom-0 min-h-[30vh] max-h-[40vh] w-[20px] bg-primary"></div>
    </div>
</div>