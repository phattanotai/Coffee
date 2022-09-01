<template>
  <div id="order">
    <v-list flat>
      <v-subheader>รายการ</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item>
          <v-list-item-content> รูป </v-list-item-content>
          <v-list-item-content> ชื่อ </v-list-item-content>
          <v-list-item-content> จำนวน </v-list-item-content>
          <v-list-item-content> ราคา </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

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
            {{ item.name }}
          </v-list-item-content>
          <v-list-item-content>
            {{ item.bpm }}
          </v-list-item-content>
          <v-list-item-content>
            {{ (item.price + item.afterPrice) * item.bpm }} บาท
          </v-list-item-content>
        </template>
        <v-list-item>
          <v-list-item-content class="pt-5">
            <v-card-actions class="mx-2 mt-n4">
              <v-btn outlined class="mt-n2 add" @click="editOption(item, i)">
                แก้ไข
              </v-btn>
              <v-btn outlined class="mt-n2 add" @click="decrement(item)">
                <v-icon color="green"> mdi-minus </v-icon>
              </v-btn>
              <strong class="mx-2" v-text="item.bpm"></strong>
              <v-btn outlined class="mt-n2 add" @click="increment(item)">
                <v-icon color="green"> mdi-plus </v-icon>
              </v-btn>
              <v-btn
                outlined
                class="mt-n2 add"
                @click="removeOrder(i)"
                v-if="item.bpm > 0"
              >
                <v-icon large color="red darken-2"> mdi-delete </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                dark
                class="mt-n2 add"
                v-if="item.bpm <= 0"
                @click="removeOrder(i)"
              >
                ลบออก
              </v-btn>
            </v-card-actions>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item-group color="primary" class="mt-6 ml-12">
        <v-list-item>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <v-list-item-content> <h3>รวม</h3> </v-list-item-content>
          <v-list-item-content
            ><h3>{{ getAmount }}</h3>
          </v-list-item-content>
          <v-list-item-content><h3>บาท</h3> </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-dialog v-model="dialogOption" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Options </v-card-title>
        <v-container fluid v-if="product.selectType">
          <hr />
          <v-radio-group v-model="product.type" row>
            <v-radio
              :label="item.name"
              v-for="(item, l) in types"
              :key="l"
              :value="item.name"
              @change="onChange(item)"
            ></v-radio>
          </v-radio-group>
        </v-container>
        <v-container fluid v-if="product.selectSweetness">
          <hr />
          <v-radio-group v-model="product.sweetness" row>
            <v-radio
              :label="item.name"
              v-for="(item, l) in sweetness"
              :key="l"
              :value="item.name"
            ></v-radio>
          </v-radio-group>
        </v-container>

        <v-container fluid>
          <hr />
          <v-radio-group v-model="product.option" row>
            <v-radio
              :label="item.name"
              v-for="(item, l) in options"
              :key="l"
              :value="item.name"
            ></v-radio>
          </v-radio-group>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal"> ปิด </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "order",
  props: {
    types: [],
    sweetness: [],
    options: [],
  },
  data: () => ({
    dialogOption: false,
    duration: [],
    price: [],
    productIndex: 0,
    product: {},
  }),
  methods: {
    ...mapActions("Shopping", ["removeOrder", "editOrder"]),
    closeModal() {
      this.dialogOption = false;
      this.editOrder(this.product);
    },
    editOption(product, index) {
      this.productIndex = index;
      this.product = product;
      this.dialogOption = true;
    },
    onChange(type) {
      if (this.product.afterDuration <= 0) {
        this.product.afterDuration += type.duration;
      } else if (this.product.afterDuration > 0) {
        this.product.afterDuration -= this.product.afterDuration;
      }
      if (this.product.afterPrice <= 0) {
        this.product.afterPrice = this.product.afterPrice + type.price;
      } else if (this.product.afterPrice >= 0) {
        this.product.afterPrice -= this.product.afterPrice;
      }
    },
    decrement(product) {
      product.bpm = product.bpm <= 0 ? 0 : product.bpm - 1;
      this.editOrder(product);
    },
    increment(product) {
      product.bpm++;
      this.editOrder(product);
    },
  },
  computed: {
    ...mapGetters("Shopping", ["getOrders", "getAmount"]),
  },
};
</script>
<style>
.pointer {
  cursor: pointer;
}
#order {
  max-width: 700px;
  margin: auto;
}
</style>
