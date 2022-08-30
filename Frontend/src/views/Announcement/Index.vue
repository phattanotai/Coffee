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
                <h5 class="mb-0">Announcement / ประกาศ</h5>
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
              <div id="tableAnnounceMent">
                <table
                  class="table table--striped table--hover table-Announcement mb-0"
                >
                  <tr class="text-center">
                    <th>
                      <input
                        type="checkbox"
                        @click="checkAll()"
                        v-model="isCheckAll"
                      />
                    </th>
                    <th class="star">
                      <input
                        type="checkbox"
                        id="isfavoritesAll"
                        @click="favoritesAll()"
                        v-model="isfavoritesAll"
                      />
                      <label for="isfavoritesAll"></label>
                    </th>
                    <th>ประกาศ</th>
                    <th>เวลาประกาศ</th>
                    <th>วันที่สร้างประกาศ</th>
                    <th></th>
                  </tr>

                  <tr
                    v-for="(data, index) in datalists"
                    :key="index"
                    class="text-center border-0"
                  >
                    <td>
                      <input
                        type="checkbox"
                        v-bind:value="data"
                        v-model="check"
                        @change="updateCheckall(data)"
                      />
                    </td>
                    <td class="star">
                      <input
                        type="checkbox"
                        :id="data.id"
                        v-bind:value="data"
                        v-model="data.attributes.hot || star"
                        @click="updateFavoritesAll(data)"
                      />
                      <label :for="data.id"></label>
                    </td>
                    <td class="text-start p-1 notify">
                      <h6 class="mb-0 p-0">{{ data.attributes.title_th }}</h6>
                      <span class="p-0 font-montserrat">{{
                        data.attributes.title_en
                      }}</span>
                    </td>
                    <td class="time">
                      {{ formateDate(data.attributes.announcement_datetime) }}
                    </td>
                    <td class="create">
                      {{ formateDate(data.attributes.createdAt) }}
                    </td>
                    <td>
                      <span
                        class="me-2 edit cursor-pointer"
                        @click="btnOpenEditModal(data)"
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

                <vs-popup :active.sync="ispopupForm" class="announcment_edit">
                  <div class="row">
                    <div class="col-12">
                      <div class="card shadow position-relative">
                        <div class="card-header card-header-card bg-gray-90">
                          <div class="px-2">
                            <h5 class="mb-0">{{ msgTitle }}</h5>
                          </div>
                        </div>
                        <div v-if="isLoading" class="text-center w-100 mt-3">
                          <svg class="loading-spinner">
                            <circle
                              :cx="
                                circlePositions[index] &&
                                circlePositions[index].x
                              "
                              :cy="
                                circlePositions[index] &&
                                circlePositions[index].y
                              "
                              :r="item.radius"
                              :fill="item.color"
                              v-for="(item, index) in circles"
                              :key="index"
                            />
                          </svg>
                        </div>
                        <div class="card-body announcement">
                          <div class="px-2 text-center">
                            <div v-show="popupCard">
                              <div class="vs-component vs-con-textarea">
                                <h4>TH :</h4>
                                <textarea
                                  class="vs-textarea"
                                  v-model="textareaTH"
                                  @input="changeValue(0, $event.target.value)"
                                ></textarea>
                              </div>
                              <div class="vs-component vs-con-textarea">
                                <h4>ENG :</h4>
                                <textarea
                                  class="vs-textarea"
                                  v-model="textareaEN"
                                  @input="changeValue(1, $event.target.value)"
                                ></textarea>
                              </div>
                              <!-- Date -->
                              <div>
                                <h4>เวลาประกาศ:</h4>
                                <v-date-picker
                                  v-model="date"
                                  is24hr
                                  locale="th"
                                  mode="dateTime"
                                  scrollable
                                  landscape
                                >
                                  <template
                                    v-slot="{ inputValue, inputEvents }"
                                  >
                                    <input
                                      class="bg-white border px-2 py-1 rounded"
                                      :value="inputValue"
                                      v-on="inputEvents"
                                    />
                                  </template>
                                </v-date-picker>
                              </div>

                              <!-- <h6 class="text-black">วันที่ / เวลา ลงประกาศ</h6> -->
                              <div class="btn-setting mt-4">
                                <vs-button
                                  :disabled="btnDisabled"
                                  @click="submit"
                                  class="me-2"
                                  color="#146EFF"
                                >
                                  <span class="material-icons"> save </span>
                                  Save</vs-button
                                >
                                <vs-button
                                  :disabled="btnDisabledCancel"
                                  @click="btnCloseModal"
                                  color="#ADADAD"
                                  ><span class="material-icons"
                                    >highlight_off</span
                                  >Cancel
                                </vs-button>
                                <p
                                  v-if="err_msg"
                                  class="small text-danger mb-0 mt-2"
                                >
                                  {{ msgErr }}
                                </p>
                              </div>
                            </div>
                            <Completecomponent
                              v-if="popupSuccess"
                              class="mb-3"
                              :msg-text="msg"
                            />
                            <Failcomponent
                              v-if="popupDanger"
                              class="mb-3"
                              :msg-text="msg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </vs-popup>
              </div>
            </div>
            <PaginationComponent
              :data="lists"
              :meta="meta"
              :changePageNumber="this.changePageNumber"
              :pageChangeNumber="pageChangeNumber"
            />
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
import PaginationComponent from "@/layout/Pagination/Pagination";
import { mapActions, mapGetters } from "vuex";

