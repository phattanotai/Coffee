<template>
  <div v-if="valueData" id="col-Tags" @click="checkclick">
    <div class="px-4 border-bottom">
      <h6 class="mb-0">
        <span v-if="valueTag == 'provider'">เลือก Tags ค่ายเกม</span>
        <span v-if="valueTag == 'game'">เลือก Tags เกม</span>
        {{ valueData.game }}
      </h6>
      <div
        class="mt-2 position-relative"
        :class="check.length == 0 ? 'mb-5' : 'mb-2'"
      >
        <div class="d-flex align-items-center">
          <div class="w-80 d-flex">
            <input-tag
              class="input--tags w-100"
              placeholder="เพิ่ม Tags…"
              v-model="input_addtag"
            >
            </input-tag>
            <div class="border-w5">
              <span id="unfold_more" class="material-icons">unfold_more</span>
            </div>
          </div>
          <div class="w-20">
            <vs-button
              @click="addTag"
              :disabled="btnaddtags"
              class="btn-add--tags w-100 text-center"
              color="primary"
              type="filled"
              >เพิ่ม</vs-button
            >
          </div>
        </div>
        <div
          v-show="card__tag"
          class="card w-100 position-absolute listTag-show mt-2 pt-3"
        >
          <span
            @click="card__tag = false"
            class="material-icons-outlined close--card--tag text-grey0"
          >
            highlight_off
          </span>
          <ul>
            <li>
              <input type="checkbox" @click="checkAll()" v-model="isCheckAll" />
              ทั้งหมด
            </li>
            <li v-for="(data, index) in tagslist" :key="index">
              <input
                type="checkbox"
                v-bind:value="data"
                v-model="check"
                @change="updateCheckall()"
              />
              {{ data.text }}
            </li>
          </ul>
        </div>
        {{ check.text }}
      </div>

      <div class="mt-3 mb-2">
        <div class="tag--card" v-for="(data, index) in check" :key="index">
          <span class="tag-txt">{{ data.text }}</span>
          <span class="tag-close cursor-pointer"
            ><span @click="deleter(index, data)" class="material-icons"
              >close</span
            ></span
          >
        </div>
      </div>
    </div>
    <div class="mt-4 px-4 position-relative uploadSetting card--scroll">
      <Settingcomponent
        v-if="actionDel"
        :valueTag="valueTag"
        :valueData="valueData"
        :logo="valueImg"
        :listprovider="listprovider"
        :listgame="listgame"
        :bbrand="bbrand"
        :tagslist="check"
      />
    </div>
  </div>
</template>

<script>
import Settingcomponent from "@/views/Provider_GameList/Setting";
import InputTag from "vue-input-tag";
export default {
  name: "Table_gamelist",
  props: [
    "valueTag",
    "valueData",
    "valueImg",
    "actionDel",
    "listprovider",
    "listgame",
    "bbrand",
  ],
  components: {
    Settingcomponent,
    "input-tag": InputTag,
  },
  data: () => ({
    input_addtag: [],
    card__tag: false,
    btnaddtags: false,
    isCheckAll: false,
    tagslist: [
      {
        text: "เกมใหม่",
        value: 1,
      },
      {
        text: "เกมฮิต",
        value: 2,
      },
      {
        text: "คาสิโนสด",
        value: 3,
      },
      {
        text: "เกมไพ่",
        value: 4,
      },
      {
        text: "สล็อต",
        value: 5,
      },
      {
        text: "รูเล็ต",
        value: 6,
      },
      {
        text: "เกมขูด",
        value: 7,
      },
      {
        text: "เกมยิง",
        value: 8,
      },
      {
        text: "เกมถึงใจ",
        value: 9,
      },
      {
        text: "เกมรอแตก",
        value: 10,
      },
      {
        text: "ซื้อฟรีสปิน",
        value: 11,
      },
    ],
    check: [],
  }),
  methods: {
    addTag() {
      this.btnaddtags = true;
      if (this.input_addtag != "") {
        this.input_addtag.forEach((value, index) => {
          this.tagslist.push({
            text: value,
            value: this.tagslist.length + 1,
          });
        });
        this.$vs.notify({
          text: `เพิ่ม "` + this.input_addtag + `" สำเร็จ`,
          color: "success",
          position: "top-right",
        });
        this.input_addtag = [];
        setTimeout(() => {
          this.btnaddtags = false;
        }, 2000);
      } else {
        this.$vs.notify({
          text: `กรุณาป้อนค่าว่าง`,
          color: "danger",
          position: "top-right",
        });
        this.btnaddtags = false;
      }
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.check = [];
      if (this.isCheckAll) {
        for (var key in this.tagslist) {
          this.check.push(this.tagslist[key]);
        }
      }
    },
    updateCheckall() {
      if (this.check.length == this.tagslist.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    deleter(index, data) {
      this.check.splice(index, 1);
      this.$vs.notify({
        text: `ลบ Tag "` + data.text + `" ออกจากเกมนี้`,
        color: "danger",
        position: "top-right",
      });
    },
    checkclick() {
      window.onclick = (e) => {
        if (e.target.id == "unfold_more") {
          this.card__tag = !this.card__tag;
        }
        if (e.target.innerHTML == "เพิ่ม" || e.target.localName == "div") {
          this.card__tag = false;
        }
      };
    },
  },
  mounted() {
    if (this.valueData != "add") {
      if (this.valueData.game) {
        this.valueData.tag.forEach((v, n) => {
          this.tagslist.forEach((value, index) => {
            if (v.tag == value.value) {
              this.check.push({
                text: value.text,
                value: value.value,
              });
            }
          });
        });
      } else {
        this.valueData.attributes.tag.forEach((v, n) => {
          this.tagslist.forEach((value, index) => {
            if (v.tag == value.value) {
              this.check.push({
                text: value.text,
                value: value.value,
              });
            }
          });
        });
      }
    }
  },
};
</script>
