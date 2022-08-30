<template>
  <div class="col-3 mb-lg-0 mb-4">
    <div class="card shadow">
      <div class="card-header pb-0 p-3 ps-0">
        <div class="d-flex justify-content-start align-items-center">
          <span
            class="material-icons-outlined arrow_drop_up"
            v-bind:class="customIcon"
            >{{ customIcon }}</span
          >
          <h6 class="mb-2 ms-2">{{ title }}</h6>
        </div>
      </div>
      <div>
        <table class="table report table_game mb-0" v-bind:class="customThemes">
          <tbody>
            <tr class="fw-bold text-center">
              <th v-for="(head, index) in headTable" :key="index">
                {{ head.text }}
              </th>
            </tr>
            <tr
              v-for="(data, index) in datalists"
              :key="index"
              class="text-center fw-light"
            >
              <td>{{ data.user }}</td>
              <td>{{ data.turnover | numFormat("0,0.00") }}</td>
              <td class="d-flex justify-content-center total fw-bold">
                <span
                  class="material-icons-outlined"
                  v-bind:class="customIcon"
                  >{{ customIcon }}</span
                >{{ customThemes === "reportplus" ? "+" : "-"
                }}{{ data.percent | numFormat("0,0.00") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportToday",
  props: [
    "items",
    "title",
    "customThemes",
    "customIcon",
    "topicTable1",
    "topicTable2",
  ],
  data: () => ({
    headTable: [
      {
        text: "User",
      },
      {
        text: "",
      },
      {
        text: "",
      },
    ],

    datalists: [
      {
        user: "AAAot",
        turnover: "10000",
        percent: "36611",
      },
      {
        user: "Below",
        turnover: "10500",
        percent: "32001",
      },
      {
        user: "Yosapol",
        turnover: "11000",
        percent: "27912",
      },
      {
        user: "BETinw",
        turnover: "12000",
        percent: "20511",
      },
      {
        user: "990qw_11",
        turnover: "13000",
        percent: "17386",
      },
      {
        user: "22_Rew",
        turnover: "13000",
        percent: "17386",
      },
      {
        user: "SAZZ01",
        turnover: "13000",
        percent: "17386",
      },
      {
        user: "007James",
        turnover: "13000",
        percent: "17386",
      },
      {
        user: "Bother",
        turnover: "13000",
        percent: "17386",
      },
      {
        user: "Betman",
        turnover: "13000",
        percent: "17386",
      },
    ],
  }),
  mounted() {
    this.headTable[1].text = this.topicTable1;
    this.headTable[2].text = this.topicTable2;
  },
};
</script>
