<template>
  <v-row class="px-16 mt-10">
    <v-col cols="3" v-for="(partner, i) in partners" :key="i">
      <div align="center" justify="center">
        <v-img
          :src="partner.img"
          max-height="80"
          max-width="80"
          contain
        ></v-img>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    partners: [
      { img: "images/airbnb.png" },
      { img: "images/adidas.png" },
      { img: "images/swords.png" },
      { img: "images/castle.png" },
    ],
  }),
};
</script>

<style></style>
