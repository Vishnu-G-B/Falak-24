<script>
    import "../app.css";
    import PageTransistion from "$lib/common/PageTransistion.svelte";
</script>

<PageTransistion/>
<div class="main-wrapper bg-surface min-h-screen">
    <slot/>
</div>