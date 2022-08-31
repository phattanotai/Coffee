<template>
  <div id="SummaryUser" class="row pb-4">
    <div class="col-6 d-flex" v-for="(data, index) in fetchData" :key="index">
      <UserCard
        :title1="data.title1"
        :amount1="data.amount1"
        :title2="data.title2"
        :amount2="data.amount2"
      >
        <template v-slot:icon>
          <span v-html="data.icon">
            <vs-icon icon="polymer" size="75px" bg="#BC1254" round></vs-icon>
          </span>
        </template>
      </UserCard>
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
import dataTast from "./testData";
export default {
  name: "SummaryUser",
  components: {
    UserCard,
  },
  props: {
    icon: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data: () => ({
    fetchData: [],
  }),
  methods: {
    setDataTest() {
      dataTast.forEach((e, i) => {
        this.fetchData.push(e);
      });
    },
    setData(data) {
      data.forEach((e, i) => {
        this.fetchData.push(e);
      });
    },
  },
  async mounted() {
    try {
      this.setDataTest();
    } catch (error) {
      this.setDataTest();
      console.log(error);
    }
  },
};
</script>
