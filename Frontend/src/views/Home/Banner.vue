<template>
  <div>
    <div id="banner">
      <div class="w-100">
        <div class="text-center mt-5 m-auto">
          <carousel :autoplay="true" :nav="false" :loop="true" :center="true" :items="1.4" :autoplayTimeout="10000">
            <div v-for="(carousel, i) in carousels" :key="i"> <img @click="eventsPage()" :src="carousel.img" class="w-50"> </div>
          </carousel>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="header_noti row">
        <div class="col-2 col-sm-1 col-md-1 col-lx-1 col-lg-1"><i class="fas fa-star"></i></div>
        <div class="text-nowrap col-10 col-sm-11 col-md-11 col-lx-11 col-lg-11 overflow-hidden">
          <div class="animation"><span>{{header_noti}}</span></div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import carousel from 'vue-owl-carousel'
  const event1 = require("../../assets/images/events/event1.png");
  const event2 = require("../../assets/images/events/event2.png");
  const event3 = require("../../assets/images/events/event3.png");
  const event4 = require("../../assets/images/events/event4.png");
  export default {
    name: "events",
    data() {
      return {
        header_noti: 'ขณะนี้เปิดให้บริการตามปกติแล้วค่ะ | Maintenance Completed',
        carousels: [{
          img: event1,
        }, {
          img: event2,
        }, {
          img: event3,
        }, {
          img: event4,
        }],
        

      };
    },
    components: {
      carousel
    },
    methods: {

      eventsPage(){
        this.$router.push('/events');
      }

    },
    created() {

    },
  };
</script>

<style>
  

</style>