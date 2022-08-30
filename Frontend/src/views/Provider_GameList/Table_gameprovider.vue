<template>
  <div>
    <div class="px-3 mb-4">
      <vs-button
        @click="
          $emit('clickedItem', {
            game: 'add',
            type: 'provider',
            index: '',
            img: require(`@/assets/images/mockup.jpg`),
          })
        "
        class="btn-addnew w-100"
        color="primary"
        type="filled"
        ><span class="material-icons"> add </span> Add New Provider</vs-button
      >
      <vs-input
        class="input--search w-100 mt-4"
        icon-no-border
        icon="search"
        placeholder="ค้นหาค่ายเกม"
        v-model="input_searchCamp"
      />
    </div>
    <div class="mt-4 card--scroll">
      <table class="table align-middle table--striped table--hover mb-0">
        <tbody>
          <tr
            v-for="(data, index) in datalists"
            :key="index"
            class="pointer"
            :class="{ opacity_dis: data.status == 'danger' }"
            @click="
              getList(data.attributes.title),
                $emit('clickedItem', {
                  game: data,
                  type: 'provider',
                  index: index,
                  img: data.img,
                  lists,
                })
            "
          >
            <td
              class="d-flex align-items-center justify-content-center"
              :class="{ hot: 2 == data.attributes.status }"
            >
              <div
                class="card--logo d-flex align-items-center justify-content-center"
              >
                <img
                  :src="data.attributes.logo"
                  class="w-80"
                  :alt="data.game"
                />
              </div>
            </td>
            <td class="name-games">
              {{ data.attributes.title }}
            </td>
            <td class="type-games fst-italic">
              <div class="provider" :class="[data.attributes.status]">
                {{ data.attributes.status }}
              </div>
            </td>
            <td class="status" :class="data.attributes.status">
              <span class="small material-icons status">circle</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Completecomponent from "@/layout/Popup/Complete";
import Failcomponent from "@/layout/Popup/Fail";

export default {
  name: "Table_gameprovider",
  props: ["listprovider", "gamelists"],
  components: {
    Completecomponent,
    Failcomponent,
  },
  data: () => ({
    input_searchCamp: "",
    classCustom: "",
  }),
  methods: {
    async getList(brand) {
      this.lists = [];
      this.listprovider.map((value, index) => {
        value.attributes.gamelist &&
          value.attributes.gamelist.map((item) => {
            if (value.attributes.title === brand) {
              this.lists.push({
                game: item.game,
                type: item.type,
                status: item.status,
                img: item.img,
                brand: item.brand,
                tag: item.tag,
              });
            }
          });
      });
    },
  },
  computed: {
    datalists() {
      return this.listprovider.filter((list) => {
        return list.attributes?.title
        .toLowerCase()
        .includes(this.input_searchCamp);
      });
    },
  },
};
</script>
