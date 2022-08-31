import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md" || "fa" || "md",
  },
});
