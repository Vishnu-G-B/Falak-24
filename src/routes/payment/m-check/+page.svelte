<!-- +page.svelte -->
<script>
    import HelperAnimations from "$lib/common/HelperAnimations.svelte";
    import {enhance} from "$app/forms";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {gsap} from "gsap/dist/gsap";

    let helperAnimations;
    let updatePhoneNumberMessage = '';
    let newPhoneNumber;

    function appendToUrl(status, details) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('status', status);
        currentUrl.searchParams.set('details', details);
        history.pushState(null, '', currentUrl.toString());
    }

    onMount(() => {
        const unsubscribe = page.subscribe(($page) => {
            const url = $page.url.toString();
            if (url.includes('/payment/m-check?status=1&details=No%20Payments%20Found')) {
                gsap.to("#updatePhoneNumberDiv", {
                    top: "50%",
                    translateY: "-50%",
                    duration: 0.8,
                    ease: "power4.out",
                    onComplete: () => {
                        history.replaceState(null, '', $page.url.pathname);
                    }
                });

            }
        })
        return () => {
            unsubscribe();
        };
    })

    export let data;
    const handleUpdatePhoneNumber = async ({formData, cancel}) => {
        if (newPhoneNumber === data.phoneNumber) {
            updatePhoneNumberMessage = 'You have entered the same phone number';
            cancel();
            helperAnimations.stopLoadingPhase('update-number');
            setTimeout(() => {
                updatePhoneNumberMessage = ""
            }, 5000);
        }
        formData.set("newPhoneNumber", newPhoneNumber);
        // console.log("hello?")
        // const form = event.target;
        // console.log("event: ", event);
        // console.log("form: ", form)
        // const formData = new FormData(form);
        // const response = await fetch(form.action, {
        //     method: 'POST',
        //     body: formData
        // });
        // const result = await response.json();
        // updatePhoneNumberMessage = result.message;
        // if (result.success) {
        //     data.phoneNumber = formData.get('newPhoneNumber');
        // }
    }

    $: updatePhoneNumberMessage
</script>

<HelperAnimations bind:this={helperAnimations}/>
<div class="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
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
            <form action="/payment/m-check?/checkPaymentAndGeneratePass" method="post" use:enhance={(event) => {
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
    <div class="h-screen w-full flex flex-col items-center justify-center backdrop-blur-2xl
            absolute top-full left-1/2 transform -translate-x-1/2 z-10"
         id="updatePhoneNumberDiv">
        <div class="h-[450px] mt-14 bg-surface flex flex-col items-center justify-between pb-6 w-[320px] sm:w-[375px] relative">
            <div class="flex flex-row justify-between items-center text-on-surface flex-wrap">
                <div class="flex flex-row justify-between items-center">
                    <p class="text-5xl brand-font text-on-surface mt-[20px] ml-[24px] mr-[24px] uppercase">
                        MADE A PAYMENT
                        BUT DID NOT GET THE PASS </p>
                </div>
                <div class="flex flex-col justify-between items-center">
                    <p class="text-lg regular-font text-on-surface mt-2 ml-[20px] mr-[20px] text-left">
                        Please ensure the following mobile matches
                        the one on the receipt you received. If it DOES NOT match edit it to match.<br/>
                    </p>
                    <p class="text-lg regular-font mt-2 mb-2 ml-[20px] mr-[20px] text-center text-[#26F7FD]">
                        {data.phoneNumber}
                    </p>
                </div>
            </div>
            <div class="h-fit w-full flex flex-col gap-2 px-10">
                <form action="/payment/m-check?/updatePhoneNumber" method="post" use:enhance={async (event) => {
                helperAnimations.animateLoadingPhase('update-number');
                await handleUpdatePhoneNumber(event);
                return async ({result}) => {
                    helperAnimations.stopLoadingPhase('update-number');
                    console.log(result);
                    if (result.data.success === true){
                        data.phoneNumber = newPhoneNumber;
                        updatePhoneNumberMessage = result.data.message;
                        setTimeout(() => {updatePhoneNumberMessage = ''},5000);
                        gsap.to("#updatePhoneNumberDiv",{
                            top: "100%",
                            translateY: 0,
                            duration: 0.8,
                            ease: "power4.inOut",
                            onComplete: () => {
                                let currentUrl = window.location.href;
                                currentUrl += '?status=2&details=Try Generating Your Ticket Again';
                                history.pushState(null, '', currentUrl);
                            }
                        })
                        setTimeout(() => {history.replaceState(null, '', $page.url.pathname)},5000);
                    } else {
                        if(result.data?.code === "scamPt"){
                            console.log("Potentially someone trying to be clever");
                            await goto(`/my-tickets?status=1&details=${result.data.message}`);
                        }
                        updatePhoneNumberMessage = result.data.message;
                        setTimeout(() => {updatePhoneNumberMessage = ''},5000);
                    }
                }
            }}>
                    <div class="form__group field">
                        <input type="text" name="newPhoneNumber" class="form__field regular-font"
                               placeholder="Correct Phone Number" required bind:value={newPhoneNumber}>
                        <label for="newPhoneNumber" class="form__label regular-font">Correct Phone Number</label>
                        <p class="text-sm text-error regular-font">{updatePhoneNumberMessage}</p>
                    </div>
                    <button class="w-full h-fit bg-primary text-on-surface text-3xl py-1 brand-font mt-4 pt-2 uppercase relative"
                            type="submit">
                        <p class="update-number-button-inner-text">
                            Update Phone Number
                        </p>
                        <div class="h-full w-full flex-col items-center justify-center update-number-loader-refresh hidden scale-0 absolute top-0 left-0">
                            <div class="rounded-full bg-on-surface h-8 w-8 update-number-loader-refresh-dot"></div>
                        </div>
                    </button>
                </form>
            </div>
            <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
            <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
            <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
            <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
        </div>
    </div>
</div>


<style>
    .form__group {
        position: relative;
        padding: 20px 0 0;
        width: 100%;
    }

    .form__field {
        font-family: inherit;
        width: 100%;
        border: none;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 17px;
        color: #fff;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
    }

    .form__field::placeholder {
        color: transparent;
    }

    .form__field:placeholder-shown ~ .form__label {
        font-size: 17px;
        cursor: text;
        top: 20px;
    }

    .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 17px;
        color: #9b9b9b;
        pointer-events: none;
    }

    .form__field:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(to right, #0156cf, #F5FFFA);
        border-image-slice: 1;
    }

    .form__field:focus ~ .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 17px;
        color: #0156cf;
        font-weight: 700;
    }

    /* reset input */
    .form__field:required, .form__field:invalid {
        box-shadow: none;
    }
</style>