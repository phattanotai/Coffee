<template>
  <div>
    <Navbar navbar-page="Announcement" />
    <div id="announcement" class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-header card-header-card d-flex align-items-center bg-gray-90"
            >
              <div class="w-50">
                <h5 class="mb-0">Category</h5>
              </div>
              <div class="w-50 d-flex align-items-center justify-content-end">
                <vs-button
                  @click="btnOpenAddModal"
                  class="btn-addnew"
                  color="primary"
                  type="filled"
                >
                  <span class="material-icons"> add </span> Add New</vs-button
                >
                <vs-button
                  @click="check.length > 0 ? btnpopupDeleteAll(check) : ''"
                  class="btn-delete-card d-flex align-items-center justify-content-center"
                  radius
                  color="rgb(173, 173, 173)"
                  type="filled"
                  :class="{ 'active-select-provider': check.length > 0 }"
                >
                  <img
                    :src="require(`@/assets/images/trash_light.png`)"
                    class="w-100"
                  />
                </vs-button>
              </div>
            </div>
            <div class="card-body card--scroll">
              <div>
                <table
                  class="table table--striped table--hover table-Announcement mb-0"
                >
                  <tr class="text-center">
                    <th>Name</th>
                    <th>วันที่สร้าง</th>
                    <th>วันที่แก้ไข</th>
                    <th></th>
                  </tr>
                  <tr
                    v-for="(data, index) in datalists"
                    :key="index"
                    class="text-center border-0"
                  >
                    <td class="text-start p-1 notify">
                      <h6 class="mb-0 p-0">{{ data.id }} {{ data.name }}</h6>
                    </td>
                    <td class="time">
                      {{ data.createAt }}
                    </td>
                    <td class="create">
                      {{ data.updateAt }}
                    </td>
                    <td>
                      <span class="me-2 edit cursor-pointer">
                        <img
                          :src="require(`@/assets/images/edit.png`)"
                          class="icon cursor-pointer"
                        />
                        แก้ไข</span
                      >
                      <img
                        :src="require(`@/assets/images/trash.png`)"
                        class="icon cursor-pointer"
                      />
                    </td>
                  </tr>
                </table>

                <div
                  v-if="datalists.length == 0 && !isLoading"
                  class="text-center w-100 mt-3"
                >
                  <h4 class="text-danger fw-light">ไม่พบรายการ</h4>
                </div>
                <!-- loading -->
                <div v-if="isLoading" class="text-center w-100 mt-3">
                  <svg class="loading-spinner">
                    <circle
                      :cx="circlePositions[index] && circlePositions[index].x"
                      :cy="circlePositions[index] && circlePositions[index].y"
                      :r="item.radius"
                      :fill="item.color"
                      v-for="(item, index) in circles"
                      :key="index"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Deletecomponent
      :valueId="idDel"
      :openDelModal="this.openDelModal"
      @Item="getdeleterItem"
      :onDelete="this.onDelete"
    />
  </div>
</template>

<script>
import Navbar from "@/layout/Navbar";
import Completecomponent from "@/layout/Popup/Complete";
import Failcomponent from "@/layout/Popup/Fail";
import Deletecomponent from "@/layout/Popup/DeleteForm";

import categoryService from "../../service/categoryService";

export default {
  name: "Category",
  components: {
    Navbar,
    Completecomponent,
    Failcomponent,
    Deletecomponent,
  },
  data: () => ({
    datalists: [],
    item: {},
    idDel: "",
    isLoading: false,
    openAddModal: false,
    Item: "",
    check: [],
  }),

  computed: {
    lists() {
      return this.datalists;
    },
  },
  created() {},

  methods: {
    onDelete() {},
    btnOpenAddModal() {
      this.openAddModal = !this.openAddModal;
    },
    getdeleterItem() {},
    openDelModal() {},
  },
  async mounted() {
    this.datalists = await categoryService.getCategory();
  },
};
</script>

<style>
.loading-spinner {
  width: 100px;
  height: 100px;
}
</style>
