<template>
  <div>
    <Navbar navbar-page="Bills & Orders" />
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-header card-header-card d-flex align-items-center bg-gray-90"
            >
              <div class="w-30 text-center">
                <h5 class="mb-0">Bills</h5>
              </div>
              <div class="w-30 text-center">
                <h5 class="mb-0">Orders</h5>
              </div>
              <div class="w-40 d-flex align-items-center justify-content-end">
                <vs-button
                  :disabled="btnDisabled"
                  @click="btnpopupDelete(clickedItem.index)"
                  :class="selectDel"
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
              <div class="card-Tableprovider">
                <div class="d-flex d-flex align-items-top header">
                  <div class="w-30 border-end">
                    <!-- <Tablegameprovidercomponent
                      @clickedItem="getClickedItem"
                      :listprovider="list"
                      :gamelists="gamelists"
                    /> -->
                  </div>
                  <div class="w-30 border-end">
                    <!-- <Tablegamelistcomponent
                      :datalists="lists"
                      :valueProvide="clickedItem"
                      @clickedItem="getClickedItem"
                    /> -->
                  </div>
                  <div class="w-40 position-relative">
                    <!-- <Tagscomponent
                      v-if="clickedItem"
                      :valueTag="clickedItem.type"
                      :actionDel="actionDel"
                      :valueData="clickedItem.game"
                      :valueImg="clickedItem.img"
                      :listprovider="listprovider"
                      :listgame="lists"
                      :bbrand="clickedItem"
                    /> -->
                  </div>
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
    />
  </div>
</template>

<script>
import Navbar from "@/layout/Navbar";
import Deletecomponent from "@/layout/Popup/DeleteForm";
import TableBillcomponent from "./TableBills.vue";
import TableOrdercomponent from "./TableOrder.vue";
import Tagscomponent from "./Tags";

export default {
  name: "billOrder",
  components: {
    Navbar,
    Deletecomponent,
    TableBillcomponent,
    TableOrdercomponent,
    Tagscomponent,
  },
  data: () => ({
    clickedItem: "",
    clickedTag: "",
    valueTag: "",
    valueData: "",
    valueImg: "",
    lists: [],
    idDel: "",
    openDelModal: "",
    selectDel: "",
    actionDel: "",
    btnDisabled: true,
    listprovider: [],
    gamelists: [],
    isLoading: false,
  }),
  computed: {},
  methods: {
    getClickedItem(value) {},

    btnpopupDelete(index) {
      this.idDel = index;
      this.openDelModal = !this.openDelModal;
    },
    async getdeleterItem(index) {},
  },
  async mounted() {},
};
</script>
