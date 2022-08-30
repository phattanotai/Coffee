<template>
  <div>
    <Navbar navbar-page="User Information" />
    <div id="userinformation" class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-header card-header-card d-flex align-items-center bg-gray-90"
            >
              <div class="w-60">
                <h5 class="mb-0">User Information / ข้อมูลผู้เล่น</h5>
              </div>
              <div class="w-40 d-flex align-items-center justify-content-end">
                <vs-input
                  @input.native="searchUser"
                  @keypress.enter="fetchData"
                  class="input--search w-100"
                  icon-no-border
                  icon="search"
                  v-model="input_searchUser"
                />
              </div>
            </div>
            <div class="card-body card--scroll">
              <div class="card-Tableuserinformation">
                <div
                  v-if="input_searchUser != ''"
                  class="row text-center fw-bolder text-dark font-montserrat"
                >
                  <div class="col-2">Upline</div>
                  <div class="col-2">User</div>
                  <div class="col-2">Credit</div>
                  <div class="col-2">Status</div>
                  <div class="col-4">Action</div>
                </div>
                <div class="text-center mt-3">
                  <div
                    v-for="(user, index) in userlist"
                    :key="index"
                    class="row shadow card--information border mb-3"
                  >
                    <div class="col-2 p-3 border-end">{{ user.upline }}</div>
                    <div class="col-2 p-3 border-end">{{ user.username }}</div>
                    <div class="col-2 p-3 border-end">
                      {{ user.credit | numFormat("0,0.00") }}
                    </div>
                    <div
                      :class="user.status"
                      class="col-2 p-3 status d-flex justify-content-center align-items-center border-end"
                    >
                      <span class="material-icons status">circle</span>Active
                    </div>
                    <div class="col-4 p-3 d-flex align-items-center">
                      <div
                        v-for="(active, index) in activelist"
                        :key="index"
                        class="card-fontActive w-25"
                        :class="{
                          active: selectActive == active.title + ',' + user.i,
                        }"
                        vs-type="flex"
                        vs-justify="center"
                        vs-align="center"
                        vs-w="3"
                      >
                        <div
                          @click="
                            (selectActive = active.title + ',' + user.i),
                              getuser(active.title, user)
                          "
                        >
                          {{ active.title }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <vs-pagination
                    :total="pageCount"
                    :max="7"
                    v-model="currentPage"
                    prev-icon="arrow_back"
                    next-icon="arrow_forward"
                    @change="changePage"
                  ></vs-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/layout/Navbar";
import notifyService from "../../service/notifyService";

import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Userinformation",
  components: {
    Navbar,
  },
  data: () => ({
    bg_headerCard: "",
    title: "",
    tableReport: "",
    tableCredit: "",
    tableTop: "",
    tableLogs: "",
    input_searchUser: "",
    debounce: null,
    pageCount: 1,
    currentPage: 1,
    activelist: [
      {
        i: 1,
        title: "Report",
      },
      {
        i: 2,
        title: "Credit Logs",
      },
      {
        i: 3,
        title: "Top Up Logs",
      },
      {
        i: 4,
        title: "Logs",
      },
    ],
    users: [],

    selectActive: "",
  }),

  methods: {
    ...mapActions("UserInfo", [
      "setUser",
      "setDate",
      "setWithDate",
      "fetchUserInfo",
      "setPage",
    ]),
    openLoading() {
      this.$vs.loading({
        type: "default",
      });
    },
    closeLoading() {
      this.$vs.loading.close();
    },
    changePage() {
      // this.fetchData();
    },
    async getuser(t, i) {
      this.clearlist();
      this.title = t;
      this.setUser(i.username);
      setTimeout(() => {
        document.getElementById("gethub").scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 1000);
      if (t == "Report") {
        this.bg_headerCard = "bg_headerCard-Report";
        this.title =
          t + ` : <span class="small fw-light">` + i.username + `</span>`;
        this.tableReport = true;
        if (this.$refs.UserReport) {
          this.$refs.UserReport.changePage(1);
        }
      }
      if (t == "Credit Logs") {
        this.bg_headerCard = "bg_headerCard-Credit";
        this.tableCredit = true;
        if (this.$refs.UserCreditLog) {
          this.$refs.UserCreditLog.changePage(1);
        }
      }
      if (t == "Top Up Logs") {
        this.bg_headerCard = "bg_headerCard-Top";
        this.tableTop = true;
        if (this.$refs.UserTopUpLog) {
          this.$refs.UserTopUpLog.changePage(1);
        }
      }
      if (t == "Logs") {
        this.bg_headerCard = "bg_headerCard-Logs";
        this.tableLogs = true;
        if (this.$refs.UserInfoLog) {
          this.$refs.UserInfoLog.changePage(1);
        }
      }
    },
    clearlist() {
      this.bg_headerCard = "";
      this.title = "";
      this.tableReport = "";
      this.tableCredit = "";
      this.tableTop = "";
      this.tableLogs = "";
    },
    searchUser(e) {
      this.selectActive = "";
      this.clearlist();
    },
    async fetchData() {
      try {
        this.openLoading();
        this.users = [];
        const data = {
          searchData: this.input_searchUser,
          perPage: 20,
          currentPage: this.currentPage,
        };
        await this.fetchUserInfo(data);
        if (this.getUserInfo.data.length) {
          for (const user of this.getUserInfo.data) {
            this.users.push({
              i: user.id,
              upline: user.attributes.upline,
              username: user.attributes.user,
              credit: user.attributes.credit,
              status: user.attributes.status,
            });
          }
        }
        this.currentPage = this.getUserInfo.meta.pagination.page;
        this.pageCount = this.getUserInfo.meta.pagination.pageCount;
        this.closeLoading();
      } catch (error) {
        this.closeLoading();
        notifyService.error(error.message);
      }
    },
    setDefaultDate() {
      const date = new Date();
      const y = new Date(new Date().setDate(new Date().getDate() - 1));
      const yesterday = moment(y).format("YYYYMMDDTHHmmss");
      const input_date = moment(date).format("YYYYMMDDTHHmmss");
      this.setDate({
        startDate: yesterday,
        endDate: input_date,
      });
    },
  },
  computed: {
    ...mapGetters("UserInfo", ["getUserReport"]),
    userlist() {
      return this.users.filter((list) => {
        return list.username
          .toLowerCase()
          .includes(this.input_searchUser.toLowerCase());
      });
    },
  },
  mounted() {
    // // this.setDefaultDate();
    // this.setWithDate(true);
    // this.setPage({
    //   perPage: 30,
    //   pageCount: 1,
    // });
  },
};
</script>
<style>
#userinformation .vs-pagination--li {
  width: 35px;
  height: 30px;
}

#userinformation .vs-pagination--buttons {
  width: 35px;
  height: 30px;
}

#userinformation .vs-pagination--ul {
  margin-bottom: 0px;
}
</style>
