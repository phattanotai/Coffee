<template>
  <v-app>
    <v-main>
      <div id="app">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>
<script>
import Vue from "vue";

export default {
  name: "App",
  created() {
    Vue.prototype.$vs = this.$vs;
  },
};
</script>
