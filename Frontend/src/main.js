import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuesax from "vuesax";
Vue.use(Vuesax);
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "@/assets/css/argon-dashboard.css";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/custom.css";

import "material-icons/iconfont/material-icons.css";
import "vue-toast-notification/dist/index.css";
import VueToast from "vue-toast-notification";
import numeral from "numeral";
import numFormat from "vue-filter-number-format";
Vue.filter("numFormat", numFormat(numeral));

import Sortable from "sortablejs";
Vue.directive("sortable", {
  inserted: function (el, binding) {
    new Sortable(el, binding.value || {});
  },
});

import Upload from "buefy";
// import 'buefy/dist/buefy.css';
Vue.use(Upload);
Vue.use(VueToast);
import VCalendar from "v-calendar";
Vue.use(VCalendar);

import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
