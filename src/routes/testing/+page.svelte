<script>
    import EventCard from "$lib/common/EventCard.svelte";
    import AICanvasClaude2 from "$lib/common/AICanvasClaude2.svelte";
</script>


<div class="h-screen w-full fixed top-0">
    <AICanvasClaude2/>
</div>
<div class="flex flex-col mt-20 flex-wrap items-center gap-5 justify-center min-h-screen w-full overflow-hidden">
    <EventCard prefix="k"/>
    <EventCard prefix="h"/>
    <EventCard prefix="t"/>
</div>
