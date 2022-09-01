<template>
  <div>
    <Navbar navbar-page="Category" />
    <div class="container-fluid py-4">
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
                  @click="btnOpenAddModal('add')"
                  class="btn-addnew"
                  color="primary"
                  type="filled"
                >
                  <span class="material-icons"> add </span> Add New</vs-button
                >
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
                      <span
                        class="me-2 edit cursor-pointer"
                        @click="btnOpenAddModal(data)"
                      >
                        <img
                          :src="require(`@/assets/images/edit.png`)"
                          class="icon cursor-pointer"
                        />
                        แก้ไข</span
                      >
                      <img
                        @click="btnpopupDelete(data.id)"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogOption" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Categiry </v-card-title>

        <div class="formCate">
          <label class="text-black">Name</label>
          <vs-input class="inputx inputTitle w-100 mt-1" v-model="name" />
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ma-2 white--text" @click="saveData">
            บันทึก
          </v-btn>
          <v-btn color="primary" text @click="closeModal"> ปิด </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Deletecomponent
      :valueId="idCate"
      :openDelModal="openDelModal"
      @Item="onDelete"
    />
  </div>
</template>

<script>
import Navbar from "@/layout/Navbar";
import Completecomponent from "@/layout/Popup/Complete";
import Failcomponent from "@/layout/Popup/Fail";
import Deletecomponent from "@/layout/Popup/DeleteForm";
import notifyService from "../../service/notifyService";
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
    dialogOption: false,
    datalists: [],
    idCate: "",
    openDelModal: false,
    isLoading: false,
    type: "add",
    name: "",
  }),

  computed: {
    lists() {
      return this.datalists;
    },
  },
  methods: {
    btnpopupDelete(id) {
      this.idCate = id;
      this.openDelModal = !this.openDelModal;
    },
    onDelete(id) {
      categoryService.deleteCategory(id).then((res) => {
        if (res) {
          notifyService.Success(`Delete data Success !!`);
          this.fetchData();
        }
      });
    },
    saveData() {
      if (this.type === "add") {
        categoryService.createCategory({ name: this.name }).then((res) => {
          if (res) {
            notifyService.Success(`Create data Success !!`);
            this.dialogOption = false;
            this.fetchData();
          }
        });
      } else {
        categoryService
          .updateCategory({ name: this.name }, this.idCate)
          .then((res) => {
            if (res) {
              notifyService.Success(`Update data Success !!`);
              this.dialogOption = false;
              this.fetchData();
            }
          });
      }
    },
    closeModal() {
      this.dialogOption = false;
    },
    btnOpenAddModal(i) {
      this.idCate = i.id;
      this.dialogOption = true;
      if (i != "add") {
        this.type = "edit";
        this.name = i.name;
      } else {
        this.type = "add";
      }
    },
    async fetchData() {
      this.datalists = await categoryService.getCategory();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.formCate {
  width: 80%;
  margin: auto;
}
.loading-spinner {
  width: 100px;
  height: 100px;
}
</style>
