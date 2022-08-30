<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";

export default {
  created() {
    Vue.prototype.$vs = this.$vs;
  },
};
</script>
