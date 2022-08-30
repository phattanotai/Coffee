<template>
  <div id="UserCard" class="col-12 d-flex">
    <div class="w-50 card_light d-flex align-items-center p-1 px-2 shadow">
      <div
        class="
          icon-amountmember
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <slot name="icon" v-if="!icon"></slot>
        <span v-html="icon" v-if="icon"> </span>
      </div>
      <div class="numbers mt-2">
        <p class="mb-0">{{ title1 }}</p>
        <h5 class="font-weight-bolder">{{ amount1 }}</h5>
      </div>
    </div>
    <div class="w-50 card_right p-1 px-4 shadow">
      <div class="numbers right mt-2">
        <p class="mb-0">{{ title2 }}</p>
        <h5 class="font-weight-bolder">{{ amount2 }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportToday",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title1: {
      type: String,
      default: "title1",
    },
    amount1: {
      type: String,
      default: "amount1",
    },
    title2: {
      type: String,
      default: "title2",
    },
    amount2: {
      type: String,
      default: "amount2",
    },
  },
  mounted() {},
};
</script>
