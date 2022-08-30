<template>
  <div>
    <div class="card shadow">
      <div
        class="card-header card-header-card d-flex align-items-center"
        :class="headerCard"
      >
        <div class="w-25">
          <h5 class="mb-0 text-white" v-html="title"></h5>
        </div>
        <div class="w-75 d-flex align-items-center justify-content-end">
          <div class="w-60 d-flex align-items-center justify-content-end">
            <div class="div--daterange">
              <span style="width: 50px" class="text-white"> วันที่ :</span>
              <v-date-picker
                :rows="2"
                v-model="range"
                mode="dateTime"
                is-range
                is24hr
                locale="th"
                :firstDayOfWeek="firstDayOfWeek"
                @input="changeDate"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <div
                    class="flex flex-col sm:flex-row justify-start items-center"
                  >
                    <div class="relative flex-grow">
                      <input
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                      />

                      <img
                        class="icon--right"
                        :src="require(`@/assets/images/right.png`)"
                      />

                      <input
                        class="me-3"
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                      />

                      <div class="icon--calendar">
                        <img :src="require(`@/assets/images/calendar.png`)" />
                      </div>
                    </div>
                  </div>
                </template>
              </v-date-picker>
            </div>
          </div>
          <div class="w-30 d-flex align-items-center justify-content-end">
            <vs-input
              class="input--search --table w-100"
              icon-no-border
              icon="search"
              v-model="inputSearch"
              @input.native="onSearch"
            />

            <i class="text-white" @click="refresh"
              ><span
                class="material-icons-outlined"
                style="
                  font-size: 30px;
                  position: relative;
                  top: 5px;
                  right: -15px;
                  cursor: pointer;
                "
                >refresh</span
              ></i
            >
          </div>
        </div>
      </div>
      <div class="card-body card--scroll p-0">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script>
const moment = require("moment");
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SearchCard",
  props: ["value", "headerCard", "title"],
  data() {
    return {
      range: "",
      firstDayOfWeek: 2,
    };
  },
  methods: {
    ...mapActions("UserInfo", ["setSearchInput"]),
    refresh() {
      this.$emit("onSearch", 1);
    },
    changeDate(e) {
      this.$emit("returnDate", {
        startDate: moment(this.range.start).format("YYYYMMDDTHHmmss"),
        endDate: moment(this.range.end).format("YYYYMMDDTHHmmss"),
      });
    },
    onSearch(e) {
      this.setSearchInput(this.inputSearch);
      this.$emit("returnSearch", this.inputSearch);
    },
    setDate() {
      const date = this.getDate.startDate ? this.getDate.startDate : new Date();
      const y = this.getDate.endDate
        ? this.getDate.endDate
        : new Date(new Date().setDate(new Date().getDate() - 1));
      const yesterday = moment(y).format("MM/DD/YYYY");
      const input_date = moment(date).format("MM/DD/YYYY");
      this.range = { start: yesterday + " 00:00", end: input_date + " 00:00" };
    },
  },
  mounted() {
    this.setDate();
  },
  computed: {
    ...mapGetters("UserInfo", ["getDate"]),
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
<style></style>
