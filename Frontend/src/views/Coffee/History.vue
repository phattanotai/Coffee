<template>
  <div id="history">
    <v-list flat>
      <v-subheader class="mb-10"
        ><h2>REPORTS โต๊ะ {{ bill.table }}</h2></v-subheader
      >

      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in orderList" :key="i">
          <v-list-item-content>
            <v-img
              max-height="50"
              max-width="50"
              contain
              :src="host + '/' + item.beverage.img"
            ></v-img>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="item.beverage.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="item.price"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="item.total"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-alert border="left" color="indigo" dense dark>
              {{ item.status }}
            </v-alert>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="mt-13">
          <v-list-item-content> </v-list-item-content>
          <v-list-item-content> </v-list-item-content>
          <v-list-item-content> </v-list-item-content>
          <v-list-item-content
            ><h3>รวม {{ bill.amount }} บาท</h3>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { URL_ENDPOINT } from "../../service/http-client";

export default {
  name: "history",
  props: {
    bill: [],
    orderList: [],
  },
  data: () => ({
    host: URL_ENDPOINT,
  }),
  methods: {
    closeModal() {
      this.dialogOption = false;
      this.editOrder(this.product);
    },
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
}
#history {
  max-width: 700px;
  margin: auto;
}
</style>
