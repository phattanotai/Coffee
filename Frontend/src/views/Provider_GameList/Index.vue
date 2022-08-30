<template>
  <div>
    <Navbar navbar-page="Provider & Game List" />
    <div id="providerGamelist" class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-header card-header-card d-flex align-items-center bg-gray-90"
            >
              <div class="w-30 text-center">
                <h5 class="mb-0">Game Provider / ค่ายเกม</h5>
              </div>
              <div class="w-30 text-center">
                <h5 class="mb-0">Game List / เกมทั้งหมด</h5>
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
                    <Tablegameprovidercomponent
                      @clickedItem="getClickedItem"
                      :listprovider="list"
                      :gamelists="gamelists"
                    />
                  </div>
                  <div class="w-30 border-end">
                    <Tablegamelistcomponent
                      :datalists="lists"
                      :valueProvide="clickedItem"
                      @clickedItem="getClickedItem"
                    />
                  </div>
                  <div class="w-40 position-relative">
                    <Tagscomponent
                      v-if="clickedItem"
                      :valueTag="clickedItem.type"
                      :actionDel="actionDel"
                      :valueData="clickedItem.game"
                      :valueImg="clickedItem.img"
                      :listprovider="listprovider"
                      :listgame="lists"
                      :bbrand="clickedItem"
                    />
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
import Tablegameprovidercomponent from "@/views/Provider_GameList/Table_gameprovider";
import Tablegamelistcomponent from "@/views/Provider_GameList/Table_gamelist";
import Tagscomponent from "@/views/Provider_GameList/Tags";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "providerGamelist",
  components: {
    Navbar,
    Deletecomponent,
    Tablegameprovidercomponent,
    Tablegamelistcomponent,
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
  computed: {
    ...mapGetters("gameListAndProvider", ["getGameProviderList"]),
    list() {
      return (this.listprovider = this.getGameProviderList);
    },
  },
  methods: {
    ...mapActions("gameListAndProvider", [
      "fetchAllGameProviderList",
      "deleteGameProviderList",
      "updateGameProviderList",
    ]),
    getClickedItem(value) {
      this.selectProvider = value;
      this.clickedItem = "";
      this.actionDel = true;
      this.btnDisabled = false;
      setTimeout(() => {
        this.clickedItem = value;
        if (value.game != "add") {
          if (value.type == "provider") {
            this.selectDel = "active-select-provider";
            (this.lists = []),
              this.clickedItem.lists.forEach((value, index) => {
                this.lists.push({
                  i: value.i,
                  game: value.game,
                  type: value.type,
                  status: value.status,
                  img: value.img,
                  brand: value.brand,
                  tag: value.tag,
                });
              });
          } else {
            this.selectDel = "active-select-game";
          }
        }
      }, 1);
    },
    getClickedTag(value) {
      this.clickedTag = value;
    },
    btnpopupDelete(index) {
      this.idDel = index;
      this.openDelModal = !this.openDelModal;
    },
    async getdeleterItem(index) {
      var providerList;
      var gameList;

      if (this.clickedItem.type == "provider") {
        providerList = this.listprovider;
        const provider = providerList.splice(index, 1);
        if (provider) {
          this.deleteGameProviderList(provider[0].id);
          await this.fetchAllGameProviderList();
          this.listprovider =
            this.$store.state.gameListAndProvider.gameListAndProvider;
        }
        this.$vs.notify({
          text: `ลบรายการเรียบร้อย`,
          color: "success",
          position: "top-right",
        });
      } else {
        providerList = this.listprovider;
        gameList = this.lists;
        const game = gameList.splice(index, 1);

        const provider = providerList.filter(
          (item) => game[0].brand == item.attributes.title
        );

        console.log("provider: ", provider);
        if (provider[0]) {
          const data = {
            title: provider[0].attributes.title,
            tag: provider[0].attributes.tag,
            logo: provider[0].attributes.logo,
            status: provider[0].attributes.status,
            open_start_time: provider[0].attributes.open_start_time,
            open_end_time: provider[0].attributes.open_end_time,
            isOpen: provider[0].attributes.isOpen,
            gamelist: gameList,
          };
          console.log("data: ", data);
          // update provider game list here !
          await this.updateGameProviderList({ id: provider[0].id, data: data });
          // this.datalists = await this.fetchAllGameProviderList();
        }
      }
      this.selectDel = "";
      this.actionDel = false;
      this.btnDisabled = true;
      this.valueTag = "undefined";
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchAllGameProviderList();
    this.listprovider =
      this.$store.state.gameListAndProvider.gameListAndProvider;
    this.isLoading = false;
  },
};
</script>
