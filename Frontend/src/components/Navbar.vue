<template>
  <v-app-bar app color="white" flat>
    <v-badge color="#D5F0DB" dot>
      <v-img src="images/1.png" contain width="30"></v-img>
    </v-badge>

    <v-toolbar-title class="ml-4">
      <span class="green--text">e</span><strong>Grocery</strong>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-badge
      color="#FF6D59"
      overlap
      :content="tableList.length"
      class="mr-2 mt-1"
    >
      <v-select
        v-model="table"
        :items="tableList"
        menu-props="auto"
        label="โต้ะ"
        hide-details
        prepend-icon="mdi-table"
        single-line
        @change="onChangeTable"
      ></v-select>
    </v-badge>
    <v-badge
      color="#41AB55"
      overlap
      :content="sumOrder"
      class="order mr-2 mt-1"
    >
      <v-avatar color="#ECF7EE" size="40" @click="showOrder">
        <v-icon x-small color="#41AB55">fas fa-shopping-cart</v-icon>
      </v-avatar>
    </v-badge>

    <v-badge color="#41AB55" overlap :content="1" class="order mr-2 mt-1">
      <v-avatar color="brown" size="40" @click="showHistory">
        <v-icon x-small color="white">mdi-history</v-icon>
      </v-avatar>
    </v-badge>

    <!-- <span class="grey--text d-none d-sm-flex"
      >Hello, <strong> Jonny</strong></span
    >
    <v-avatar size="30" class="ml-2">
      <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
    </v-avatar>
    <v-btn icon dark class="">
      <v-icon x-small color="#878A94">fas fa-chevron-down</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    sumOrder: 0,
    tables: [],
  },
  data: () => ({
    table: "",
  }),
  methods: {
    ...mapActions("Shopping", ["changeTable"]),
    showOrder() {
      this.$emit("showOrder");
    },
    showHistory() {
      this.$emit("showHistory");
    },
    onChangeTable() {
      this.changeTable(this.table);
    },
  },
  computed: {
    tableList() {
      const d = [];
      for (const i of this.tables) {
        d.push(i.number);
      }
      return d;
    },
  },
};
</script>

<style>
.v-toolbar__title {
  font-size: 1rem !important;
}
.order {
  cursor: pointer;
}
</style>
