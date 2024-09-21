<script>
    import barcode from "$lib/assets/images/svgs/updated_2.svg";
    import {gsap} from "gsap/dist/gsap";
    import {goto} from "$app/navigation";
    import {browser} from "$app/environment";
    import {page} from "$app/stores";
    import {writable} from 'svelte/store';

    const memberListStore = writable([]);


    function showDetail(prefix) {
        let showDetailTimeline = gsap.timeline();
        showDetailTimeline.to(`.${prefix}-main-div`, {
            translateX: '80%',
            translateY: '20%',
            rotate: '20deg',
            opacity: 0,
            zIndex: 1,
            ease: 'sine',
        });
        showDetailTimeline.to(`.${prefix}-description-div`, {
            translateX: '0%',
            translateY: '0%',
            rotate: '0deg',
            opacity: 1,
            zIndex: 2,
            ease: 'sine',
        }, '<');
    }

    function hideDetail(prefix) {
        let hideDetailTimeline = gsap.timeline();
        hideDetailTimeline.to(`.${prefix}-description-div`, {
            translateX: '-80%',
            translateY: '-20%',
            rotate: '-20deg',
            opacity: 0,
            zIndex: 1,
            ease: 'sine',
        });
        hideDetailTimeline.to(`.${prefix}-main-div`, {
            translateX: '0%',
            translateY: '0%',
            rotate: '0deg',
            opacity: 1,
            zIndex: 2,
            ease: 'sine',
        }, '<');
    };

    function handleRegisterClick(status) {
        if (browser) {
            const urlParams = new URLSearchParams(window.location.search);
            window.history.pushState({}, document.title, window.location.pathname + status);
            setTimeout(() => {
                if (urlParams.has('details')) {
                    window.history.pushState({}, document.title, window.location.pathname);
                }
            }, 2000);
        }
    }

    async function removeTeamMember(eventPriority, memberEmail) {
        const response = await fetch('/api/team/remove', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: $page.data.session?.user.email, eventPriority, memberEmail})
        });
        const result = await response.json();
        if (result.success) {
            console.log(result.error);
            handleRegisterClick(result.error)
            memberListStore.update(list => list.filter(member => member !== memberEmail));
        } else {
            handleRegisterClick("An error occurred please try again later");
            console.error(result.error);
        }
    }

    async function deleteTeam(eventPriority) {
        const response = await fetch('/api/team/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: $page.data.session?.user.email, eventPriority})
        });
        const result = await response.json();
        if (result.success) {
            console.log(result.error);
            handleRegisterClick(result.error)
            memberListStore.set([]);
            window.location.reload();
        } else {
            console.error(result.error);
        }
    }

    export let prefix;
    export let eventName, eventDate, eventPriority, isMember;
    export let memberlist;
    export let description = "Manage Your Team Members by clicking on the button below.";
    export let disableshift;

    $: memberListStore.set(memberlist);

</script>

