<script>
    import {enhance} from "$app/forms";
    import HelperAnimations from "$lib/common/HelperAnimations.svelte";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";

    export let data;

    let passToken;
    let errors = {passTokenError: '', selectedEventError: ''};
    let helperAnimations;
    let selectedEvent;
    let reactiveUserData;
    let reactiveUserRegistrationData;

    function checkPassToken() {
        if (passToken.length === 6) {
            errors.passTokenError = '';
        } else {
            errors.passTokenError = 'Invalid Pass Token';
        }
    }

    function attemptDetailsFetch({formData, cancel}) {
        checkPassToken();
        if (errors.passTokenError) {
            cancel();
        } else {
            console.log(selectedEvent);
            formData.set('passToken', passToken);
            formData.set('eventPriority', selectedEvent.attributes.EventPriority);
        }
    }

    function attemptAttendanceMarking({formData, cancel}) {
        if (reactiveUserRegistrationData && reactiveUserData) {
            formData.set('eventPriority', reactiveUserRegistrationData.event_priority);
            formData.set('email', reactiveUserData.email);
            formData.set('passToken', passToken);
        } else {
            cancel();
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

    $: reactiveUserData;
    $: reactiveUserRegistrationData;
</script>
<HelperAnimations bind:this={helperAnimations}/>

<div class="w-full h-[6rem]"
    style="display: {reactiveUserData !== undefined ? 'hidden': 'block'}"></div>
<div class="min-h-screen h-fit w-full flex flex-col items-center justify-center">
    <div class="h-fit w-fit relative border-4 border-primary bg-surface flex flex-col items-start justify-center z-[6] px-5 pt-5 gap-5">
        <div class="h-fit w-fit flex flex-col gap-1">
            <p class="brand-font text-primary text-[40px] leading-8 tracking-wide">PASS VERIFICATION</p>
            <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Enter the 6
                digit
                code on my-tickets route</p>
            <p class="regular-font text-on-surface/70 text-lg leading-5 tracking-wide text-left mt-1">Code will
                always
                be of length == 6</p>
        </div>
        <div class="h-fit w-full flex flex-col gap-2">
            <form action="/ticket-verification?/getPassDetails" method="post" use:enhance={async (event) => {
                helperAnimations.animateLoadingPhase('get-details');
                attemptDetailsFetch(event);
                return async ({result}) => {
                    helperAnimations.stopLoadingPhase('get-details');
                    if(result.type === 'success') {
                        if(result.data.success) {
                            reactiveUserData = result.data.foundUser;
                            reactiveUserRegistrationData = result.data.foundEventRegistration;
                        } else {
                            reactiveUserData = undefined;
                            reactiveUserRegistrationData = undefined;
                            updateUrlStatus(result.data.state);
                        }
                    }
                }
            }}>
                <div class="form__group field">
                    <input type="text" class="form__field regular-font" placeholder="Token" required=""
                           bind:value={passToken} on:input={checkPassToken}>
                    <label for="name" class="form__label regular-font">Token</label>
                    <p class="text-sm text-error regular-font">{errors.passTokenError}</p>
                </div>
                <div class="form__group field mt-2 mb-2">
                    <select class="form__field regular-font bg-surface text-on-surface border-2 border-on-surface"
                            type="input"
                            required=""
                            bind:value={selectedEvent}>
                        <option value="-1" class="bg-surface text-on-surface" selected disabled>
                            Select an event to mark attendance
                        </option>
                        {#each data.allowedEvents as event}
                            <option value="{event}"
                                    class="bg-surface text-on-surface">{event.attributes.EventName}</option>
                        {/each}
                    </select>
                    <label for="name" class="form__label regular-font">Select an Event</label>
                    <p class="text-sm text-error regular-font">{errors.selectedEventError}</p>
                </div>
                {#if passToken && selectedEvent !== '-1' && passToken.length === 6 && selectedEvent}
                    <button class="w-full h-fit bg-primary text-on-surface text-3xl py-1 brand-font mt-4 pt-2 mb-2 uppercase relative"
                            type="submit">
                        <p class="get-details-button-inner-text">
                            Submit
                        </p>
                        <div class="h-full w-full flex-col items-center justify-center get-details-loader-refresh hidden scale-0 absolute top-0 left-0">
                            <div class="rounded-full bg-on-surface h-8 w-8 get-details-loader-refresh-dot"></div>
                        </div>
                    </button>
                {/if}
            </form>
        </div>
    </div>
    {#if reactiveUserData}
        <div class="h-fit w-fit relative border-4 border-primary bg-surface flex flex-col items-start justify-center z-[6] px-5 pt-5 gap-5">
            <p class="regular-font text-on-surface">
                <span class="brand-font text-5xl">USER DETAILS-> <br></span>
                User Name: {reactiveUserData.user_name} <br>
                User Phone Number: {reactiveUserData.userPhoneNumber} <br>
                User Email: {reactiveUserData.email} <br>
                Is MAHE?: {reactiveUserData.is_mahe} <br>
            </p>
        </div>
        <div class="h-fit w-fit relative border-4 border-primary bg-surface flex flex-col items-start justify-center z-[6] px-5 pt-5 gap-5">
            {#if reactiveUserRegistrationData.is_team}
                <p class="regular-font text-on-surface">
                    <span class="brand-font text-5xl">REGISTRATION DETAILS-> <br></span>
                    Team Leader: {reactiveUserRegistrationData.email} <br>
                    Team Name: {reactiveUserRegistrationData.team_name} <br>
                    Event Name: {reactiveUserRegistrationData.event_name} <br>
                    Number Of Team Members: {reactiveUserRegistrationData.team_member_count}
                    / {reactiveUserRegistrationData.max_team_members} <br>
                    Team Members -> <br>
                    {#each reactiveUserRegistrationData.team_members as teamMember}
                        {teamMember} <br>
                    {/each}
                </p>
            {:else}
                <p class="regular-font text-on-surface">
                    Email: {reactiveUserRegistrationData.email} <br>
                    Event Name: {reactiveUserRegistrationData.event_name} <br>
                </p>
            {/if}
        </div>
        <form action="/ticket-verification?/markAttendance" method="post" class="h-fit w-fit mb-4" use:enhance={async (event) => {
            helperAnimations.animateLoadingPhase('get-details');
            attemptAttendanceMarking(event);
            return async ({result}) => {
                helperAnimations.stopLoadingPhase('get-details');
                if(result.type === 'redirect') {
                    await goto(result.location);
                } else if(result.type === 'success') {
                    updateUrlStatus(result.data.state);
                }
            }
        }}>
            <button class="w-full h-fit bg-primary text-on-surface text-3xl py-1 brand-font mt-4 pt-2 mb-2 uppercase relative px-2"
                    type="submit">
                <p class="get-details-button-inner-text">
                    Mark Attendance
                </p>
                <div class="h-full w-full flex-col items-center justify-center get-details-loader-refresh hidden scale-0 absolute top-0 left-0">
                    <div class="rounded-full bg-on-surface h-8 w-8 get-details-loader-refresh-dot"></div>
                </div>
            </button>
        </form>
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