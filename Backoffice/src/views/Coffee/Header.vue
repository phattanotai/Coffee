<template>
  <div>
    <vs-navbar collapse v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title> Hello world </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
import storage from "@/service/storage";
export default {
  data: () => ({
    activeItem: 0,
  }),
  methods: {},

  computed: {},
  watch: {},
};
</script>
<style>
.errorMsg {
  color: red;
}

.classErr--inputT_ input,
.classErr--inputTs_ input,
.classErr--inputDate,
.err_editor .toastui-editor-defaultUI {
  border: 1px solid #d80101 !important;
}
</style>
