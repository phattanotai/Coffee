<template>
  <div>
    <SearchCard
      :headerCard="headerCard"
      :title="title"
      v-model="inputSearch"
      @returnDate="returnDate"
      @onSearch="changePage"
    >
      <template v-slot:body>
        <CustomPagination
          @setPaginate="setPaginate"
          tableClass="table--stripedOdd table--hover mb-0 text-black align-middle"
          v-model="listUserReport"
          :name="name"
          :pageCount="getPage.pageCount"
          :perPage="getPage.perPage"
          :currentPage="getPage.currentPage"
          @changePage="changePage"
        >
          <template v-slot:table-body>
            <tbody v-if="paginated(name).length > 0">
              <tr class="fw-bold text-center bg-gray-90">
                <th
                  rowspan="2"
                  v-for="(head, index) in headtableReport"
                  :key="index"
                >
                  {{ head.text }}
                </th>
                <th colspan="3">Member</th>
              </tr>
              <tr class="bg-gray-90">
                <th class="bg-gray-e4 text-center">W/L</th>
                <th class="bg-gray-e4 text-center">com</th>
                <th class="bg-gray-e4 text-center">Total</th>
              </tr>
              <tr
                v-for="(data, index) in listUserReport"
                :key="index"
                class="text-center fw-light"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ data.time }}</td>
                <td>{{ data.game }}</td>
                <td>{{ data.detail }}</td>
                <td>{{ data.turnover | numFormat("0,0.00") }}</td>
                <td>
                  {{ data.vaildamount | numFormat("0,0.00") }}
                </td>
                <td class="fw-bold">
                  <span v-if="data.wl < 0" class="text-danger">{{
                    data.wl | numFormat("0,0.00")
                  }}</span>
                  <span v-else class="text-success"
                    >+{{ data.wl | numFormat("0,0.00") }}</span
                  >
                </td>
                <td>{{ data.com | numFormat("0,0.00") }}</td>
                <td class="fw-bold">
                  <span v-if="data.total < 0" class="text-danger">{{
                    data.total | numFormat("0,0.00")
                  }}</span>
                  <span v-else class="text-success"
                    >+{{ data.total | numFormat("0,0.00") }}</span
                  >
                </td>
              </tr>
            </tbody>
            <div class="nodata" v-if="paginated(name).length <= 0">
              <p>ไม่พบข้อมูล</p>
            </div>
          </template>
        </CustomPagination>
      </template>
    </SearchCard>
  </div>
</template>
<script>
import CustomPagination from "../../layout/Components/CustomPagination.vue";
import notifyService from "../../service/notifyService";
import SearchCard from "./SearchCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserReport",
  components: { CustomPagination, SearchCard },
  props: ["userId", "title", "headerCard"],
  data() {
    return {
      name: "listUserReport",
      paginate: [],
      inputSearch: "",
      headtableReport: [
        {
          text: "#",
        },
        {
          text: "เวลา",
        },
        {
          text: "เกม",
        },
        {
          text: "รายละเอียด",
        },
        {
          text: "Turnover",
        },
        {
          text: "Vaild Amount",
        },
      ],

      listReport: [
        // {
        //   time: "04/03/2022 10:08:16",
        //   game: "sexy",
        //   detail:
        //     "BAC-31552831529 | BaccaratClassic 800.86 0.00 0.00 0.00 0.00",
        //   turnover: 800.86,
        //   vaildamount: 0,
        //   wl: 700.86,
        //   com: 0,
        //   total: -100,
        // },
      ],
    };
  },
  methods: {
    ...mapActions("UserInfo", ["fetchUserReport", "setDate", "setPage"]),
    openLoading() {
      this.$vs.loading({
        type: "default",
      });
    },
    closeLoading() {
      this.$vs.loading.close();
    },
    changePage(e) {
      this.setPage({
        currentPage: e,
      });
      setTimeout(() => {
        this.fetchData();
      }, 100);
    },
    setPaginate(paginate) {
      this.paginate = paginate;
    },
    returnSearch(e) {
      this.inputSearch = e;
    },
    returnDate(e) {
      this.startDate = e.startDate;
      this.endDate = e.endDate;
      this.setDate(e);
    },
    async fetchData() {
      try {
        this.openLoading();
        this.listReport = [];
        await this.fetchUserReport();
        setTimeout(() => {
          if (this.getUserReport) {
            for (const log of this.getUserReport) {
              this.listReport.push({
                time: log.attributes.logTime,
                game: log.attributes.game,
                detail: log.attributes.description,
                turnover: log.attributes.turnover,
                vaildamount: log.attributes.vaildAmount,
                wl: log.attributes.winAndLoss,
                com: log.attributes.com,
                total: log.attributes.total,
              });
            }
          }
          this.closeLoading();
        }, 100);
      } catch (error) {
        this.closeLoading();
        notifyService.error(error.message);
      }
    },
  },

  computed: {
    ...mapGetters("UserInfo", ["getUserReport", "getPage"]),
    listUserReport() {
      return this.listReport.filter((listreport) => {
        return (
          listreport.game
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase()) ||
          listreport.detail
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase())
        );
      });
    },
  },
};
</script>
<style>
.nodata {
  text-align: center;
  margin-top: 28px;
  color: red;
}
</style>
