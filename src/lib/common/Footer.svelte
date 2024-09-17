<script>
    import barcodeImg from "$lib/assets/images/svgs/updated_2.svg";
    import horizontalBarcode from "$lib/assets/images/svgs/footerBarcode.svg";
    import instagram from "$lib/assets/images/icons/instagram.svg";
    import twitter from "$lib/assets/images/icons/twitterx.svg";
    import linkedin from "$lib/assets/images/icons/linkedin.svg";
    import meta from "$lib/assets/images/icons/meta.svg";
</script>

<div class="h-[380px] w-[325px] sm:w-[375px] bg-primary relative mx-auto mt-1">
    <!--    <div class="h-fit w-full text-surface brand-font text-9xl text-center uppercase self-start">FALAK</div>-->
    <!--    <div class="h-1/4 w-full flex justify-center overflow-hidden -mb-10">-->
    <!--        <img src="{barcodeImg}" alt="barcode" class="h-full w-[85%] object-cover">-->
    <!--    </div>-->
    <div class="h-fit w-full text-on-surface brand-font text-[4.3rem] sm:text-[5rem] text-center uppercase tracking-wide">
        Falak&nbsp;Festival
    </div>
    <div class="h-[55px] w-[89%] mx-auto -mt-6 sm:-mt-8">
        <img src="{barcodeImg}" alt="barcode" class="w-full h-full object-cover">
    </div>
    <button class="h-fit w-[90%] mx-auto flex justify-between items-center border-2 border-black bg-surface text-on-surface
                    hover:bg-on-surface hover:text-black py-2 px-3 group mt-4">
        <span class="regular-font ">Login and participate NOW!!</span>
        <span class="border-l border-l-on-surface pl-2.5 group-hover:border-l-surface ">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                   class="overflow-visible astro-GCN2MC3V">
                <circle cx="15" cy="15" r="15"
                        class="fill-on-surface group-hover:stroke-black group-hover:stroke-2 "></circle>
                <path d="M14.9755 7L22.9755 15L14.9755 23" stroke-width="2" class="stroke-black "></path>
                <path d="M6 15L22.9755 15" stroke-width="2" class="stroke-black"></path>
              </svg>
            </span>
    </button>
    <div class="w-full h-fit flex justify-center items-center mt-7">
        <div class="h-fit w-3/4 flex justify-center items-center gap-2">
            <button class="h-[48px] w-[48px] bg-surface p-1.5">
                <img src="{instagram}" alt="instagram logo" class="w-full h-full object-cover">
            </button>
            <button class="h-[48px] w-[48px] bg-surface p-1.5">
                <img src="{twitter}" alt="twitter logo" class="w-full h-full object-cover">
            </button>
            <button class="h-[48px] w-[48px] bg-surface p-1.5">
                <img src="{linkedin}" alt="linkedin logo" class="w-full h-full object-cover">
            </button>
            <button class="h-[48px] w-[48px] bg-surface p-1.5">
                <img src="{meta}" alt="meta logo" class="w-full h-full object-cover">
            </button>
        </div>
    </div>
    <div class="h-[400px] w-[90%] absolute -bottom-[21rem] left-1/2 transform -translate-x-1/2 z-10">
        <img src="{horizontalBarcode}" alt="footer barcode" class="w-full h-full object-cover z-10">
    </div>
</div>
<div class="bg-surface h-[350px] w-[325px] sm:w-[375px] relative mx-auto z-[1]">

</div>