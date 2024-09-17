<script>
    import barcodeImg from "$lib/assets/images/svgs/colorInvertedBarcode.svg";
    import tempImg1 from "$lib/assets/images/eventImages/6.jpg";

    export let eventCategory = "Cultural", firstEventTag = "celebrate&nbsp;creativity",
        secondEventTag = "Craft&nbsp;Comedy", firstEventSubTag = "Falak 23", secondEventSubTag = "Falak 23",
        firstEventImg = tempImg1, secondEventImg = tempImg1;
</script>
<div class="h-[200px] w-[325px] sm:w-[375px] bg-on-surface overflow-hidden flex flex-col justify-center items-center
            relative mx-auto mt-2">
    <div class="h-fit w-full text-surface brand-font text-9xl -mb-5 text-center uppercase">{eventCategory}</div>
    <div class="h-fit w-fit text-center text-surface brand-font tracking-wider text-3xl
                        -mr-[14rem]">
        Events
    </div>
    <div class="h-1/4 w-full flex justify-center overflow-hidden -mb-10">
        <img src="{barcodeImg}" alt="barcode" class="h-full w-[85%] object-cover">
    </div>
</div>


<div class="h-[85vh] min-h-fit w-[325px] sm:w-[375px] bg-surface relative flex flex-col mx-auto">
    <div class="h-full w-full flex flex-col justify-center items-center bg-surface
                relative">
        <div class="h-1/2 w-full flex flex-col justify-center items-center relative pt-10 bg-surface">
            <div class="h-fit w-fit absolute top-5 left-8 text-center regular-font text-[1.2rem] sm:text-xl text-on-surface">
                04/10/2024
            </div>
            <div class="h-fit w-[80%] text-on-surface text-left regular-font text-[1.6rem] sm:text-[2rem] ml-2 mb-2
                        capitalize">
                {@html firstEventTag}
            </div>
            <div class="w-[85%] h-auto overflow-hidden group relative">
                <div class="px-3 absolute bottom-4 left-0 z-[11] before:block before:bg-primary before:h-1 before:w-2/3">
                    <div class="px-3 py-1 bg-on-surface text-black regular-font">
                        {firstEventSubTag}
                    </div>
                </div>
                <div class="w-full h-full before:hidden group-hover:before:block before:absolute
                        before:left-0 before:top-0 before:w-full before:h-full before:z-10 before:bg-cover hover-svg">
                    <img src="{firstEventImg}" alt="temp" loading="lazy"
                         class="grayscale group-hover:grayscale-0 group-hover:scale-125 object-cover
                            transition-all duration-300 ease-in-out">
                </div>
            </div>
        </div>
        <div class="h-1/2 w-full flex flex-col justify-center items-center relative pt-10 bg-surface">
            <div class="h-fit w-fit absolute top-5 left-8 text-center regular-font text-[1.2rem] sm:text-xl text-on-surface">
                04/10/2024
            </div>
            <div class="h-fit w-[80%] text-on-surface text-left regular-font text-[1.6rem] sm:text-[2rem] ml-2 mb-2
                        capitalize">
                {@html secondEventTag}
            </div>
            <div class="w-[85%] h-auto overflow-hidden group relative">
                <div class="px-3 absolute bottom-4 left-0 z-[11] before:block before:bg-primary before:h-1 before:w-2/3">
                    <div class="px-3 py-1 bg-on-surface text-black regular-font">
                        {secondEventSubTag}
                    </div>
                </div>
                <div class="w-full h-full before:hidden group-hover:before:block before:absolute
                        before:left-0 before:top-0 before:w-full before:h-full before:z-10 before:bg-cover hover-svg">
                    <img src="{secondEventImg}" alt="temp" loading="lazy"
                         class="grayscale group-hover:grayscale-0 group-hover:scale-125 object-cover
                            transition-all duration-300 ease-in-out">
                </div>
            </div>
        </div>
    </div>
    <div class="absolute -bottom-8 w-full h-[2rem] bg-surface"></div>
    <div class="absolute right-0 top-0 h-[105%] w-[20px] z-10 bg-primary"></div>
    <div class="absolute left-0 top-0 h-[105%] w-[20px] z-10 bg-primary"></div>
</div>

<style>
    .hover-svg:before {
        background-image: url("../assets/images/svgs/hover.svg");
    }
</style>