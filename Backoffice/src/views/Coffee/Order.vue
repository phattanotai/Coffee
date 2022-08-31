<template>
  <div id="order">
    <v-list flat>
      <v-subheader>รายการ</v-subheader>
      <v-list-group color="primary" v-for="(item, i) in getOrders" :key="i">
        <template v-slot:activator>
          <v-list-item-content>
            <v-img
              max-height="50"
              max-width="50"
              contain
              :src="item.img"
            ></v-img>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            {{ item.price * item.bpm }} บาท
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content class="pt-5">
            <v-card-actions class="mx-2 mt-n4">
              <v-btn outlined class="mt-n2 add" @click="decrement(item)">
                <v-icon color="green"> mdi-minus </v-icon>
              </v-btn>
              <strong class="mx-2" v-text="item.bpm"></strong>
              <v-btn outlined class="mt-n2 add" @click="increment(item)">
                <v-icon color="green"> mdi-plus </v-icon>
              </v-btn>
              <v-btn outlined class="mt-n2 add" @click="removeOrder(i)">
                <v-icon large color="red darken-2"> mdi-delete </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-alert dense border="left" type="warning" v-if="item.bpm <= 0">
                ลบออก
              </v-alert>
            </v-card-actions>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "order",
  methods: {
    ...mapActions("Shopping", ["removeOrder"]),
    decrement(product) {
      product.bpm = product.bpm <= 0 ? 0 : product.bpm - 1;
    },
    increment(product) {
      product.bpm++;
    },
  },
  computed: {
    ...mapGetters("Shopping", ["getOrders"]),
  },
};
</script>
<style>
#order {
  max-width: 700px;
  margin: auto;
}
</style>
