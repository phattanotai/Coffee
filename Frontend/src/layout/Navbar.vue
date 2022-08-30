<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-main navbar-expand px-0 mx-2 shadow-none border-radius-xl " id="navbarBlur">
            <div class="container-fluid mt-3">
                <nav aria-label="breadcrumb">
                    <h5 class="font-weight-bold text-white mb-0 font-montserrat">{{navbarPage}}</h5>
                </nav>
                <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                    <ul class="navbar-nav justify-content-end">
                         <li @click="$router.push(`note`)" class="nav-item d-flex align-items-center">
                            <vs-avatar color="dark" icon="bug_report" />
                        </li>

                        <li class="nav-item d-flex align-items-center">
                            <vs-avatar :badge="badge" color="primary" icon="notifications" />
                        </li>
                        <li @click="logout" class="nav-item d-flex align-items-center pointer">
                            <vs-avatar src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- End Navbar -->
    </div>

</template>
<script>
    import storage from '@/service/storage'
    export default {
        name: "Navbar",
        props: ["navbar-page"],

        data: () => ({
            badge: 2
        }),

        methods: {
            logout() {
                storage.clearToken();
            },
        },
    }
</script>