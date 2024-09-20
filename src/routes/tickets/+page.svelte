<script>
    import Ticket from "$lib/common/Ticket.svelte";
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {page} from "$app/stores";
    import {enhance} from "$app/forms";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
    import {goto} from "$app/navigation";
    import HelperAnimations from "$lib/common/HelperAnimations.svelte";

    export let form;
    export let data;

    let showLearnerId;
    let isMahe;
    let userName;
    let userLearnerId;
    let userPhoneNumber;
    let helperAnimations;

    let errors = {userNameError: '', userPhoneNumberError: '', userLearnerIdError: '', isMaheError: ''};

    let culturalPasses = [
        {
            name: 'FLAGSHIP',
            price: 699,
            points: ['Only for MAHE Students', 'Includes proshow + all the events for MAHE students'],
        },
        {
            name: 'SOLO DANCE',
            price: 236,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'GROUP DANCE',
            price: 2360,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'SOLO SINGING',
            price: 177,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'FASHION SHOW',
            price: 708,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'BATTLE BANDS',
            price: 2950,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'DRAMA',
            price: 1298,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'MONO ACTING',
            price: 177,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'PHOTOGRAPHY COMPETITION',
            price: 147.50,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'FILM MAKING',
            price: 295,
            points: ['Only for NON-MAHE Students'],
        },
        {
            name: 'AD DESIGN',
            price: 590,
            points: ['Only for NON-MAHE Students'],
        }
    ];

    let sportsPasses = [
        {
            name: 'FOOTBALL',
            price: 7000,
            points: ['For both MAHE and NON-MAHE Students', 'Only the team leader needs to buy a pass']
        },
        {
            name: 'MENS BASKETBALL',
            price: 5000,
            points: ['For both MAHE and NON-MAHE Students', 'Only the team leader needs to buy a pass']
        },
        {
            name: 'WOMENS BASKETBALL',
            price: 3000,
            points: ['For both MAHE and NON-MAHE Students', 'Only the team leader needs to buy a pass']
        },
        {
            name: 'CRICKET',
            price: 7000,
            points: ['For both MAHE and NON-MAHE Students', 'Only the team leader needs to buy a pass']
        },
        {
            name: 'VOLLEYBALL',
            price: 5000,
            points: ['For both MAHE and NON-MAHE Students', 'Only the team leader needs to buy a pass']
        },
        {
            name: 'ATHLETICS',
            price: 300,
            points: ['For both MAHE and NON-MAHE Students']
        },
        {
            name: 'MENS BADMINTON',
            price: 500,
            points: ['For both MAHE and NON-MAHE Students']
        },
        {
            name: 'WOMENS BADMINTON',
            price: 300,
            points: ['For both MAHE and NON-MAHE Students']
        },
        {
            name: 'MIXED BADMINTON',
            price: 800,
            points: ['For both MAHE and NON-MAHE Students']
        },
        {
            name: 'TABLE TENNIS',
            price: 500,
            points: ['For both MAHE and NON-MAHE Students']
        },
        {
            name: 'CHESS',
            price: 500,
            points: ['For both MAHE and NON-MAHE Students']
        }
    ];

    let esportsPasses = [
        {
            name: 'FLAGSHIP',
            price: 99,
            points: ['For both MAHE and NON-MAHE Students', 'Includes all esports events', 'For team events each team member requires a pass'],
        }
    ];

    let currentIndex = {
        'cultural': 0,
        'sports': 0,
        'esports': 0,
    };
    let carouselStatus = {
        'cultural': false,
        'sports': false,
        'esports': false,
    };
    let animationPlaying = false;

    onMount(() => {
        sportsPasses.length;
        sportsPasses[0];
        let register = $page.url.searchParams.get('register');
        if (register === 'true') {
            showDataForm();
        }
        gsap.registerPlugin(TextPlugin);

        let onLoadTimeline = gsap.timeline();
        // onLoadTimeline.pause();
        onLoadTimeline.to('.main-page-heading', {
            translateY: 0,
            translateX: 0,
            rotate: 0,
            stagger: 0.1,
            ease: 'power4.out',
        });
        onLoadTimeline.to('.cultural-pass-text-main', {
            text: 'Cultural',
            delay: '0.5'
        }, '<');
        onLoadTimeline.to('.sports-pass-text-main', {
            text: 'Sports',
        }, '<');
        onLoadTimeline.to('.esports-pass-text-main', {
            text: 'E-Sports',
        }, '<');
        onLoadTimeline.to('.cultural-ticket-div', {
            translateY: 0,
            rotate: 0,
            delay: 1.25,
            ease: 'sine',
        }, '<');
        for (let i = 0; i <= culturalPasses.length; i++) {
            onLoadTimeline.to(`.cultural-carousel-${i + 1}`, {
                translateX: `${12 * i}%`,
                translateZ: `${-8 * i}em`,
            }, '<');
        }
        onLoadTimeline.to('.cultural-controller-left', {
            translateX: 0,
        }, "<");
        onLoadTimeline.to('.cultural-controller-right', {
            translateX: 0,
        }, "<");
    })

    function getTranslatePercentage(element) {
        const transformValue = window.getComputedStyle(element[0]).transform;
        const w = window.getComputedStyle(element[0]).width;
        const h = window.getComputedStyle(element[0]).height;
        var matrix = new WebKitCSSMatrix(transformValue);

        const style = window.getComputedStyle(element[0]);
        const rotationMatrix = style.transform || style.webkitTransform || style.mozTransform;

        let angle;
        if (rotationMatrix === 'none') {
            angle = 0;
        } else {
            const values = rotationMatrix.split('(')[1].split(')')[0].split(',');
            const a = values[0];
            const b = values[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }

        return {
            x: matrix.m41 / parseInt(w) * 100,
            y: matrix.m42 / parseInt(h) * 100,
            rotation: angle,
        };
    }

    function slideRight(prefix, toCheck) {
        if (!animationPlaying && carouselStatus[prefix]) {
            if (currentIndex[prefix] !== toCheck.length) {
                let slideRightTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= toCheck.length; i++) {
                    let translateValues = getTranslatePercentage(document.getElementsByClassName(`${prefix}-carousel-${i + 1}`));
                    console.log(translateValues);
                    slideRightTimeline.to(`.${prefix}-carousel-${i + 1}`, {
                        translateX: `${translateValues.x + 80}%`,
                        translateY: `${translateValues.y + 20}%`,
                        rotate: `${translateValues.rotation + 20}deg`,
                        ease: 'sine',
                    }, '<');
                }
                currentIndex[prefix]++;
            }
        }
    }

    function slideLeft(prefix, toCheck) {
        if (!animationPlaying) {
            if (currentIndex[prefix] !== 0) {
                let slideLeftTimeline = gsap.timeline({
                    onComplete: () => {
                        animationPlaying = false;
                    }
                });
                animationPlaying = true;
                for (let i = 0; i <= toCheck.length; i++) {
                    let translateValues = getTranslatePercentage(document.getElementsByClassName(`${prefix}-carousel-${i + 1}`));
                    console.log(translateValues);
                    slideLeftTimeline.to(`.${prefix}-carousel-${i + 1}`, {
                        translateX: `${translateValues.x - 80}%`,
                        translateY: `${translateValues.y - 20}%`,
                        rotate: `${translateValues.rotation - 20}deg`,
                        ease: 'sine',
                    }, '<');
                }
                currentIndex[prefix]--;
            }
        }
    }

    export function openTickets(prefix, toCheck) {
        animationPlaying = true;
        carouselStatus[prefix] = true;
        let ticketTimeline = gsap.timeline({
            onComplete: () => {
                animationPlaying = false;
            }
        });
        for (let i = 2; i <= toCheck.length + 1; i++) {
            ticketTimeline.to(`.${prefix}-carousel-${i}`, {
                translateX: `${-80 * (i - 1)}%`,
                translateY: `${-20 * (i - 1)}%`,
                translateZ: 0,
                rotate: `${-20 * (i - 1)}deg`,
                ease: 'sine',
            }, '<+=0.1');
        }
    }

    function attemptPayment({formData}) {
        formData.set('userName', userName);
        formData.set('userPhoneNumber', userPhoneNumber);
        formData.set('userLearnerId', userLearnerId);
        formData.set("isMahe", isMahe);
    }

    function checkUserName() {
        clearFormErrorName();
        if (userName.length >= 2 && userName.match(/^[A-Za-z\s]*$/)) {
            errors.userNameError = '';
        } else {
            errors.userNameError = 'Please enter a valid name';
        }
    }

    function checkMobileNumber() {
        clearFormErrorMobile();
        if (userPhoneNumber?.toString().length === 10) {
            errors.userPhoneNumberError = '';
        } else {
            errors.userPhoneNumberError = 'Please enter a valid mobile number';
        }
    }

    function checkLearnerId() {
        if (userLearnerId.includes('manipal.edu')) {
            errors.userLearnerIdError = '';
        } else {
            errors.userLearnerIdError = 'Please enter a valid learner id';
        }
    }

    function checkMahe() {
        showLearnerId = isMahe === 'true';
    }

    function clearFormErrorName() {
        if (form) {
            form.userNameError = '';
        }
    }

    function clearFormErrorMobile() {
        if (form) {
            form.userPhoneNumberError = '';
        }
    }

    function hideForm() {
        helperAnimations.stopLoadingPhase('ticket-buy');
        let dataTimeline = gsap.timeline();
        dataTimeline.to('.data-form', {
            top: "100%",
            duration: 0.5,
            ease: "power4.out",
        });
        dataTimeline.to('.data-form', {
            display: 'none',
        });
    }

    function showDataForm() {
        if (data.registered) {
            goto('/payment/disclaimer');
        } else {
            let dataTimeline = gsap.timeline();
            dataTimeline.to('.data-form', {
                display: 'flex',
            });
            dataTimeline.to('.data-form', {
                top: 0,
                duration: 0.5,
                ease: "power4.out",
            });
        }
    }
