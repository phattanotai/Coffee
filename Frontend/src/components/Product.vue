<template>
  <v-row justify="center" class="space px-16">
    <v-col
      cols="12"
      xs="12"
      sm="6"
      md="4"
      v-for="(product, i) in products"
      :key="i"
    >
      <v-card class="mx-auto rounded-xl" max-width="300" color="" flat outlined>
        <div align="center" justify="center" class="rounded-img mt-2">
          <v-img
            max-height="100"
            max-width="300"
            contain
            :src="product.img"
          ></v-img>
        </div>

        <v-card-title class="">{{ product.name }}</v-card-title>
        <v-card-title class="grey--text text-grey-darken-1 caption mt-n6"
          >{{
            (product.duration + product.afterDuration) * product.bpm
          }}s</v-card-title
        >

        <v-card-title class="mt-n4"
          >{{
            (product.price + product.afterPrice) * product.bpm
          }}บาท</v-card-title
        >

        <v-card-actions class="mx-2 mt-n4">
          <v-btn outlined class="mt-n2 add" @click="editOption(product, i)">
            แก้ไข
          </v-btn>

          <v-btn outlined class="mt-n2 add" @click="decrement(product)">
            <v-icon color="green"> mdi-minus </v-icon>
          </v-btn>

          <strong class="mx-2" v-text="product.bpm"></strong>
          <v-btn outlined class="mt-n2 add" @click="increment(product)">
            <v-icon color="green"> mdi-plus </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2 mt-n3"
            fab
            dark
            small
            color="green"
            @click="onShopping(product)"
          >
            <v-icon dark> mdi-shopping </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" shaped>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
          <v-btn color="primary" text @click="dialogOption = false">
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dataList: [],
    categoryId: 0,
    searchData: "",
    types: [],
    sweetness: [],
    options: [],
  },
  data: () => ({
    snackbar: false,
    text: "จำนวนต้องมากกว่า 1",
    timeout: 2000,
    dialogOption: false,
    product: {},
    productIndex: 0,
  }),
  methods: {
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
    editOption(product, index) {
      this.productIndex = index;
      this.product = product;
      this.dialogOption = true;
    },
    onShopping(order) {
      if (order.bpm) {
        this.text = "เพิ่มออเดอร์แล้ว";
        this.$emit("onShopping", order);
        this.snackbar = true;
      } else {
        this.text = "จำนวนต้องมากกว่า 1";
        this.snackbar = true;
      }
    },

    decrement(product) {
      product.bpm--;
      product.bpm = product.bpm <= 1 ? 1 : product.bpm;
    },
    increment(product) {
      product.bpm++;
    },
  },
  computed: {
    products() {
      return this.dataList.filter((item) => {
        return (
          item.category.id === this.categoryId ||
          (this.categoryId === 0 &&
            item.name.toLowerCase().includes(this.searchData.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style>
.rounded-img {
  border-radius: 10%;
}
</style>
