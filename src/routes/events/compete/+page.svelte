<script>
    import {onMount} from "svelte";
    import {gsap} from "gsap/dist/gsap";
    import {TextPlugin} from "gsap/dist/TextPlugin";
    import {enhance} from "$app/forms";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import Ticket from "$lib/common/Ticket.svelte";
    import {page} from "$app/stores";

    let isSelectedTeamEvent;
    let selectedEvent;
    let teamName;
    let joinCode;
    let errors = {teamNameError: '', selectedEventError: '', joinCodeError: ''}
    let animationPlaying = false;

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

    onMount(() => {
        gsap.registerPlugin(TextPlugin);

        let onLoadTimeline = gsap.timeline();
        onLoadTimeline.to('.main-page-heading', {
            translateY: 0,
            translateX: 0,
            rotate: 0,
            stagger: 0.1,
            ease: 'power4.out',
        });
        onLoadTimeline.to('.cultural-ticket-div', {
            translateY: 0,
            rotate: 0,
            delay: 1.25,
            ease: 'sine',
        }, '<');
        for (let i = 0; i <= data.registrationData.ownerOrSolo.length; i++) {
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

    function checkTeamName() {
        if (!teamName) {
            errors.teamNameError = 'Please Enter a Valid Team Name';
        } else {
            errors.teamNameError = '';
        }
    }

    function setTeamEvent() {
        if (selectedEvent) {
            isSelectedTeamEvent = selectedEvent.attributes.isTeamEvent
        }
    }

    function hideForm(prefix) {
        let dataTimeline = gsap.timeline();
        dataTimeline.to(`.${prefix}-data-form`, {
            top: "100%",
            duration: 0.5,
            ease: "power4.out",
        });
        dataTimeline.to(`.${prefix}-data-form`, {
            display: 'none',
        });
    }

    function showDataForm(prefix) {
        let dataTimeline = gsap.timeline();
        dataTimeline.to(`.${prefix}-data-form`, {
            display: 'flex',
        });
        dataTimeline.to(`.${prefix}-data-form`, {
            top: 0,
            duration: 0.5,
            ease: "power4.out",
        });
    }

    function attemptEventRegistration({formData, cancel}) {
        checkTeamName();
        if (selectedEvent && selectedEvent !== '-1') {
            if (isSelectedTeamEvent) {
                if (errors.teamNameError) {
                    cancel();
                } else {
                    formData.set('teamName', teamName);
                }
            }
            formData.set('eventPriority', selectedEvent.attributes.EventPriority);
        } else {
            if (!selectedEvent || selectedEvent === '-1') {
                console.log(errors);
                errors.selectedEventError = 'Select a valid event';
            }
            cancel();
        }
    }

    function attemptTeamJoining({formData, cancel}) {
        checkJoinCode();
        if (errors.joinCodeError) {
            cancel();
        } else {
            formData.set('joinCode', joinCode);
        }
    }

    function checkJoinCode() {
        if (joinCode && joinCode.length === 6) {
            errors.joinCodeError = '';
        } else {
            errors.joinCodeError = 'Please Enter A Valid Join Code';
        }
    }

    function updateUrlStatus(state) {
        if (browser) {
            const urlParams = new URLSearchParams(window.location.search);
            window.history.pushState({}, document.title, window.location.pathname + state);
            setTimeout(() => {
                if (urlParams.has('details')) {
                    window.history.pushState({}, document.title, window.location.pathname);
                }
            }, 2000);
        }
    }

    export let data;
    console.log(data.registrationData.ownerOrSolo);
</script>
<div class="h-fit w-full overflow-hidden">
    <div class="h-screen w-full fixed top-[100%] backdrop-blur-2xl hidden join-code-data-form items-center justify-center z-[3] px-4 pt-4">
        <button class="h-screen w-full bg-transparent absolute top-0" on:click={() => {hideForm('join-code')}}></button>
        <div class="h-fit w-fit relative border-4 border-primary bg-surface flex flex-col items-start justify-center z-[6] px-5 pt-5 gap-5">
            <div class="h-fit w-fit flex flex-col gap-1">
                <p class="brand-font text-primary text-[40px] leading-8 tracking-wide">JOIN A TEAM</p>
                <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Enter the join
                    code for the team you wanna join</p>
                <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Fill all of
                    the
                    fields and click on submit to register!</p>
            </div>
            <div class="h-fit w-full flex flex-col gap-2">
                <form action="?/joinTeam" method="post" use:enhance={async (event) => {
                attemptTeamJoining(event);
                return async ({result}) => {
                    console.log(result);
                    if (result.type === 'redirect') {
                        await goto(result.location);
                    } else if (result.type === 'success') {
                        updateUrlStatus(result.data.state);
                    }
                }
            }}>
                    <div class="form__group field">
                        <input type="text" class="form__field regular-font" placeholder="Join Code" required=""
                               bind:value={joinCode} on:input={checkJoinCode}>
                        <label for="name" class="form__label regular-font">Join Code</label>
                        <p class="text-sm text-error regular-font">{errors.joinCodeError}</p>
                    </div>
                    {#if joinCode && joinCode.length === 6}
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
    <div class="h-screen w-full fixed top-[100%] backdrop-blur-2xl hidden register-data-form items-center justify-center z-[3] px-4 pt-4">
        <button class="h-screen w-full bg-transparent absolute top-0" on:click={() => {hideForm('register')}}></button>
        <div class="h-fit w-fit relative border-4 border-primary bg-surface flex flex-col items-start justify-center z-[6] px-5 pt-5 gap-5">
            <div class="h-fit w-fit flex flex-col gap-1">
                <p class="brand-font text-primary text-[40px] leading-8 tracking-wide">EVENT REGISTRATION</p>
                <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Select an
                    event to
                    register</p>
                <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Fill all of
                    the
                    fields and click on submit to register!</p>
            </div>
            <div class="h-fit w-full flex flex-col gap-2">
                <form action="?/attemptEventRegistration" method="post" use:enhance={async (event) => {
                attemptEventRegistration(event);
                return async ({result}) => {
                    console.log(result);
                    if (result.type === 'redirect') {
                        await goto(result.location);
                    } else if (result.type === 'success') {
                        updateUrlStatus(result.data.state);
                    }
                }
            }}>
                    <div class="form__group field mt-2 mb-2">
                        <select class="form__field regular-font bg-surface text-on-surface border-2 border-on-surface"
                                type="input"
                                required=""
                                bind:value={selectedEvent} on:change={setTeamEvent}>
                            <option value="-1" class="bg-surface text-on-surface" selected disabled>
                                Select an event to register
                            </option>
                            {#each data.eventList as event}
                                <option value="{event}"
                                        class="bg-surface text-on-surface">{event.attributes.EventName}</option>
                            {/each}
                        </select>
                        <label for="name" class="form__label regular-font">Select an Event</label>
                        <p class="text-sm text-error regular-font">{errors.selectedEventError}</p>
                    </div>
                    {#if isSelectedTeamEvent}
                        <div class="form__group field">
                            <input type="text" class="form__field regular-font" placeholder="Team Name" required=""
                                   bind:value={teamName} on:input={checkTeamName}>
                            <label for="name" class="form__label regular-font">Team Name</label>
                            <p class="text-sm text-error regular-font">{errors.teamNameError}</p>
                        </div>
                    {/if}
                    {#if selectedEvent}
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
    <div class="h-[70vh] w-full flex flex-col items-center justify-center bg-surface">
        <div class="w-fit brand-font text-[9rem] md:text-[15rem] sm:text-[12rem] xl:text-[45vh] text-on-surface overflow-hidden h-fit sm:w-fit text-center justify-center items-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class="h-fit w-fit overflow-hidden flex flex-row items-center justify-center leading-[1] page-heading-parent">
                <span class="main-page-heading -translate-y-[200px] -translate-x-[80%] -rotate-[45deg]">C</span><span
                    class="main-page-heading -translate-y-[400px] -translate-x-[80%] -rotate-[45deg]">O</span><span
                    class="main-page-heading -translate-y-[600px] -translate-x-[80%] -rotate-[45deg]">M</span><span
                    class="main-page-heading -translate-y-[800px] -translate-x-[80%] -rotate-[45deg]">P</span><span
                    class="main-page-heading -translate-y-[1000px] -translate-x-[80%] -rotate-[45deg]">E</span><span
                    class="main-page-heading -translate-y-[1200px] -translate-x-[80%] -rotate-[45deg]">T</span>
                <span class="main-page-heading -translate-y-[1400px] -translate-x-[80%] -rotate-[45deg]">E</span>
            </div>
            <div class="h-fit w-full max-w-[250px] flex flex-col min-w-[647px]:flex-row items-center justify-between flex-wrap gap-2">
                <button class="bg-primary text-on-surface h-full w-full relative regular-font text-lg sm:text-xl text-center py-1.5 corner-br
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                        on:click={() => {showDataForm('register')}}
>
                    Register for an event
                </button>
                <button class="bg-primary text-on-surface w-full relative regular-font text-lg sm:text-xl text-center py-1.5 corner-br
                           hover:bg-surface hover:text-on-surface duration-300 ease-in transition-all
                           -mr-3"
                        on:click={() => {showDataForm('join-code')}}
                        style="clip-path: polygon(0 0,100% 0,100% calc(100% - .625rem),calc(100% - .625rem) 100%,0 100%);">
                    Join a team
                </button>
            </div>
        </div>
    </div>
    {#if data.registrationData.ownerOrSolo}
        <div class="h-screen w-full flex flex-col items-center justify-center relative cultural-tickets"
             style="perspective: 800px">
            <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
                <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl -translate-x-[100%] cultural-controller-left flex items-center justify-center"
                        on:click={() => {slideLeft('cultural', data.registrationData.ownerOrSolo)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g>
                            <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                            <polygon
                                    points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                        </g>
                    </svg>
                </button>
                <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl translate-x-[100%] cultural-controller-right flex items-center justify-center"
                        on:click={() => {slideRight('cultural', data.registrationData.ownerOrSolo)}}>
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
                 style="z-index: {data.registrationData.ownerOrSolo.length + 2};">
                <Ticket mainTitle="LEAD/SOLO" isPassHeading="{false}" showBuyButton="{false}" description="{true}"
                        descriptionText="You have currently registered for {data.registrationData.ownerOrSolo.length} events"
                        on:showMoreClick={() => {openTickets('cultural', data.registrationData.ownerOrSolo)}}/>
            </div>
            {#each data.registrationData.ownerOrSolo as culturalTicket, index}
                <div class="h-fit w-fit cultural-content-ticket cultural-ticket-div absolute cultural-carousel-{index+2} origin-bottom-left -translate-y-[100%]"
                     style="z-index: {data.registrationData.ownerOrSolo.length - index+1}">
                    <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                    <Ticket mainTitle="{culturalTicket.event_name}" isPassHeading="{false}" isCompeteCard="{true}"
                            competeDataList="{(culturalTicket.is_team) ? [`Members: ${culturalTicket.team_member_count}/${culturalTicket.max_team_members}`, `Join Code: ${culturalTicket.join_code}`, `Team Name: ${culturalTicket.team_name}`]: [`This is a solo event`]}"
                            isTeamEvent="{culturalTicket.is_team}"
                            isTeamLeader="{(culturalTicket.email === $page.data.session.user.email)}"
                    />
                </div>
            {/each}
        </div>
    {/if}
    {#if data.registrationData.member}
        <div class="h-screen w-full flex flex-col items-center justify-center relative member-tickets"
             style="perspective: 800px">
            <div class="w-full p-0 lg:p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[25] flex items-center justify-between">
                <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl member-controller-left flex items-center justify-center"
                        on:click={() => {slideLeft('member', data.registrationData.member)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g>
                            <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
                            <polygon
                                    points="12.707 8.707 11.293 7.293 6.586 12 11.293 16.707 12.707 15.293 10.414 13 16 13 16 11 10.414 11 12.707 8.707"/>
                        </g>
                    </svg>
                </button>
                <button class="h-8 w-8 rounded-full bg-on-surface/50 backdrop-blur-xl member-controller-right flex items-center justify-center"
                        on:click={() => {slideRight('member', data.registrationData.member)}}>
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
            <div class="h-fit w-fit member-heading-ticket member-ticket-div absolute member-carousel-1 origin-bottom-left"
                 style="z-index: {data.registrationData.member.length + 2};">
                <Ticket mainTitle="TEAM MEMBER" isPassHeading="{false}" showBuyButton="{false}" description="{true}"
                        descriptionText="You have currently registered for {data.registrationData.member.length} events"
                        on:showMoreClick={() => {openTickets('member', data.registrationData.member)}}/>
            </div>
            {#each data.registrationData.member as culturalTicket, index}
                <div class="h-fit w-fit member-content-ticket member-ticket-div absolute member-carousel-{index+2} origin-bottom-left -translate-y-[100%]"
                     style="transform: translate3d({12 * (index+1)}%, 0, {-8 * (index+1)}em); z-index: {data.registrationData.member.length - index+1}">
                    <!--                 style="transform: translate(-{80 * (index+1)}%, -{20 * (index+1)}%) rotate(-{20 * (index+1)}deg); z-index: {culturalPasses.length - index+1}">-->
                    <Ticket mainTitle="{culturalTicket.event_name}" isPassHeading="{false}" isCompeteCard="{true}"
                            competeDataList="{(culturalTicket.is_team) ? [`Members: ${culturalTicket.team_member_count}/${culturalTicket.max_team_members}`, `Join Code: ${culturalTicket.join_code}`, `Team Name: ${culturalTicket.team_name}`]: [`This is a solo event`]}"
                            isTeamEvent="{culturalTicket.is_team}"
                            isTeamLeader="{(culturalTicket.email === $page.data.session.user.email)}"
                    />
                </div>
            {/each}
        </div>
    {/if}
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