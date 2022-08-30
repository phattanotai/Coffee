<template>
  <div class="game-menu">
    <div class="curve-mask">
      <div class="curve-up">
        <div class="plain standard-section">
          <div class="curve-content">
            <div class="row">
              <div
                v-for="(m, index) in menu_type_v"
                :key="index"
                class="col-4 col-sm-4 col-md-4 main_type"
                :class="{ action_selectType: action_selectType == m.type }"
              >
                <div
                  @click="[(action_selectType = m.type), searchGame(m.type)]"
                  class="position-relative"
                  style="top: -33%; cursor: pointer"
                >
                  <img
                    :src="m.img"
                    style="top: 1.3rem; z-index: 333"
                    class="w-100 position-relative img_typeHeader"
                    alt=""
                  />
                  <div class="div_type_vertical">
                    <div style="position: relative; padding: 0.8rem 0">
                      <p>{{ m.en }}</p>
                      <h1>{{ m.th }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="div_type_horizontal mb-3">
                  <div class="row">
                    <div
                      style="cursor: pointer"
                      :class="{
                        action_selectType: action_selectType == mh.type,
                      }"
                      class="col-6 position-relative img_type"
                      v-for="(mh, index) in menu_type_h"
                      :key="index"
                      @click="
                        [(action_selectType = mh.type), searchGame(mh.type)]
                      "
                    >
                      <div class="row">
                        <div class="col-6 position-relative">
                          <img
                            :src="mh.img"
                            class="w-100 position-relative"
                            :class="{ 'ld ld-breath': mh.type == 'game_hit' }"
                            alt=""
                          />
                          <img
                            v-if="mh.type == 'game_hit'"
                            class="position-absolute w-100 ld ld-breath--2"
                            src="../../assets/images/game_hit_in.png"
                          />
                        </div>
                        <div class="col-6 horizontal_TXT">
                          {{ $t(`menu.gameType.${mh.th}`) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="search-input">
                      <input
                        type="text"
                        v-model="inputSearch"
                        :placeholder="$t('message.games.searchGame')"
                        @keypress.enter="searchGame()"
                      />
                      <div @click="searchGame()" class="icon">
                        <i class="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
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
const live_casino = require("../../assets/images/live_casino.png");
const table_game = require("../../assets/images/table_game.png");
const slot_casino = require("../../assets/images/slot_casino.png");
const sports = require("../../assets/images/esports.png");
const arcade = require("../../assets/images/arcade.png");
const shooting_game = require("../../assets/images/shooting_game.png");

const game_hit = require("../../assets/images/game_hit.png");
const game_jackpot = require("../../assets/images/game_jackpot.png");
const game_new = require("../../assets/images/game_new.png");
const game_event = require("../../assets/images/game_event.png");

export default {
  name: "GameMenu",
  props: ["value"],
  data() {
    return {
      action_selectType: "",
      menu_type_v: [
        {
          img: live_casino,
          th: "คาสิโน",
          en: "Live Casino",
          type: 3,
        },
        {
          img: table_game,
          th: "เกมไพ่",
          en: "Table Game",
          type: 4,
        },
        {
          img: slot_casino,
          th: "สล็อต",
          en: "Slot",
          type: 5,
        },
        {
          img: sports,
          th: "กีฬา",
          en: "Sports",
          type: 12,
        },
        {
          img: arcade,
          th: "เกมอาร์เคด",
          en: "Arcade Game",
          type: 13,
        },
        {
          img: shooting_game,
          th: "เกมยิง",
          en: "Shooting Game",
          type: 8,
        },
      ],
      menu_type_h: [
        {
          img: game_hit,
          th: "hit",
          type: 2,
        },
        {
          img: game_jackpot,
          th: "jackpot",
          type: 10,
        },
        {
          img: game_new,
          th: "new",
          type: 1,
        },
        {
          img: game_event,
          th: "gameEvent",
          type: "game_event",
        },
      ],
    };
  },
  methods: {
    searchGame(e) {
      this.$emit("searchGame", e);
    },
  },
  computed: {
    inputSearch: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
