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
          v-model="listUserTopUp"
          :name="name"
          :pageCount="getPage.pageCount"
          :perPage="getPage.perPage"
          :currentPage="getPage.currentPage"
          @changePage="changePage"
        >
          <template v-slot:table-body>
            <tbody v-if="paginated(name).length > 0">
              <tr class="fw-bold text-center">
                <th
                  class="py-3"
                  v-for="(head, index) in headtableTop"
                  :key="index"
                >
                  {{ head.text }}
                </th>
              </tr>
              <tr
                v-for="(data, index) in paginated(name)"
                :key="index"
                class="text-center fw-light"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ data.time }}</td>
                <td>{{ data.before | numFormat("0,0.00") }}</td>
                <td class="fw-bold">
                  <span v-if="data.quantity < 0" class="text-danger">{{
                    data.quantity | numFormat("0,0.00")
                  }}</span>
                  <span v-else class="text-success"
                    >+{{ data.quantity | numFormat("0,0.00") }}</span
                  >
                </td>
                <td>{{ data.after | numFormat("0,0.00") }}</td>
                <td>{{ data.by }}</td>
                <td>{{ data.ip }}</td>
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
  name: "UserTopUpLog",
  components: { CustomPagination, SearchCard },
  props: ["userId", "title", "headerCard"],
  data() {
    return {
      name: "listUserTopUp",
      paginate: [],
      inputSearch: "",
      headtableTop: [
        {
          text: "#",
        },
        {
          text: "เวลา",
        },
        {
          text: "ก่อน",
        },
        {
          text: "จำนวน",
        },
        {
          text: "หลัง",
        },
        {
          text: "โดย",
        },
        {
          text: "IP",
        },
      ],
      listLogs: [
        // {
        //   time: "04/03/2022 10:08:16",
        //   before: 800.86,
        //   quantity: -100,
        //   after: 700.86,
        //   notes: "SEXYBCRTBAC-31552902233",
        //   by: "BBEEcc123",
        //   ip: "165.22.56.67",
        // },
      ],
    };
  },
  methods: {
    ...mapActions("UserInfo", ["fetchUserTopUpLog", "setDate", "setPage"]),
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
        this.listLogs = [];
        await this.fetchUserTopUpLog();
        setTimeout(() => {
          if (this.getUserTopUpLog) {
            for (const log of this.getUserTopUpLog) {
              this.listLogs.push({
                time: log.attributes.updatedAt,
                before: log.attributes.before,
                quantity: log.attributes.amount,
                after: log.attributes.after,
                by: log.attributes.by,
                ip: log.attributes.ip,
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
    ...mapGetters("UserInfo", ["getUserTopUpLog", "getPage"]),
    listUserTopUp() {
      return this.listLogs.filter((listcredit) => {
        return (
          listcredit.by
            .toLowerCase()
            .includes(this.inputSearch.toLowerCase()) ||
          listcredit.ip.toLowerCase().includes(this.inputSearch.toLowerCase())
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
