<template>
  <div class="row" id="footer_menu">
    <div class="col footer_col">
      <router-link to="/">
        <div
          class="footer_height text-center"
          :class="{ action: $route.name == 'Home' }"
        >
          <img src="../../assets/images/footer/home.png" class="mt-2" />
          <p>home</p>
        </div>
      </router-link>
    </div>
    <div class="col footer_col">
      <router-link to="games">
        <div
          class="footer_height text-center"
          :class="{ action: $route.name == 'Games' }"
          style="border-top-right-radius: 50px"
        >
          <img src="../../assets/images/footer/favorites.png" class="mt-2" />
          <p>game</p>
        </div>
      </router-link>
    </div>
    <router-link
      to="/freespin"
      class="col footer_col_center"
      :class="{ action: $route.name == 'FreeSpin' }"
    >
      <div class="footer_txt_center">
        <img
          src="../../assets/images/footer/treasure_chest.png"
          style="width: 100%"
          alt=""
        />
      </div>
      <span>freeSpin</span>
    </router-link>
    <div class="col footer_col">
      <div
        class="footer_height text-center"
        style="border-top-left-radius: 50px"
      >
        <img src="../../assets/images/footer/dollar-symbol.png" class="mt-2" />
        <p>finance}</p>
      </div>
    </div>
    <div class="col footer_col" @click="logout">
      <div class="footer_height text-center">
        <img src="../../assets/images/footer/logout.png" class="mt-2" />
        <p>logout</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  methods: {
    logout() {
      this.$store.dispatch("doLogout");
    },
  },
};
</script>
