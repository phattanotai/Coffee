<template>
  <div
    class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 mt-3 fixed-start"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <router-link
        class="nav-link d-flex justify-content-center align-items-center"
        to="/"
      >
        <img src="" class="w-65" />
      </router-link>
    </div>
    <hr class="horizontal dark mt-0" />
    <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(sidebar, index) in sidebars" :key="index">
          <router-link
            class="nav-link"
            :class="{ active: '/' + $route.name == sidebar.url }"
            :to="sidebar.url"
          >
            <i v-html="sidebar.icon"></i>
            <span class="nav-link-text ms-1">{{ sidebar.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import sidebarlists from "@/layout/Sidebar.js";
export default {
  name: "SideBar",
  data: () => ({
    sidebars: sidebarlists,
    page_name: "",
  }),
};
</script>
