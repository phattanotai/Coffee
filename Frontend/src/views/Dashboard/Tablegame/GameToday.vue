<template>
  <div class="col-3 mb-lg-0 mb-4">
    <div class="card shadow">
      <div class="card-header pb-0 p-3 ps-0">
        <div class="d-flex justify-content-start align-items-center">
          <span class="material-icons-outlined" v-bind:class="customThemes">{{
            customThemes !== "gameMuchtoday" ? customThemes : ""
          }}</span>
          <h6 class="ms-2">{{ title }}</h6>
        </div>
      </div>
      <div>
        <table
          class="table table--striped table--hover table_game mb-0"
          v-bind:class="customThemes"
        >
          <tbody>
            <tr v-for="(data, index) in datalists" :key="index">
              <td>
                <h6>{{ data.game }}</h6>
                <p>{{ data.camp }}</p>
              </td>
              <td
                class="d-flex justify-content-end align-items-center total fw-bold"
                v-bind:class="customThemes"
              >
                <span
                  class="material-icons-outlined"
                  v-bind:class="customThemes"
                  >{{
                    customThemes !== "gameMuchtoday" ? customThemes : ""
                  }}</span
                >+{{ data.total | numFormat("0,0.00") }}
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
  name: "Gametoday",
  props: ["items", "title", "customThemes"],
  data: () => ({
    datalists: [
      {
        game: "Chinese Boss",
        camp: "Big Gaming",
        total: "51866",
      },
      {
        game: "Golden Panther",
        camp: "Big Gaming",
        total: "478231",
      },
      {
        game: "Aladin",
        camp: "Big Gaming",
        total: "44881",
      },
      {
        game: "888 Dragon",
        camp: "Big Gaming",
        total: "40912",
      },
      {
        game: "Three Little Pig",
        camp: "Big Gaming",
        total: "35122",
      },
    ],
  }),
};
</script>
