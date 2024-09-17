<script>
    import EventCard from "$lib/common/EventCard.svelte";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
</script>


<div class="h-screen w-full fixed top-0">
    <AICanvasClaude2/>
</div>
<div class="h-[90vh] w-full flex flex-col items-center justify-center z-[2] sticky top-0">
    <div class="h-fit w-full flex flex-col overflow-hidden">
        <div
                class="pt-14 px-5 brand-font text-left h-fit w-full -translate-x-9 flex flex-row items-center justify-center text-8xl sm:text-7xl lg:text-9xl text-on-surface overflow-y-clip">
            CULTURAL
        </div>
        <div
                class="px-5 brand-font text-right h-fit w-full translate-x-9 lg:translate-x-24 flex flex-row items-center justify-center text-8xl sm:text-7xl lg:text-9xl text-on-surface overflow-y-clip">
            EVENTS
        </div>
        <div class="h-fit w-full flex flex-col items-center justify-center px-5 mt-24">
            <p class="brand-font text-3xl sm:text-4xl lg:text-5xl text-primary tracking-wide text-center">

            </p>
        </div>
    </div>
</div>
<div class="flex flex-col mt-20 flex-wrap items-center gap-5 justify-center min-h-screen w-full overflow-hidden">
    <EventCard prefix="k"/>
    <EventCard prefix="h"/>
    <EventCard prefix="t"/>
</div>
