<template>
  <v-app>
    <Navbar :sumOrder="getSumOrder" @showOrder="showOrder" />
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

          <v-toolbar flat color="transparent" class="mt-5">
            <v-toolbar-title class="text-h6">Popular Product</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <Product
            :dataList="beverage"
            :categoryId="categoryId"
            :searchData="searchData"
            @onShopping="onShopping"
          />
          <!-- <v-card flat color="#E2F2E5" class="rounded-xl mt-8">
            <v-toolbar flat color="transparent" class="mb-4">
              <v-toolbar-title class="text-h6 mt-5"
                >Popular Bundle Pack</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <Pack />
          </v-card> -->
          <!-- <v-card flat color="#FAFAFA" class="mt-8 py-5 px-16">
            <div
              style="
                position: absolute;
                margin-left: auto;
                margin-right: auto;
                left: 0;
                right: 0;
                text-align: center;
              "
            >
              <h3>What Our Clients Say</h3>
            </div>
            <Client />
          </v-card> -->
          <!-- <v-toolbar flat color="transparent" class="mt-8">
            <v-toolbar-title class="text-h6"
              >Our Trusted Partner</v-toolbar-title
            >
          </v-toolbar>
          <Partner /> -->
          <!-- <v-card
            flat
            color="#E2F2E5"
            class="rounded-xl mtop mbottom mx-10 pa-4"
            height="350"
          >
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="5">
                <v-card
                  class="rounded-xl mt-n16 ml-16 mobile"
                  outlined
                  flat
                  height="450"
                  width="200"
                >
                  <v-img src="images/mobile.png"></v-img>
                </v-card>
              </v-col>
              <v-col cols="12" xs="12" sm="6" md="7">
                <h1 class="mt-16">Download App</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                  Provident sequi esse tempore maiores quasi quia non.<br />
                  Itaque laboriosam dicta nostrum accusantium assumenda,<br />
                  vitae ab ut vel tenetur minima natus commodi!
                </p>
                <v-btn color="black" dark class="mb-10">
                  <v-icon color="white" left>fab fa-apple</v-icon>
                  App Store
                </v-btn>
                <v-btn color="black" dark class="ml-4 mb-10">
                  <v-icon color="white" left>fab fa-google-play</v-icon>
                  Play Store
                </v-btn>
              </v-col>
            </v-row>
          </v-card> -->
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
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Order</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="dialog = false"> ยืนยันการสั้ง </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <Order />
          </v-card>
        </v-dialog>
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

import categoryService from "../../service/categoryService";
import beveragesService from "../../service/beveragesService";
import { URL_ENDPOINT } from "../../service/http-client";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data: () => ({
    toggle_exclusive: 1,
    categories: [{ id: 0, img: "images/3.png", title: "All" }],
    beverage: [],
    categoryId: 0,
    searchInput: "",
    searchData: "",
    dialog: false,
  }),
  components: {
    Navbar,
    Footer,
    Category,
    Product,
    Pack,
    Client,
    Partner,
    Order,
  },
  methods: {
    ...mapActions("Shopping", ["addOrder"]),
    onShopping(order) {
      this.addOrder(order);
      setTimeout(() => {
        e.bpm = 0;
      }, 3000);
    },
    clickCategory(e) {
      this.categoryId = e.id;
    },
    onSearch() {
      this.searchData = this.searchInput;
    },
    showOrder() {
      this.dialog = true;
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
    await beveragesService.getBeverages().then((data) => {
      for (const item of data) {
        this.beverage.push({
          bpm: 0,
          img: `${URL_ENDPOINT}/${item.img}`,
          title: item.name,
          subtitle: item.duration,
          price: item.price,
          category: item.category,
        });
      }
    });
  },
  computed: {
    ...mapGetters("Shopping", ["getSumOrder"]),
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
