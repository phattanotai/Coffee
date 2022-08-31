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
        <div align="center" justify="center">
          <v-img
            max-height="100"
            max-width="300"
            contain
            :src="product.img"
          ></v-img>
        </div>

        <v-card-title class="">{{ product.title }}</v-card-title>
        <v-card-title class="grey--text text-grey-darken-1 caption mt-n6"
          >{{ product.subtitle }}s</v-card-title
        >
        <v-card-title class="mt-n4">{{ product.price }}บาท</v-card-title>

        <v-card-actions class="mx-2 mt-n4">
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
  </v-row>
</template>

<script>
export default {
  props: {
    dataList: [],
    categoryId: 0,
    searchData: "",
  },
  data: () => ({
    snackbar: false,
    text: "จำนวนต้องมากกว่า 1",
    timeout: 2000,
  }),
  methods: {
    onShopping(e) {
      if (e.bpm) {
        this.text = "เพิ่มออเดอร์แล้ว";
        this.$emit("onShopping", e);
        this.snackbar = true;
      } else {
        this.text = "จำนวนต้องมากกว่า 1";
        this.snackbar = true;
      }
    },
    decrement(product) {
      product.bpm--;
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
            item.title.toLowerCase().includes(this.searchData.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style></style>
