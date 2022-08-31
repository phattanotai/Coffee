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
                  class="row text-center fw-bolder text-dark font-montserrat"
                >
                  <div class="col-2">Id</div>
                  <div class="col-2">User</div>
                  <div class="col-2">Username</div>
                  <div class="col-2">Role</div>
                  <div class="col-4">Action</div>
                </div>
                <div class="text-center mt-3">
                  <div
                    v-for="(user, index) in userlist"
                    :key="index"
                    class="row shadow card--information border mb-3"
                  >
                    <div class="col-2 p-3 border-end">{{ user.id }}</div>
                    <div class="col-2 p-3 border-end">{{ user.name }}</div>
                    <div class="col-2 p-3 border-end">
                      {{ user.username }}
                    </div>
                    <div class="col-2 p-3 border-end">
                      {{ user.role }}
                    </div>
                    <div class="col-4 p-3 d-flex align-items-center"></div>
                  </div>
                  <!-- <vs-pagination
                    :total="pageCount"
                    :max="7"
                    v-model="currentPage"
                    prev-icon="arrow_back"
                    next-icon="arrow_forward"
                    @change="changePage"
                  ></vs-pagination> -->
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
import userInfoService from "../../service/userInfoService";

export default {
  name: "Userinformation",
  components: {
    Navbar,
  },
  data: () => ({
    input_searchUser: "",
    debounce: null,
    pageCount: 1,
    currentPage: 1,
    users: [],
  }),

  methods: {
    openLoading() {
      this.$vs.loading({
        type: "default",
      });
    },
    closeLoading() {
      this.$vs.loading.close();
    },
    searchUser(e) {
      this.selectActive = "";
    },
    async fetchData() {
      try {
        this.openLoading();
        this.users = await userInfoService.getUserReport();
        this.closeLoading();
      } catch (error) {
        this.closeLoading();
        notifyService.error(error.message);
      }
    },
  },
  computed: {
    userlist() {
      return this.users.filter((list) => {
        return list.username
          .toLowerCase()
          .includes(this.input_searchUser.toLowerCase());
      });
    },
  },
  mounted() {
    this.fetchData();
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