const CENTER_X = 50;
const CENTER_Y = 50;
const RADIUS = 20;

function positionOnCircle(radius, angle, center) {
  return {
    x: center.x + radius * Math.cos(toRadians(angle)),
    y: center.y + radius * Math.sin(toRadians(angle)),
  };
}

function toRadians(angle) {
  return (angle * Math.PI) / 180;
}

function calculatePositions(component) {
  let angleIncrement = 360 / component.circles.length;
  let positions = {};
  component.circles.forEach((circle, index) => {
    positions[index] = positionOnCircle(RADIUS, angleIncrement * index, {
      x: CENTER_X,
      y: CENTER_Y,
    });
  });
  return positions;
}

export default {
  name: "Announcement",
  components: {
    Navbar,
    Completecomponent,
    Failcomponent,
    Deletecomponent,
    PaginationComponent,
  },
  data: () => ({
    datalists: [],
    delAll: [],
    openAddModal: false,
    Item: "",
    Itemall: "",
    checkList: "",
    isCheckAll: false,
    check: [],
    selectchoice: "",
    isfavoritesAll: false,
    star: [],
    selectfavorites: "",
    msg: "",
    msgTitle: "",
    err_msg: false,
    msgErr: "",
    textareaTH: "",
    textareaEN: "",
    action: "",
    ispopupForm: false,
    btnDisabled: true,
    popupCard: false,
    popupSuccess: false,
    popupDanger: false,
    idDel: [],
    openDelModal: "",
    isLoading: false,
    id: 0,
    meta: {},
    pageChangeNumber: 1,
    circles: [
      { color: "#E0F2F1", radius: 0 },
      { color: "#B2DFDB", radius: 0 },
      { color: "#80CBC4", radius: 0 },
      { color: "#4DB6AC", radius: 0 },
      { color: "#26A69A", radius: 0 },
      { color: "#00897B", radius: 0 },
      { color: "#00796B", radius: 0 },
      { color: "#00695C", radius: 0 },
      { color: "#004D40", radius: 0 },
    ],
    counter: 0,
    interval: null,
    date: new Date(),
    item: {},
    isClickStar: false,
    btnDisabledCancel: false,
  }),
  watch: {
    openAddModal() {
      this.clickpopupAdd();
    },
    openEditModal() {
      this.popupEdit();
      this.btnDisabled = true;
    },
    closeModal() {
      this.closePopup();
    },
  },
  computed: {
    ...mapGetters("Announcements", ["getAnnouncements", "getMeta"]),
    circlePositions: calculatePositions,
    lists() {
      return this.datalists;
    },
  },
  created() {
    this.interval = setInterval(() => {
      this.counter++;
      this.circles = this.circles.map((item, index) => ({
        ...item,
        radius: (this.counter + index) % 8,
      }));
    }, 70);
    this.meta = this.$store.state.Announcements.meta;
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    ...mapActions("Announcements", [
      "fetchAnnounements",
      "createAnnounements",
      "deleteAnnounements",
      "updateAnnounements",
      "getAnnouncementsByID",
    ]),
    changeValue(index, event) {
      this.btnDisabled = true;
      if (event) {
        this.btnDisabled = false;
      }
    },
    async changePageNumber(newPageNumber) {
      this.isLoading = true;
      this.pageChangeNumber = newPageNumber;
      await this.fetchAnnounements(newPageNumber);
      this.datalists = this.$store.state.Announcements.Announcements;
      this.isLoading = false;
    },
    btnOpenAddModal() {
      this.openAddModal = !this.openAddModal;
    },
    btnCloseModal() {
      this.ispopupForm = !this.ispopupForm;
      this.closeModal = !this.closeModal;
    },
    btnOpenEditModal(data) {
      this.openEditModal = !this.openEditModal;
      this.btnDisabled = true;
      this.popupEdit(data);
    },
    formateDate(date) {
      const day = new Date(date);
      return day.toLocaleString("en-us");
    },
    getdeleterItem(id) {
      this.$vs.notify({
        text: `ลบประกาศเรียบร้อย`,
        color: "success",
        position: "top-right",
      });
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.check = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.datalists) {
          this.check.push(this.datalists[key]);
        }
      }
      this.delAll.push(this.check);
    },
    updateCheckall(data) {
      if (this.check.length == this.datalists.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
      this.delAll.push(this.check);
      this.idDel = [data.id];
    },
    async favoritesAll() {
      this.isfavoritesAll = !this.isfavoritesAll;
      this.star = [];
      if (this.isfavoritesAll) {
        // Check all
        for (var key in this.datalists) {
          this.star.push(this.datalists[key]);
          this.updateFavoritesAll(this.datalists[key], "all");
        }
      } else {
        for (var key in this.datalists) {
          this.star = [];
          this.updateFavoritesAll(this.datalists[key]);
        }
      }
    },
    async updateFavoritesAll(data, key) {
      if (data) {
        this.isClickStar = true;
        if (data.attributes.hot === true && !key) {
          this.isClickStar = false;
          this.$vs.notify({
            text: `ลบประกาศที่ชอบเรียบร้อย`,
            color: "success",
            position: "top-right",
          });
        }
        const res = {
          title_th: data.attributes.title_th,
          title_en: data.attributes.title_en,
          announcement_datetime: data.attributes.announcement_datetime,
          hot: this.isClickStar,
        };
        await this.updateAnnounements({
          id: data.id,
          data: res,
        });
        this.datalists = this.$store.state.Announcements.Announcements;
        this.$vs.notify({
          text: `เพิ่มประกาศที่ชอบเรียบร้อย`,
          color: "success",
          position: "top-right",
        });
      }
      if (this.star.length == this.datalists.length) {
        this.isfavoritesAll = true;
      } else {
        this.isfavoritesAll = false;
      }
    },
    clickpopupAdd() {
      this.clearForm();
      this.action = "add";
      this.msgTitle = "สร้างประกาศใหม่";
      this.popupCard = true;
      this.ispopupForm = true;
      this.btnDisabled = true;
    },
    async popupEdit(value) {
      this.id = value.id;
      this.clearForm();
      this.action = "edit";
      this.msgTitle = "แก้ไขประกาศ";
      this.isLoading = true;
      //get announcement by id
      await this.getAnnouncementsByID(value.id);
      this.item = this.$store.state.Announcements.Announcement;
      this.textareaEN =
        this.$store.state.Announcements.Announcement.attributes.title_en;
      this.textareaTH =
        this.$store.state.Announcements.Announcement.attributes.title_th;
      this.date =
        this.$store.state.Announcements.Announcement.attributes.announcement_datetime;
      this.ispopupForm = true;
      this.popupCard = true;
      this.isLoading = false;
    },
    closePopup() {
      this.ispopupForm = false;
      this.closePopup = false;
      this.clearForm();
      this.btnDisabled = true;
    },
    clearForm() {
      this.textareaTH = "";
      this.textareaEN = "";
      this.msgErr = "";
      this.err_msg = false;
      this.popupCard = false;
      this.popupSuccess = false;
      this.popupDanger = false;
      this.action = "";
      this.btnDisabled = true;
      this.idDel = "";
    },
    async submit() {
      if (this.date == undefined || this.date === "") {
        this.err_msg = true;
        this.msgErr = "*** ระบุระยะเวลากิจกรรม";
        this.classinputDate_ = "classErr--inputDate";
      }
      if (this.textareaTH == "" || this.textareaEN == "") {
        this.err_msg = true;
        this.msgErr = "*** กรุณากรอกข้อมูลให้ครบถ้วน";
      } else {
        this.btnDisabled = true;
        this.popupCard = false;
        if (this.action == "add") {
          this.isLoading = true;
          // create announcement
          const data = {
            title_th: this.textareaTH,
            title_en: this.textareaEN,
            announcement_datetime: this.date,
            hot: false,
          };
          await this.createAnnounements(data);
          this.popupSuccess = true;
          this.msg = "เพิ่มประกาศเรียบร้อย";
          this.isLoading = false;
        } else if (this.action == "edit" && this.id) {
          this.isLoading = true;
          // create
          const data = {
            title_th: this.textareaTH,
            title_en: this.textareaEN,
            announcement_datetime: this.date,
            hot: false,
          };
          await this.updateAnnounements({
            id: this.id,
            data: data,
          });
          this.isLoading = false;
          this.popupSuccess = true;
          this.msg = "เพิ่มประกาศเรียบร้อย";
        } else {
          this.popupDanger = true;
          this.msg = "ไม่สามารถแก้ไขประกาศได้";
        }
        await this.fetchAnnounements();
        this.datalists = this.$store.state.Announcements.Announcements;
        this.isLoading = false;

        setTimeout(() => {
          this.closePopup();
        }, 3000);
      }
    },
    async btnpopupDelete(id) {
      if (id) {
        this.id = id;
        this.isLoading = true;
        this.idDel = [id];
        this.openDelModal = !this.openDelModal;
        this.isLoading = false;
      }
    },
    async onDelete(id) {
      if (id) {
        this.isLoading = true;
        await this.deleteAnnounements(id);
        await this.fetchAnnounements();
        this.datalists = this.$store.state.Announcements.Announcements;
        this.isLoading = false;
      }
    },
    btnpopupDeleteAll(check) {
      this.idDel = [];
      this.openDelModal = !this.openDelModal;
      if (check) {
        check.map(async (item) => {
          this.idDel.push(item.id);
        });
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchAnnounements();
    this.datalists = this.$store.state.Announcements.Announcements;
    this.datalists.map((item) => {
      if (item.attributes.hot) {
        this.star.push(item);
      }
    });
    if (this.star.length == this.datalists.length) {
      this.isfavoritesAll = true;
    } else {
      this.isfavoritesAll = false;
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
.loading-spinner {
  width: 100px;
  height: 100px;
}
.announcement {
  padding-top: 6.5rem !important;
}
</style>
