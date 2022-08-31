<template>
  <div>
    <div class="px-3 mb-4">
      <vs-button @click="lists.length != 0 ? $emit('clickedItem', {
                  game: 'add',
                  type: 'game',
                  index: '',
                  img: require(`@/assets/images/mockup.jpg`),
                  b: lists[0].brand
                }) : ''"  class="btn-addnew w-100" color="primary" type="filled"
        ><span class="material-icons"> add </span> Add New Game</vs-button
      >
      <vs-input
        class="input--search w-100 mt-4"
        icon-no-border
        icon="search"
        placeholder="ค้นหาเกม"
        v-model="input_searchGame"
      />
    </div>

    <div class="mt-4 card--scroll" v-if="valueProvide != ''">
      <table class="table align-middle table--striped table--hover mb-0">
        <tbody>
          <tr
            v-for="(data, index) in lists"
            :key="index"
            class="pointer"
            :class="{ opacity_dis: data.status == 'danger' }"
            @click="
              $emit('clickedItem', {
                game: data,
                type: 'game',
                index: index,
                img: data.img,
              })
            "
          >
            <td
              class="d-flex align-items-center justify-content-center"
              :class="{ hot: 2 == data.type }"
            >
              <img
                :src="data.img"
                class="card--logo"
                :alt="data.game"
              />
            </td>
            <td class="name-games">
              {{ data.game }}
            </td>
            <td class="type-games fst-italic">
              <div class="game--new" v-if="data.type == 1">NEW</div>
              <div class="game--hot" v-if="data.type == 2">HOT</div>
              <div class="game--promo" v-if="data.type == 3">PROMO</div>
            </td>
            <td class="status" :class="data.status">
              <span class="small material-icons status">circle</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table_gamelist",
  props: ["valueProvide", "datalists","bbrand"],
  data: () => ({
    input_searchGame: "",
  }),
  methods: {},
  computed: {
    lists() {
      return this.datalists.filter((list) => {
        return list.game
          .toLowerCase()
          .includes(this.input_searchGame.toLowerCase());
      });
    },
  },
};
</script>
