<template>
  <div id="promotionList">
    <Navbar navbar-page="Promotion List" />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-header card-header-card d-flex align-items-center bg-gray-90"
            >
              <div class="w-50">
                <h5 class="mb-0">Promotion List / โปรโมชันต่างๆ</h5>
              </div>
              <div
                v-if="clickedItem != ''"
                class="w-50 d-flex align-items-center justify-content-end"
              >
                <vs-button
                  v-if="clickedItem.pro != 'add'"
                  @click="btnpopupDelete(clickedItem.pro.id)"
                  :class="{ 'active-select-provider': clickedItem.pro != '' }"
                  class="btn-delete-card d-flex align-items-center justify-content-center"
                  radius
                  color="rgb(173, 173, 173)"
                  type="filled"
                >
                  <img
                    :src="require(`@/assets/images/trash_light.png`)"
                    class="w-100"
                  />
                </vs-button>
              </div>
            </div>
            <div class="card-body card--scroll">
              <div class="d-flex align-items-top header">
                <div class="w-30 border-end">
                  <SidebarPromotioncomponent
                    :datalists="datalists"
                    @clickedItem="getClickedItem"
                    :pageTotal="pageTotal"
                    :perPage="perPage"
                    :currentPage="currentPage"
                    :pageCount="pageCount"
                    @changePage="changePage"
                  />
                </div>
                <div v-if="clickedItem != ''" class="w-70 position-relative">
                  <ContentPromotioncomponent
                    :valueData="clickedItem.pro"
                    :valueImg="clickedItem.img"
                    @cancelForm="cancelForm"
                    @onSaveData="onSaveData"
                    :btnDisabled="btnDisabled"
                    :categoryList="categoryList"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Deletecomponent
      id="popupDelPromption"
      :valueId="idDel"
      :openDelModal="this.openDelModal"
      @Item="getdeleteItem"
    />
  </div>
</template>

<script>
import SidebarPromotioncomponent from "@/views/BeveragesList/Sidebar";
import ContentPromotioncomponent from "@/views/BeveragesList/Content";
import Deletecomponent from "@/layout/Popup/DeleteForm";
import Navbar from "@/layout/Navbar";
import alertService from "../../service/alertService";
import notifyService from "../../service/notifyService";
import beveragesService from "../../service/beveragesService";
import categoryService from "../../service/categoryService";
import { URL_ENDPOINT } from "../../service/http-client";

export default {
  name: "promotionList",
  components: {
    Navbar,
    SidebarPromotioncomponent,
    ContentPromotioncomponent,
    Deletecomponent,
  },
  data: () => ({
    clickedItem: "",
    valueData: "",
    valueImg: "",
    idDel: "",
    openDelModal: "",
    datalists: [],
    btnDisabled: false,
    categoryList: [],
    pageTotal: 6,
    perPage: 1000,
    currentPage: 1,
    pageCount: 10,
  }),
  methods: {
    // cancelForm and emit from ContentPromotioncomponent
    cancelForm() {
      this.clickedItem = "";
    },
    // selete promotion and emit from SidebarPromotioncomponent
    getClickedItem(value) {
      this.clickedItem = "";
      setTimeout(() => (this.clickedItem = value), 1);
    },
    btnpopupDelete(index) {
      this.idDel = index;
      this.openDelModal = !this.openDelModal;
    },
    // getdeleterItem emit from Deletecomponent
    async getdeleteItem(id) {
      try {
        alert(id);
        this.openLoading();
        const resData = await beveragesService
          .deleteBeverages(id)
          .catch((error) => {
            throw error;
          });
        if (resData) {
          notifyService.Success(`Delete data  Success !!`);
          // this.fetchData();
        }
      } catch (error) {
        alertService.error(error.message);
      }
      this.closeLoading();
      this.clickedItem = "";
    },
    uploadImage(fileBase64) {
      return new Promise((resolve, reject) => {
        beveragesService
          .uploadImage(fileBase64)
          .then((resUpload) => {
            if (resUpload.path) {
              resolve(resUpload.path);
            } else {
              notifyService.error("ไม่สามารถอัปโหลดรูปภาพได้ !! ");
              reject(false);
            }
          })
          .catch((error) => {
            notifyService.error("ไม่สามารถอัปโหลดรูปภาพได้ !! " + error);
            reject(error);
          });
      });
    },
    // onSaveData and emit from ContentPromotioncomponent
    async onSaveData(e) {
      try {
        this.btnDisabled = true;
        this.openLoading();
        if (e.fileBase64) {
          e.data.img = await this.uploadImage(e.fileBase64).catch((error) => {
            throw error;
          });
        }
        let resData;
        if (e.type === "add") {
          resData = await beveragesService
            .createBeverages(e.data)
            .catch((error) => {
              throw error;
            });
        } else {
          e.data.img = e.data.img.replace(`${URL_ENDPOINT}/`, "");
          resData = await beveragesService
            .updateBeverages(e.data, e.id)
            .catch((error) => {
              throw error;
            });
        }
        if (resData) {
          notifyService.Success(`Save data  Success !!`);
          this.clickedItem = "";
          this.fetchData();
        }
      } catch (error) {
        if (error.message) {
          alertService.error(error.message);
        }
      }
      setTimeout(() => {
        this.btnDisabled = false;
        this.closeLoading();
      }, 1000);
    },
    async fetchData() {
      try {
        this.datalists = await beveragesService.getBeverages();
        for (const i of this.datalists) {
          i.img = URL_ENDPOINT + "/" + i.img;
        }

        this.categoryList = await categoryService.getCategory();

        this.closeLoading();
      } catch (error) {
        this.closeLoading();
        notifyService.Error(error.message);
      }
    },
    openLoading() {
      this.$vs.loading({
        type: "default",
      });
    },
    closeLoading() {
      this.$vs.loading.close();
    },
    changePage(e) {
      this.openLoading();
      this.currentPage = e;
      this.fetchData();
    },
  },
  mounted() {
    this.openLoading();
    this.fetchData();
  },
};
</script>

<style>
#popupDelPromption .vs-popup--content {
  margin: 0;
}
/* width */
#popupDelPromption .vs-popup--content::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* Track */
#popupDelPromption .vs-popup--content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
#popupDelPromption .vs-popup--content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(99, 97, 97, 0.562);
}

/* Handle on hover */
#popupDelPromption .vs-popup--content::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>
