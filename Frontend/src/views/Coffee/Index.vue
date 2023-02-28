<template>
  <v-app>
    <Navbar
      :sumOrder="getSumOrder"
      :tables="tables"
      @showOrder="showOrder"
      @showHistory="showHistory"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto rounded-xl" flat>
            <v-img
              src="images/back.webp"
              max-height="100%"
              max-width="100%"
              contain
            >
              <v-card-title class="top ml-10">
                <h2 class="title1">Order your</h2>
              </v-card-title>
              <v-card-title class="ml-10 mt-n8">
                <h2 class="title2">Daily Groceries</h2>
              </v-card-title>
              <v-card-text class="ml-10">
                <h3 class="green--text">#Free Delivery</h3>
              </v-card-text>
              <v-card-text class="ml-10">
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      label="Search your daily groceries"
                      class="d-none d-sm-none d-md-flex"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      solo
                      flat
                      background-color=""
                      rounded
                      outlined
                      success
                      v-model="searchInput"
                      @keyup.enter="onSearch"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="marginLeft">
                    <v-btn
                      color="green"
                      rounded
                      dark
                      x-large
                      class="py-7 d-none d-sm-none d-md-flex"
                      @click="onSearch"
                    >
                      search
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-img>
          </v-card>
          <v-toolbar flat color="transparent">
            <v-toolbar-title class="text-h6">Category</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <Category :categories="categories" @clickCategory="clickCategory" />

          <v-toolbar flat color="transparent" class="mt-[50]">
            <v-toolbar-title class="text-h6">Popular Product</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <Product
            :dataList="beverage"
            :categoryId="categoryId"
            :searchData="searchData"
            @onShopping="onShopping"
            :types="types"
            :sweetness="sweetness"
            :options="options"
          />
        </v-col>
      </v-row>
      <!-- modal -->
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-top-transition"
        >
          <v-card v-if="dialogContent === 'order'">
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Order</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="comfirmOrder()"> ยืนยันการสั้ง </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <Order :types="types" :sweetness="sweetness" :options="options" />
          </v-card>
          <v-card v-if="dialogContent === 'history'">
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>History</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <History :orderList="orderList" :bill="bill" />
          </v-card>
        </v-dialog>
        <!-- alert -->
        <v-snackbar v-model="snackbar" timeout="2000" shaped>
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Category from "../../components/Category.vue";
import Product from "../../components/Product.vue";
import Pack from "../../components/Pack.vue";
import Client from "../../components/Client.vue";
import Partner from "../../components/Partner.vue";

import Order from "./Order.vue";
import History from "./History.vue";

import categoryService from "../../service/categoryService";
import beveragesService from "../../service/beveragesService";
import masterDataService from "../../service/masterDataService";
import ordersService from "../../service/ordersService";
import { URL_ENDPOINT } from "../../service/http-client";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
    Category,
    Product,
    Pack,
    Client,
    Partner,
    Order,
    History,
  },
  data: () => ({
    toggle_exclusive: 1,
    categories: [{ id: 0, img: "images/3.png", title: "All" }],
    beverage: [],
    beverageS: "",
    categoryId: 0,
    searchInput: "",
    searchData: "",
    dialog: false,
    options: [],
    types: [],
    tables: [],
    sweetness: [],
    snackbar: false,
    text: "",
    dialogContent: "order",
    orderList: [],
    bill: {},
  }),

  methods: {
    ...mapActions("Shopping", ["addOrder", "createBills"]),
    comfirmOrder() {
      if (!this.getTable) {
        this.text = "กรุณาระบุหมายเลขโต๊ะ";
        this.snackbar = true;
      } else {
        if (!this.getOrders.length) {
          this.text = "กรุณาเลือกเครื่องดื่มก่อน";
          this.snackbar = true;
        } else {
          this.dialog = false;
          this.createBills();
        }
      }
    },
    onShopping(order) {
      if (!this.getTable) {
        this.text = "กรุณาระบุหมายเลขโต๊ะ";
        this.snackbar = true;
      } else {
        order.id = Date.now();
        this.addOrder(order);
        setTimeout(() => {
          this.beverage = JSON.parse(this.beverageS);
        }, 1000);
      }
    },
    clickCategory(e) {
      this.categoryId = e.id;
    },
    onSearch() {
      this.searchData = this.searchInput;
    },
    showOrder() {
      this.dialog = true;
      this.dialogContent = "order";
    },
    async showHistory() {
      const id = this.getBillId || localStorage.getItem("billId");
      this.orderList = await ordersService.getOrdersByBill(id);
      this.bill = this.orderList[0].bill;
      if (this.bill.status === "waiting" || this.bill.status === "producing") {
        this.dialog = true;
        this.dialogContent = "history";
      }
    },
    async fatchBeverages() {
      this.beverage = [];
      await beveragesService.getBeverages().then((data) => {
        for (const item of data) {
          this.beverage.push({
            beverageId: item.id,
            id: "",
            bpm: 1,
            img: `${URL_ENDPOINT}/${item.img}`,
            name: item.name,
            duration: item.duration,
            price: item.price,
            category: item.category,
            type: "Hot",
            sweetness: "Default",
            option: "Straw",
            selectType: item.selectType,
            selectSweetness: item.selectSweetness,
            afterPrice: 0,
            afterDuration: 0,
          });
        }
        this.beverageS = JSON.stringify(this.beverage);
      });
    },
  },
  async mounted() {
    await categoryService.getCategory().then((data) => {
      for (const item of data) {
        this.categories.push({
          id: item.id,
          img: "images/3.png",
          title: item.name,
        });
      }
    });
    this.fatchBeverages();
    masterDataService.getOptions().then((data) => {
      this.options = data;
    });
    masterDataService.getTypes().then((data) => {
      this.types = data;
    });
    masterDataService.getTables().then((data) => {
      this.tables = data;
    });
    masterDataService.getSweetness().then((data) => {
      this.sweetness = data;
    });
  },
  computed: {
    ...mapGetters("Shopping", [
      "getSumOrder",
      "getTable",
      "getBillId",
      "getOrders",
    ]),
  },
};
</script>
<style>
.marginLeft {
  margin-left: -90px;
}
.mtop {
  margin-top: 100px;
}
.mbottom {
  margin-bottom: 100px;
}
.v-card.borderme {
  border: 2px solid green !important;
}
.v-card.borderout {
  border: 1px solid #d5f0db !important;
}
.v-btn:not(.v-btn--round).v-size--default.add {
  min-width: 0px !important;
}
.theme--light.v-sheet--outlined.mobile {
  border: 2px solid black !important;
}
@media only screen and (max-width: 600px) {
  h2.title1 {
    font-size: 15px;
  }
  h2.title2 {
    font-size: 15px;
  }
  .top {
    margin-top: 20px;
  }
}
@media only screen and (min-width: 600px) {
  .top {
    margin-top: 70px;
  }
}
@media only screen and (min-width: 768px) {
  .top {
    margin-top: 120px;
  }
}
</style>
