<template>
    <div class="main-wrapper">
        <div class="min-height-250 bg-navtop position-absolute w-100"></div>
        <!---Sidebar-->
        <SideBar />
        <main class="main-content position-relative border-radius-lg">
            <router-view></router-view>
        </main>

    </div>
</template>

<script>
    import SideBar from "@/layout/SideBar.vue";
    // import Navbar from "@/layout/Navbar";

    export default {

        name: "MainContainer",
        components: {
            // Navbar,
            SideBar
        },
    }
</script>