</script>

<svelte:head>
    <title>TICKETS</title>
</svelte:head>
<HelperAnimations bind:this={helperAnimations}/>

<div class="min-h-screen w-full flex flex-col flex-shrink-0 items-center justify-center gap-2 relative overflow-hidden">
    <div class="h-screen w-full fixed top-[100%] backdrop-blur-2xl hidden data-form items-center justify-center z-[3] px-4 pt-4">
        <button class="h-screen w-full bg-transparent absolute top-0" on:click={hideForm}></button>
        <div class="h-fit w-fit relative border-4 border-primary bg-surface flex flex-col items-start justify-center z-[6] px-5 pt-5 gap-5">
            <div class="h-fit w-fit flex flex-col gap-1">
                <p class="brand-font text-primary text-[40px] leading-8 tracking-wide">PLEASE ENTER YOUR DETAILS!</p>
                <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Your
                    details will be used for event registeration</p>
                <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left">Make
                    sure your details are correct,
                    as they will be used to verify your pass purchase!</p>
            </div>
            <div class="h-fit w-full flex flex-col gap-2">
                <form action="?/registerUserAndProceed" method="post" use:enhance={(event)=>{
                    helperAnimations.animateLoadingPhase('user-register');
                    attemptPayment(event)
                    return async ({result}) => {
                        form = result.data;
                        console.log(result.data);
                        if(result.type === 'success') {
                            await goto(result.data.redirect);
                        }
                        helperAnimations.stopLoadingPhase('user-register');
                    }
                }} class="h-fit w-full">
                    <div class="form__group field">
                        <input type="input" class="form__field regular-font" placeholder="Full Name" required=""
                               bind:value={userName} on:input={checkUserName}>
                        <label for="name" class="form__label regular-font">Full Name</label>
                        {#if form?.userNameError}
                            <p class="text-sm text-error regular-font from-form">{form.userNameError}</p>
                        {/if}
                        <p class="text-sm text-error regular-font">{errors.userNameError}</p>
                    </div>
                    <div class="form__group field">
                        <input type="number" class="form__field regular-font" placeholder="Phone Number" required=""
                               bind:value={userPhoneNumber} on:input={checkMobileNumber}>
                        <label for="name" class="form__label regular-font">Phone Number</label>
                        {#if form?.userPhoneNumberError}
                            <p class="text-sm text-error regular-font">{form.userPhoneNumberError}</p>
                        {/if}
                        <p class="text-sm text-error regular-font">{errors.userPhoneNumberError}</p>
                    </div>
                    <div class="form__group field mt-2 mb-2">
                        <select class="form__field regular-font bg-surface text-on-surface border-2 border-on-surface"
                                type="input"
                                required=""
                                bind:value={isMahe} on:change={checkMahe}>
                            <option value="-1" class="bg-surface text-on-surface" selected disabled>Are You A MAHE
                                Student?
                            </option>
                            <option value="false" class="bg-surface text-on-surface">NO</option>
                            <option value="true" class="bg-surface text-on-surface">YES</option>
                        </select>
                        <label for="name" class="form__label regular-font">MAHE Student?</label>
                        {#if form?.isMaheError}
                            <p class="text-sm text-error regular-font">{form.isMaheError}</p>
                        {/if}
                        <p class="text-sm text-error regular-font">{errors.isMaheError}</p>
                    </div>
                    {#if showLearnerId}
                        <div class="form__group field">
                            <input type="email" class="form__field regular-font" placeholder="Learner Email Id"
                                   required=""
                                   bind:value={userLearnerId} on:input={checkLearnerId}>
                            <label for="name" class="form__label regular-font">Learner Email Id</label>
                            {#if form?.userLearnerIdError}
                                <p class="text-sm text-error regular-font">{form.userLearnerIdError}</p>
                            {/if}
                            <p class="text-sm text-error regular-font">{errors.userLearnerIdError}</p>
                        </div>
                    {/if}
                    {#if isMahe !== "-1" && isMahe !== undefined}
                        <button class="w-full h-fit bg-primary text-on-surface text-3xl py-1 brand-font mt-4 pt-2 uppercase relative"
                                type="submit">
                            <p class="user-register-button-inner-text">
                                Submit
                            </p>
                            <div class="h-full w-full flex-col items-center justify-center user-register-loader-refresh hidden scale-0 absolute top-0 left-0">
                                <div class="rounded-full bg-on-surface h-8 w-8 user-register-loader-refresh-dot"></div>
                            </div>
                        </button>
                        <p class="text-lg regular-font text-primary/70 text-center">Click Outside To Close</p>
                    {/if}
                </form>
            </div>
        </div>
    </div>
    <div class="h-screen w-full fixed top-0">
        <AICanvasClaude2/>
    </div>
    <div class="brand-font text-[9rem] sm:text-[40vh] xl:text-[45vh] text-on-surface overflow-hidden h-fit w-fit flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div class="h-fit w-full flex flex-row items-center justify-between">
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font cultural-pass-text-main"></p>
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font sports-pass-text-main"></p>
        </div>
        <div class="h-fit w-fit overflow-hidden flex flex-row items-center justify-center leading-[1]">
            <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">T</span><span
                class="main-page-heading -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">I</span><span
                class="main-page-heading -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">C</span><span
                class="main-page-heading -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">K</span><span
                class="main-page-heading -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">E</span><span
                class="main-page-heading -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">T</span><span
                class="main-page-heading -translate-y-[1400px] -translate-x-[80%] -rotate-[45deg]">S</span>
        </div>
        <div class="h-fit w-full flex flex-row items-center justify-center -mt-5">
            <p class="text-xl lg:text-2xl xl:text-3xl regular-font esports-pass-text-main"></p>
        </div>
    </div>
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets"
         style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl -translate-x-[100%] cultural-controller-left flex items-center justify-center"
                    on:click={() => {slideLeft('cultural', culturalPasses)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                    </g>
                </svg>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl translate-x-[100%] cultural-controller-right flex items-center justify-center"
                    on:click={() => {slideRight('cultural', culturalPasses)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                    </g>
                </svg>
            </button>
        </div>
        <!--        <div class="h-fit w-fit main-page-ticket absolute origin-bottom-left">-->
        <!--            <Ticket mainTitle="TICKETS" isPassHeading="{false}" showBuyButton="{false}"/>-->
        <!--        </div>-->
        <div class="h-fit w-fit cultural-heading-ticket cultural-ticket-div absolute cultural-carousel-1 origin-bottom-left -translate-y-[100%]"
             style="z-index: {culturalPasses.length + 2};">
            <Ticket mainTitle="CULTURAL" isPassHeading="{false}" showBuyButton="{false}" description="{true}"
                    on:showMoreClick={() => {openTickets('cultural', culturalPasses)}}/>
        </div>
        {#each culturalPasses as culturalTicket, index}
            <div class="h-fit w-fit cultural-content-ticket cultural-ticket-div absolute cultural-carousel-{index+2} origin-bottom-left -translate-y-[100%]"
                 style="z-index: {culturalPasses.length - index+1}">
                <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                <Ticket mainTitle="{culturalTicket.name}" isPassHeading="{false}" showBuyButton="{true}"
                        price="{culturalTicket.price}" includesArray="{culturalTicket.points}" description="{false}"
                        on:buyClicked={() => {showDataForm()}}/>
            </div>
        {/each}
    </div>
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets"
         style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl -translate-x-[100%] cultural-controller-left flex items-center justify-center"
                    on:click={() => {slideLeft('sports', sportsPasses)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                    </g>
                </svg>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl translate-x-[100%] cultural-controller-right flex items-center justify-center"
                    on:click={() => {slideRight('sports', sportsPasses)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                    </g>
                </svg>
            </button>
        </div>
        <div class="h-fit w-fit sports-heading-ticket sports-ticket-div absolute sports-carousel-1 origin-bottom-left"
             style="z-index: {sportsPasses.length + 2};">
            <Ticket mainTitle="SPORTS" isPassHeading="{false}" showBuyButton="{false}" description="{true}"
                    on:showMoreClick={() => {openTickets('sports', sportsPasses)}}/>
        </div>
        {#each sportsPasses as culturalTicket, index}
            <div class="h-fit w-fit sports-content-ticket sports-ticket-div absolute sports-carousel-{index+2} origin-bottom-left"
                 style="transform: translate3d({12 * (index+1)}%, 0, {-8 * (index+1)}em); z-index: {sportsPasses.length - index+1}">
        <!--        &lt;!&ndash;                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">&ndash;&gt;-->
                <Ticket mainTitle="{culturalTicket.name}" isPassHeading="{false}" showBuyButton="{true}"
                        price="{culturalTicket.price}" includesArray="{culturalTicket.points}" description="{false}"
                        on:buyClicked={() => {showDataForm()}}/>
            </div>
        {/each}
    </div>
    <div class="h-[110vh] w-full flex flex-col items-center justify-center relative cultural-tickets"
         style="perspective: 800px">
        <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl -translate-x-[100%] cultural-controller-left flex items-center justify-center"
                    on:click={() => {slideLeft('esports', esportsPasses)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                    </g>
                </svg>
            </button>
            <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl translate-x-[100%] cultural-controller-right flex items-center justify-center"
                    on:click={() => {slideRight('esports', esportsPasses)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g>
                        <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                        <polygon
                                points="11.293 8.707 13.586 11 8 11 8 13 13.586 13 11.293 15.293 12.707 16.707 17.414 12 12.707 7.293 11.293 8.707"/>
                    </g>
                </svg>
            </button>
        </div>
        <div class="h-fit w-fit sports-heading-ticket sports-ticket-div absolute esports-carousel-1 origin-bottom-left "
             style="z-index: {esportsPasses.length + 2};">
            <Ticket mainTitle="E-SPORTS" isPassHeading="{false}" showBuyButton="{false}" description="{true}"
                    on:showMoreClick={() => {openTickets('esports', esportsPasses)}}/>
        </div>
        {#each esportsPasses as culturalTicket, index}
            <div class="h-fit w-fit esports-content-ticket esports-ticket-div absolute esports-carousel-{index+2} origin-bottom-left"
                 style="transform: translate3d({12 * (index+1)}%, 0, {-8 * (index+1)}em); z-index: {esportsPasses.length - index+1}">
                <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                <Ticket mainTitle="{culturalTicket.name}" isPassHeading="{false}" showBuyButton="{true}"
                        price="{culturalTicket.price}" includesArray="{culturalTicket.points}" description="{false}"
                        on:buyClicked={() => {showDataForm()}}/>
            </div>
        {/each}
    </div>
</div>
<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

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