<template>
  <div id="sidebarPromotion">
    <div class="pe-4 mb-4">
      <vs-button
        @click="
          $emit('clickedItem', {
            pro: 'add',
            index: '',
            img: require(`@/assets/images/Promotions/mockup.png`),
          })
        "
        class="btn-addnew w-100"
        color="primary"
        type="filled"
        ><span class="material-icons"> add </span> Add New Promotion</vs-button
      >
      <vs-input
        class="input--search w-100 mt-4"
        icon-no-border
        icon="search"
        placeholder="ค้นหาโปรโมชัน"
        v-model="input_searchPromotion"
        @keyup="onLoading"
      />
    </div>
    <div class="mt-4 card--scroll">
      <TablePagination @setPaginate="setPaginate" v-model="lists" :name="name">
        <template v-slot:table-head>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
        </template>
        <template v-slot:table-body>
          <tbody>
            <tr
              v-for="(data, index) in paginated(name)"
              :key="index"
              @click="
                $emit('clickedItem', {
                  pro: data,
                  index: index,
                  img: data.img,
                })
              "
            >
              <td>
                <img
                  :src="data.img"
                  :alt="data.promotion"
                  class="w-100 rounded-2"
                />
              </td>
              <td class="text-wrap small fw-light">
                {{ data.promotion }}
              </td>
              <td class="status" :class="data.status ? 'success' : 'disable'">
                <span class="small material-icons status">circle</span>
              </td>
            </tr>
          </tbody>
        </template>
      </TablePagination>

      <!-- <CustomPagination
        @setPaginate="setPaginate"
        v-model="lists"
        :name="name"
        :pageTotal="pageTotal"
        :pageCount="pageCount"
        :perPage="perPage"
        :currentPage="currentPage"
        @changePage="changePage"
      >
        <template v-slot:table-head>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
        </template>
        <template v-slot:table-body>
          <tbody>
            <tr
              v-for="(data, index) in paginated(name)"
              :key="index"
              @click="
                $emit('clickedItem', {
                  pro: data,
                  index: index,
                  img: data.img,
                })
              "
            >
              <td>
                <img
                  :src="data.img"
                  :alt="data.promotion"
                  class="w-100 rounded-2"
                />
              </td>
              <td class="text-wrap small fw-light">
                {{ data.promotion }}
              </td>
              <td class="status" :class="data.status ? 'success' : 'disable'">
                <span class="small material-icons status">circle</span>
              </td>
            </tr>
          </tbody>
        </template>
      </CustomPagination> -->

      <div v-if="msg" class="d-flex justify-content-center">
        <p class="small text-danger mb-0 mt-2">
          {{ msg }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import TablePagination from "../../layout/Components/TablePagination.vue";
import CustomPagination from "../../layout/Components/CustomPagination.vue";
export default {
  name: "sidebarPromotion",
  components: {
    TablePagination,
    CustomPagination,
  },
  props: ["datalists", "pageTotal", "currentPage", "perPage", "pageCount"],
  data: () => ({
    input_searchPromotion: "",
    msg: "",
    name: "paginate-items",
    paginate: [],
  }),
  methods: {
    changePage(e) {
      this.$emit("changePage", e);
    },
    setPaginate(paginate) {
      this.paginate = paginate;
    },
    onLoading(e) {
      if (this.lists.length) {
        this.msg = "";
        if (this.input_searchPromotion) {
          this.$vs.loading({
            type: "default",
          });
          setTimeout(() => {
            this.$vs.loading.close();
          }, 500);
        }
      } else {
        this.msg = "ไม่พบข้อมูล";
      }
    },
  },
  computed: {
    lists() {
      return this.datalists.filter((list) => {
        return list.promotion
          .toLowerCase()
          .includes(this.input_searchPromotion.toLowerCase());
      });
    },
  },
};
</script>
<style>
#sidebarPromotion .page-item .page-link,
.page-item span {
  width: 20px;
  height: 20px;
  font-size: 15;
  cursor: pointer;
}
</style>