<div class="relative w-[320px] min-[375px]:w-[325px] sm:w-[400px] h-[475px] eventdiv">
    <div class="w-full h-full absolute flex flex-col flex-shrink-0 overflow-hidden bg-surface z-[2] {prefix}-main-div origin-bottom-left">
        <div class="flex flex-col items-start justify-center mt-6 pl-6 pr-6 h-full">
            <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[40%]">
                <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
            </div>
            <p class="text-[12px] text-on-surface regular-font font-thin">WHEN</p>
            <div class="flex flex-row items-end justify-between w-full mt-1">
                <div class="flex flex-col items-start justify-center">
                    <p class="text-5xl text-on-surface/70 brand-font">OCTOBER</p>
                    <p class="text-5xl text-on-surface/70 brand-font">2024</p>
                </div>
                <p class="text-8xl text-on-surface/70 brand-font leading-[1]">{eventDate}</p>
            </div>
            <div class="h-[20px] w-full bg-primary mt-4"></div>
            <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                <p class="brand-font text-6xl text-on-surface">{eventName}</p>
            </div>
            <div class="h-full w-full flex flex-col items-start justify-between z-[2] relative">
                <p class="regular-font text-xl text-on-surface/80">{description}</p>
            </div>

        </div>
        <div class="w-full h-fit flex flex-row items-center justify-center gap-5 px-10
                    absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10">
            {#if !disableshift}
                <button class="h-fit w-fit bg-primary p-1 px-4 regular-font text-on-surface"
                        on:click={() => {showDetail(prefix)}}>Show Team Members
                </button>
            {/if}
        </div>
        <div id="left-border" class="absolute left-0 bg-primary w-[14px] h-full"></div>
        <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
    </div>

    <div class="w-full h-full absolute flex-shrink-0 flex flex-col overflow-hidden bg-surface {prefix}-description-div origin-bottom-left text-center"
         style="transform: translate3d(-80%, -20%, 0) rotate(-20deg); opacity: 0;">
        <div class="flex flex-col items-start justify-start mt-3 pl-6 pr-6 h-full">
            <div class="w-full absolute left-0 -bottom-[28%] sm:-bottom-[42%]">
                <img src="{barcode}" alt="" class="object-fill fill-on-surface/20 w-full">
            </div>
            <div class="w-full flex flex-col items-start pt-2 bg-surface -translate-x-[25px] z-[2] mt-5">
                <p class="brand-font text-4xl text-on-surface">Team Members</p>
            </div>
            <div id="customscroll" class="w-full h-full overflow-y-auto flex flex-col justify-start items-center gap-2">
                {#if $memberListStore.length === 0}
                    <div class="h-fit w-full capitalize regular-font text-on-surface text-center flex justify-between items-center py-2">
                        TEAM IS DELETED
                    </div>
                {:else}
                    <div class="h-fit w-full capitalize regular-font text-on-surface flex justify-between items-center py-2">
                        <div class="member-name w-fit h-full text-lg">
                            {$memberListStore[0].split("@")[0]}
                        </div>
                    </div>
                    {#each $memberListStore.slice(1) as member}
                        <div class="h-fit w-full capitalize regular-font text-on-surface flex justify-between items-center py-2">
                            <div class="member-name w-fit h-full text-lg">
                                {member.split("@")[0]}
                            </div>
                            {#if !isMember}
                                <div class="member-action w-1/2 h-full text-end text-base group">
                                    <button class="bg-on-error text-error p-1 corner-br group-hover:bg-error group-hover:text-on-error"
                                            on:click|preventDefault={() => {removeTeamMember(eventPriority, member)}}>
                                        Remove
                                    </button>
                                </div>
                            {/if}
                        </div>
                    {/each}
                {/if}
            </div>

        </div>
        <div class="h-[160px] w-full flex flex-row items-end {isMember? 'justify-center' : 'justify-between' } gap-5 z-[2]
             absolute bottom-6 left-1/2 transform -translate-x-1/2 px-10">
            {#if !isMember}
                <button class="h-fit w-1/2 bg-on-error text-error p-1 regular-font hover:bg-error hover:text-on-error"
                        on:click|preventDefault={() => {deleteTeam(eventPriority)}}>
                    Delete Team
                </button>
            {/if}
            <button class="h-fit w-1/2 bg-primary p-1 regular-font text-on-surface"
                    on:click={() => {hideDetail(prefix)}}>Back
            </button>
        </div>
        <div class="absolute left-0 bg-primary w-[14px] h-full"></div>
        <div class="absolute top-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute bottom-0 bg-primary h-[14px] w-full"></div>
        <div class="absolute right-0 bg-primary w-[14px] h-full"></div>
    </div>
</div>

<style>
    #customscroll::-webkit-scrollbar {
        width: 20px;
    }

    #customscroll::-webkit-scrollbar-track {
        background-color: transparent;
    }

    #customscroll::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    #customscroll::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }

    .corner-br {
        -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - .625rem), calc(100% - .625rem) 100%, 0 100%);
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - .625rem), calc(100% - .625rem) 100%, 0 100%)
    }
</style>