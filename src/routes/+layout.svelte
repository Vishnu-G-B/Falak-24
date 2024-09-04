<script>
    import "../app.css";
    import PageTransistion from "$lib/common/PageTransistion.svelte";
    import Navbar from "$lib/common/navbar.svelte";
</script>

<Navbar/>
<PageTransistion/>
<div class="main-wrapper bg-surface min-h-screen">
    <slot/>
</div>

