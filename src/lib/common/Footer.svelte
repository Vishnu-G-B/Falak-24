<script>
    import barcodeImg from "$lib/assets/images/svgs/updated_2.svg";
    import horizontalBarcode from "$lib/assets/images/svgs/footerBarcode.svg";
    import instagram from "$lib/assets/images/icons/instagram.svg";
    import twitter from "$lib/assets/images/icons/twitterx.svg";
    import linkedin from "$lib/assets/images/icons/linkedin.svg";
    import meta from "$lib/assets/images/icons/meta.svg";
    import {goto} from "$app/navigation";
    import {signIn} from "@auth/sveltekit/client";
    import {page} from "$app/stores";
    import beardoLogo from "$lib/assets/images/logos/berado_logo.webp";
    import spykartLogo from "$lib/assets/images/logos/Spykar-Logo.webp";
    import Findoc from "$lib/assets/images/logos/Findoc_Logo.webp";
    import ccc from "$lib/assets/images/logos/CancelCulture_logo.webp";
</script>

<div class="h-[980px] w-[325px] sm:w-[375px] bg-primary relative mx-auto mt-1">
    <div class="h-fit w-full text-on-surface brand-font text-[4.3rem] sm:text-[5rem] text-center uppercase tracking-wide">
        Falak&nbsp;Festival
    </div>
    <div class="h-[55px] w-[89%] mx-auto -mt-6 sm:-mt-8">
        <img src="{barcodeImg}" alt="barcode" class="w-full h-full object-cover" loading="lazy">
    </div>
    <div class="h-fit w-full text-on-surface brand-font text-[4rem] sm:text-[4.5rem] text-center uppercase tracking-wide">
        Our Sponsors
    </div>
    <div class="w-full h-fit flex justify-center items-center px-5 mb-8 flex-col -mt-6">
        <!--        <div class="brand-font text-[2rem] text-on-surface">Style Partner</div>-->
        <img src="{beardoLogo}" alt="logo 1" class="w-full h-full object-cover bg-on-surface p-2 " loading="lazy">
    </div>
    <div class="w-full h-fit flex justify-center items-center px-5 mb-8 flex-col -mt-4">
        <!--        <div class="brand-font text-[2rem] text-on-surface">Fashion Partner</div>-->
        <img src="{spykartLogo}" alt="logo 1" class="w-full h-full object-cover bg-on-surface" loading="lazy">
    </div>
    <div class="w-full h-fit flex justify-center items-center px-5 mb-8 flex-col -mt-4">
        <!--        <div class="brand-font text-[2rem] text-on-surface">Trading Partner</div>-->
        <img src="{Findoc}" alt="logo 1" class="w-full h-full object-cover p-2" loading="lazy">
    </div>
    <div class="w-full h-fit flex justify-center items-center px-5 mb-8 flex-col -mt-4">
        <!--        <div class="brand-font text-[2rem] text-on-surface">Clothing Partner</div>-->
        <img src="{ccc}" alt="logo 1" class="w-full h-[134px] object-cover p-2 bg-surface" loading="lazy">
    </div>
    <button class="h-fit w-[90%] mx-auto flex justify-between items-center border-2 border-black bg-surface text-on-surface
                    hover:bg-on-surface hover:text-black py-2 px-3 group mt-4" on:click={async () => {
                        if($page.data.session) {
                            goto('/tickets');
                        } else {
                            await signIn('google', {callbackUrl: `${$page.url.pathname}?status=2&details=Signed%20In`})
                        }
                    }}>
        <span class="regular-font ">Login And Participate Now</span>
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
    <div class="w-full h-fit flex justify-center items-center mt-3">
        <div class="h-fit w-3/4 flex justify-center items-center gap-2">
            <button class="h-[48px] w-[48px] bg-surface p-1.5"
                    on:click={() => {window.open("https://www.instagram.com/falak.mitblr?igsh=MTZlZjZ2bzRkemlzaA==","_blank")}}>
                <img src="{instagram}" alt="instagram logo" class="w-full h-full object-cover">
            </button>
            <button class="h-[48px] w-[48px] bg-surface p-1.5"
                    on:click={() => {window.open("https://www.linkedin.com/company/falakmitb/","_blank")}}>
                <img src="{linkedin}" alt="linkedin logo" class="w-full h-full object-cover"
                >
            </button>
        </div>
    </div>
    <div class="h-[400px] w-[90%] absolute -bottom-[21rem] left-1/2 transform -translate-x-1/2 z-10 overflow-visible">
        <img src="{horizontalBarcode}" alt="footer barcode" class="w-full h-full z-10 object-contain">
    </div>
</div>
<div class="bg-transparent h-[350px] w-[325px] sm:w-[375px] relative mx-auto z-[1]">

</div>