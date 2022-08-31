<template>
  <div class="card--scroll" v-if="valueTag != undefined">
    <div v-if="valueTag == 'provider'">
      <div class="d-flex align-items-center justify-content-center">
        <div class="w-25" :class="selectType">
          <div
            class="card--logo d-flex align-items-center justify-content-center position-relative"
            :class="card_logo_error"
          >
            <img :src="newlogo != '' ? newlogo : logo" class="w-90" />
            <div
              @click="isPopupEdit('provider'), deleteDropFile()"
              class="upload--logo rounded-circle position-absolute d-flex align-items-center justify-content-center"
            >
              <span class="material-icons rounded-circle"> photo_camera </span>
            </div>
          </div>
        </div>
        <div class="w-75 ps-4">
          <h5 v-if="valueData != 'add'">{{ valueData.game }}</h5>
          <vs-input
            v-if="valueData == 'add'"
            placeholder="ค่ายเกม"
            @input.native="onInput"
            class="inputx inputT_provider w-100 mt-1"
            :class="classinputT_"
            v-model="inputT_provider"
          />
          <div class="d-flex align-items-center mt-4">
            <div
              v-for="(type, index) in typelist"
              :key="index"
              class="btn--type--setting me-2 px-3 py-1 fst-italic"
              :class="[
                type.type,
                { active: selectType == type.i },
                btn__type__setting_err,
              ]"
              @click="setTypeSelect(type.i)"
            >
              {{ type.type | uppercase }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <h5 class="font-default fw-normal">เวลาเปิด</h5>
      </div>

      <div
        class="d-flex align-items-center justify-content-start mt-2 switch--game--setting"
      >
        <div class="w-20">
          <vs-switch @click="fn_switchBrand" v-model="switchBrand">
            <span slot="on">เปิด</span>
            <span slot="off">ปิด</span>
          </vs-switch>
        </div>

        <div class="w-35">
          <div @click="switchBrand == false ? fntime('start') : ''">
            <vs-input
              class="input--datepicker w-100"
              placeholder=""
              v-model="timepickerStart"
              icon-after="true"
              disabled="true"
              icon="unfold_more"
              :class="classinputTs"
            />
          </div>

          <div v-if="timeStart" class="row div--timeSelect">
            <div
              class="text-center bg-white p-0"
              style="width: 48px; border-radius: 10px"
            >
              <div class="div-expand_less" @click="timeminus('h', 'start')">
                <span class="material-icons-outlined"> expand_less </span>
              </div>
              <div class="txt_time">
                <span>{{ spantxtTimestart_h }}</span>
              </div>
              <div class="div-expand_more" @click="timeadd('h', 'start')">
                <span class="material-icons-outlined"> expand_more </span>
              </div>
            </div>
            <div style="width: 2px; font-size: 2rem; color: #000">
              <span style="position: relative; left: -2px">:</span>
            </div>
            <div
              class="text-center bg-white p-0"
              style="width: 48px; border-radius: 10px"
            >
              <div class="div-expand_less" @click="timeminus('i', 'start')">
                <span class="material-icons-outlined"> expand_less </span>
              </div>
              <div class="txt_time">
                <span>{{ spantxtTimestart_i }}</span>
              </div>
              <div class="div-expand_more">
                <span
                  class="material-icons-outlined"
                  @click="timeadd('i', 'start')"
                >
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-10 text-center">ถึง</div>

        <div class="w-35">
          <div @click="switchBrand == false ? fntime('end') : ''">
            <vs-input
              class="input--datepicker w-100"
              placeholder=""
              v-model="timepickerEnd"
              icon-after="true"
              disabled="true"
              icon="unfold_more"
              :class="classinputTs"
            />
          </div>

          <div v-if="timeend" class="row div--timeSelect">
            <div
              class="text-center bg-white p-0"
              style="width: 48px; border-radius: 10px"
            >
              <div class="div-expand_less" @click="timeminus('h', 'end')">
                <span class="material-icons-outlined"> expand_less </span>
              </div>
              <div class="txt_time">
                <span>{{ spantxtTimeend_h }}</span>
              </div>
              <div class="div-expand_more" @click="timeadd('h', 'end')">
                <span class="material-icons-outlined"> expand_more </span>
              </div>
            </div>
            <div style="width: 2px; font-size: 2rem; color: #000">
              <span style="position: relative; left: -2px">:</span>
            </div>
            <div
              class="text-center bg-white p-0"
              style="width: 48px; border-radius: 10px"
            >
              <div class="div-expand_less" @click="timeminus('i', 'end')">
                <span class="material-icons-outlined"> expand_less </span>
              </div>
              <div class="txt_time">
                <span>{{ spantxtTimeend_i }}</span>
              </div>
              <div class="div-expand_more">
                <span
                  class="material-icons-outlined"
                  @click="timeadd('i', 'end')"
                >
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="valueTag == 'game'"
      class="d-flex align-items-center justify-content-center"
    >
      <div class="w-20" :class="selectType">
        <div
          class="d-flex align-items-center justify-content-center position-relative"
        >
          <img
            :src="newlogo != '' ? newlogo : logo"
            class="card--logo"
            :class="card_logo_error"
          />

          <div
            @click="isPopupEdit('game'), deleteDropFile()"
            class="upload--logo rounded-circle position-absolute d-flex align-items-center justify-content-center"
          >
            <span class="material-icons rounded-circle"> photo_camera </span>
          </div>
        </div>
      </div>
      <div class="w-75 ps-2">
        <h5 v-if="valueData != 'add'">{{ valueData.game }}</h5>
        <vs-input
          v-if="valueData == 'add'"
          placeholder="ชื่อเกม"
          @input.native="onInput"
          class="inputx inputT_game w-100 mt-1"
          :class="classinputT_"
          v-model="inputT_game"
        />
        <div class="d-flex align-items-center mt-4">
          <div class="border-end me-3 switch--game--setting">
            <div class="mx-2">
              <vs-switch v-model="switchGame">
                <span slot="off">ปิด</span>
                <span slot="on">เปิด</span>
              </vs-switch>
            </div>
          </div>
          <div
            v-for="(type, index) in typelist"
            :key="index"
            class="btn--type--setting me-2 px-3 py-1 fst-italic"
            :class="[
              type.type,
              btn__type__setting_err,
              { active: selectType == type.i },
            ]"
            @click="setTypeSelect(type.i)"
          >
            {{ type.type | uppercase }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 btn-setting text-center">
      <vs-button
        :disabled="btnDisabled"
        @click="
          valueTag == 'provider'
            ? submitProvider(valueData)
            : submitGame(valueData)
        "
        class="me-2"
        color="#146EFF"
        ><span class="material-icons"> save </span> Save</vs-button
      >
      <vs-button :disabled="btnDisabled" @click="cancelForm" color="#ADADAD"
        ><span class="material-icons">highlight_off</span>Cancel</vs-button
      >
      <p v-if="v_error" class="small text-danger mb-0 mt-2">
        {{ t_error }}
      </p>
    </div>
    <vs-popup class="popupEdit" :active.sync="popupEdit">
      <div class="row">
        <div class="col-12">
          <div class="card shadow position-relative">
            <div class="card-header card-header-card bg-gray-90">
              <div class="px-2">
                <h5 class="mb-0">อัพโหลดรูปภาพ</h5>
              </div>
            </div>
            <div class="card-body">
              <div class="px-2 text-center">
                <b-field class="card--upload">
                  <b-upload
                    v-model="dropFiles"
                    @input="uploadFile"
                    drag-drop
                    expanded
                    v-if="dropFiles == null || dropFiles.length == 0"
                  >
                    <section>
                      <div
                        class="border--upload h-100 w-100 cursor-pointer d-grid align-items-center justify-content-center"
                      >
                        <div>
                          <h2 class="fw-light">วางรูปที่นี่</h2>
                          <span class="fw-light"
                            >ขนาด 200 x 200 px เท่านั้น</span
                          >
                        </div>

                        <div class="btn-upload">
                          <span class="material-icons"> cloud_upload </span>
                          <span class="ms-2">อัพโหลดรูปภาพ</span>
                        </div>
                      </div>
                    </section>
                  </b-upload>
                </b-field>
                <div v-if="dropFiles != null">
                  <div v-if="popupCardupload" class="card--upload">
                    <div
                      @click="deleteDropFile()"
                      class="btn-delete-preview d-flex align-items-center justify-content-center"
                    >
                      <img
                        :src="require(`@/assets/images/trash_light.png`)"
                        class="w-100"
                      />
                    </div>
                    <section>
                      <div
                        class="border--upload h-100 w-100 p-3 d-flex align-items-center justify-content-center"
                      >
                        <img class="w-100 image-preview" :src="imageData" />
                      </div>
                    </section>
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

                <div class="btn-setting mt-4">
                  <vs-button
                    v-show="popupCardbtn"
                    :disabled="btnDisabled"
                    @click="submit()"
                    class="me-2"
                    color="#146EFF"
                  >
                    <span class="material-icons"> save </span>
                    Save</vs-button
                  >
                  <vs-button
                    v-show="popupCardbtn"
                    :disabled="btnDisabled"
                    @click="closePopupedit"
                    color="#ADADAD"
                    ><span class="material-icons">highlight_off</span>Cancel
                  </vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Completecomponent from "@/layout/Popup/Complete";
import Failcomponent from "@/layout/Popup/Fail";
import { mapActions, mapGetters } from "vuex";
import notifyService from "../../service/notifyService";

var moment = require("moment");

export default {
  name: "setting-game",
  props: [
    "valueTag",
    "valueData",
    "logo",
    "addlist",
    "listprovider",
    "listgame",
    "bbrand",
    "tagslist",
  ],
  components: {
    Completecomponent,
    Failcomponent,
  },
  data: () => ({
    selectType: "",
    switchBrand: true,
    switchGame: true,
    newlogo: "",
    popupEdit: false,
    fileBase64: null,
    dropFiles: null,
    imageData: "",
    index: "",
    popupComplete: false,
    btnDisabled: false,
    popupCardbtn: true,
    popupSuccess: false,
    popupDanger: false,
    msg: "",
    inputT_provider: "",
    classinputT_: "",
    classinputTs: "",
    card_logo_error: "",
    btn__type__setting_err: "",
    inputT_game: "",
    typelist: [
      {
        i: 1,
        type: "new",
      },
      {
        i: 2,
        type: "hot",
      },
      {
        i: 3,
        type: "promo",
      },
    ],
    timepickerStart: "--:--",
    timepickerEnd: "--:--",
    timeStart: false,
    txtTimestart_h: 0,
    txtTimestart_i: 0,
    spantxtTimestart_h: "",
    spantxtTimestart_i: "",
    timeend: false,
    txtTimeend_h: 0,
    txtTimeend_i: 0,
    spantxtTimeend_h: "",
    spantxtTimeend_i: "",
    v_error: false,
    statusType: "",
    datalists: [],
  }),
  computed: {
    ...mapGetters("gameListAndProvider", ["getGameProviderList"]),
  },
  methods: {
    ...mapActions("gameListAndProvider", [
      "fetchAllGameProviderList",
      "getGameProviderListById",
      "createGameProviderList",
      "deleteGameProviderList",
      "updateGameProviderList",
    ]),
    setTypeSelect(type) {
      this.selectType = type;
    },
    isPopupEdit(value) {
      this.active = value;
      this.popupEdit = true;
    },
    onInput() {
      if (this.inputT_provider != "") {
        this.classinputT_ = "";
        this.v_error = false;
        this.t_error = "";
      }
    },
    closePopupedit() {
      this.popupEdit = false;
      this.dropFiles = null;
      this.fileBase64 = null;
      this.imageData = "";
      this.popupSuccess = false;
      this.popupDanger = false;
      this.popupComplete = false;
    },
    uploadFile() {
      var reader = new FileReader();
      reader.readAsDataURL(this.dropFiles);
      reader.onload = (e) => {
        this.fileBase64 = reader.result;
        this.imageData = e.target.result;
      };
      this.popupCardupload = true;
    },
    deleteDropFile(index) {
      this.dropFiles = null;
      this.fileBase64 = null;
      this.imageData = "";
      this.btnDisabled = false;
      this.popupCardbtn = true;
    },
    submit() {
      if (this.dropFiles != null) {
        this.btnDisabled = true;
        this.popupCardbtn = false;
        this.popupCardupload = false;
        this.popupSuccess = true;
        this.msg = "อัพโหลดรูปภาพสำเร็จ";
        setTimeout(async () => {
          this.newlogo = this.imageData;
          this.popupEdit = false;
          this.popupSuccess = false;
          this.popupDanger = false;
          this.btnDisabled = false;
        }, 3000);
      }
    },
    addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    fntime(t) {
      if (t == "start") {
        this.timeStart = !this.timeStart;
        this.timeend = false;
        if (this.spantxtTimestart_h == "" && this.spantxtTimestart_i == "") {
          this.spantxtTimestart_h = "00";
          this.spantxtTimestart_i = "00";
        }
        this.timepickerStart =
          this.spantxtTimestart_h + ":" + this.spantxtTimestart_i;
      } else {
        this.timeend = !this.timeend;
        this.timeStart = false;
        if (this.spantxtTimeend_h == "" && this.spantxtTimeend_i == "") {
          this.spantxtTimeend_h = "00";
          this.spantxtTimeend_i = "00";
        }
        this.timepickerEnd =
          this.spantxtTimeend_h + ":" + this.spantxtTimeend_i;
      }
    },
    timeadd(t, type) {
      if (type == "start" && t == "h") {
        if (this.txtTimestart_h < 23) {
          this.txtTimestart_h++;
          this.spantxtTimestart_h = this.addZero(this.txtTimestart_h);
        }
        this.timepickerStart =
          this.spantxtTimestart_h + ":" + this.spantxtTimestart_i;
      } else if (type == "start" && t == "i") {
        if (this.txtTimestart_i < 59) {
          this.txtTimestart_i++;
          this.spantxtTimestart_i = this.addZero(this.txtTimestart_i);
        }
        this.timepickerStart =
          this.spantxtTimestart_h + ":" + this.spantxtTimestart_i;
      } else if (type == "end" && t == "h") {
        if (this.txtTimeend_h < 23) {
          this.txtTimeend_h++;
          this.spantxtTimeend_h = this.addZero(this.txtTimeend_h);
        }
        this.timepickerEnd =
          this.spantxtTimeend_h + ":" + this.spantxtTimeend_i;
      } else if (type == "end" && t == "i") {
        if (this.txtTimeend_i < 59) {
          this.txtTimeend_i++;
          this.spantxtTimeend_i = this.addZero(this.txtTimeend_i);
        }
        this.timepickerEnd =
          this.spantxtTimeend_h + ":" + this.spantxtTimeend_i;
      }
    },
    uploadImage(fileBase64) {
      return new Promise((resolve, reject) => {});
    },
    timeminus(t, type) {
      if (type == "start" && t == "h") {
        if (this.txtTimestart_h > 0) {
          this.txtTimestart_h--;
          this.spantxtTimestart_h = this.addZero(this.txtTimestart_h);
        }
        this.timepickerStart =
          this.spantxtTimestart_h + ":" + this.spantxtTimestart_i;
      } else if (type == "start" && t == "i") {
        if (this.txtTimestart_i > 0) {
          this.txtTimestart_i--;
          this.spantxtTimestart_i = this.addZero(this.txtTimestart_i);
        }
        this.timepickerStart =
          this.spantxtTimestart_h + ":" + this.spantxtTimestart_i;
      } else if (type == "end" && t == "h") {
        if (this.txtTimeend_h > 0) {
          this.txtTimeend_h--;
          this.spantxtTimeend_h = this.addZero(this.txtTimeend_h);
        }
        this.timepickerEnd =
          this.spantxtTimeend_h + ":" + this.spantxtTimeend_i;
      } else if (type == "end" && t == "i") {
        if (this.txtTimeend_i > 0) {
          this.txtTimeend_i--;
          this.spantxtTimeend_i = this.addZero(this.txtTimeend_i);
        }
        this.timepickerEnd =
          this.spantxtTimeend_h + ":" + this.spantxtTimeend_i;
      }
    },
    fn_switchBrand() {
      if (this.switchBrand == true) {
        this.fntime("start");
      } else {
        this.timeStart = false;
        this.timeend = false;
        this.timepickerStart = "--:--";
        this.timepickerEnd = "--:--";
        this.spantxtTimestart_h = "";
        this.spantxtTimestart_i = "";
        this.spantxtTimeend_h = "";
        this.spantxtTimeend_i = "";
      }
    },
    checkImg() {
      if (this.fileBase64 == null) {
        this.v_error = true;
        this.t_error = "*** รูปภาพ";
        this.card_logo_error = "card--logo--error";
      }
    },
    checkType() {
      if (this.selectType == undefined) {
        this.v_error = true;
        this.t_error = "*** ประเภท";
        this.btn__type__setting_err = "btn--type--setting-err ";
      }
    },
    check_timepicker() {
      if (this.timepickerStart == "--:--") {
        this.v_error = true;
        this.t_error = "*** กรุณากรอกเวลาเริ่มปิดเกม";
        this.classinputTs = "classErr--inputTs_";
      }
      if (this.timepickerEnd == "--:--") {
        this.v_error = true;
        this.t_error = "*** กรุณากรอกเวลาสิ้นสุดปิดเกม";
        this.classinputTs = "classErr--inputTs_";
      } else {
        this.timepicker = this.timepickerStart + "-" + this.timepickerEnd;
      }
    },
    async submitProvider(valueData) {
      this.v_error = false;
      this.t_error = "";
      this.timeStart = false;
      this.timeend = false;
      this.timepicker = "";
      this.classinputT_ = "";
      this.classinputTs = "";
      this.card_logo_error = "";
      this.btn__type__setting_err = "";
      let status = "";

      if (this.switchBrand == false) {
        status = "danger";
        this.check_timepicker();
      }

      if (this.switchBrand == true) {
        status = "success";
        this.timepicker = "";
      }

      if (valueData == "add") {
        this.checkImg();
        this.checkType();

        if (this.inputT_provider == "") {
          this.v_error = true;
          this.classinputT_ = "classErr--inputT_";
          this.t_error = "*** กรุณากรอกข้อมูลให้ครบถ้วน";
        }
        if (this.v_error == false) {
          this.tags = [];
          this.tagslist.forEach((value, index) => {
            this.tags.push({
              tag: value.value,
            });
          });

          // set status type
          const res = this.typelist.filter(
            (item) => item.i === this.selectType
          );
          if (res) {
            this.statusType = res[0].type;
          }

          // upload image provider
          if (this.fileBase64) {
            this.newlogo = await this.uploadImage(this.fileBase64).catch(
              (error) => {
                throw error;
              }
            );
          }

          const req = {
            title: this.inputT_provider,
            tag: [],
            logo: this.newlogo,
            type: this.selectType,
            status: this.statusType,
            open_start_time:
              this.timepickerStart === "--:--"
                ? "00:00:00"
                : this.timepickerStart + ":" + "00",
            open_end_time:
              this.timepickerEnd === "--:--"
                ? "00:00:00"
                : this.timepickerEnd + ":" + "00",
            isOpen:
              this.timepickerStart === "--:--" || this.timepickerEnd === "--:--"
                ? false
                : true,
            gamelist: [],
          };

          // create new provider game list here !
          await this.createGameProviderList({ data: req });
          this.datalists = await this.fetchAllGameProviderList();

          this.$vs.notify({
            text: `เพิ่ม "` + this.inputT_provider + `" สำเร็จ`,
            color: "success",
            position: "top-right",
          });

          setTimeout(() => {
            this.closePopupedit();
            this.btnDisabled = false;
            this.inputT_provider = valueData.title;
            this.selectType = valueData.status;
            this.newlogo = valueData.logo;
            this.tags = valueData.tag;
            this.cancelForm();
          }, 3000);
        }
      } else {
        //  update
        if (this.v_error == false) {
          // if users update data
          this.tags = [];
          this.tagslist.forEach((value, index) => {
            this.tags.push({
              tag: value.value,
            });
          });

          // set status type
          const res = this.typelist.filter(
            (item) => item.i === this.selectType
          );
          if (res) {
            this.statusType = res[0]?.type;
          }
          // upload image provider
          if (this.fileBase64) {
            this.newlogo = await this.uploadImage(this.fileBase64).catch(
              (error) => {
                throw error;
              }
            );
          }
          if (valueData) {
            const req = {
              title: valueData.attributes.title,
              tag: this.tags,
              logo: this.fileBase64 ? this.newlogo : valueData.attributes.logo,
              status: this.statusType
                ? this.statusType
                : valueData.attributes.status,
              open_start_time:
                this.timepickerStart === "--:--"
                  ? "00:00:00"
                  : this.timepickerStart + ":" + "00",
              open_end_time:
                this.timepickerEnd === "--:--"
                  ? "00:00:00"
                  : this.timepickerEnd + ":" + "00",
              isOpen:
                this.timepickerStart === "--:--" ||
                this.timepickerEnd === "--:--"
                  ? false
                  : true,
              gamelist: valueData.attributes.gamelist,
            };

            // update provider game list here !
            await this.updateGameProviderList({ id: valueData.id, data: req });
            this.datalists = await this.fetchAllGameProviderList();
          }

          this.$vs.notify({
            text: `ตั้งค่า "` + valueData.attributes.title + `" สำเร็จ`,
            color: "success",
            position: "top-right",
          });
          setTimeout(() => {
            this.btnDisabled = false;
          }, 3000);
        }
      }
    },
    async submitGame(valueData) {
      this.v_error = false;
      this.t_error = "";
      this.classinputT_ = "";
      this.card_logo_error = "";
      this.btn__type__setting_err = "";
      let status = "";

      if (this.switchGame == false) {
        status = "danger";
      }
      if (this.switchGame == true) {
        status = "success";
      }

      if (valueData == "add") {
        this.checkImg();
        this.checkType();

        if (this.inputT_game == "") {
          this.v_error = true;
          this.classinputT_ = "classErr--inputT_";
          this.t_error = "*** กรุณากรอกข้อมูลให้ครบถ้วน";
        }

        if (this.v_error == false) {
          this.tags = [];
          this.tagslist.forEach((value, index) => {
            this.tags.push({
              tag: value.value,
            });
          });
          // upload image provider
          if (this.fileBase64) {
            this.newlogo = await this.uploadImage(this.fileBase64).catch(
              (error) => {
                throw error;
              }
            );
          }

          //find provider data
          const providerData = this.listprovider.filter(
            (item, index) => this.bbrand.b === item.attributes.title
          );

          // add new game on value array
          this.listgame.push({
            i: this.listgame.length + 1,
            game: this.inputT_game,
            type: this.selectType,
            status: status,
            img: this.newlogo,
            brand: this.bbrand.b,
            tag: this.tags,
          });

          const req = {
            title: providerData[0].attributes.title,
            tag: providerData[0].attributes.tag,
            logo: providerData[0].attributes.logo,
            status: providerData[0].attributes.status,
            open_start_time: providerData[0].attributes.open_start_time,
            open_end_time: providerData[0].attributes.open_end_time,
            isOpen: providerData[0].attributes.isOpen,
            gamelist: this.listgame,
          };

          // update provider game list here !
          await this.updateGameProviderList({
            id: providerData[0].id,
            data: req,
          });

          this.datalists = await this.fetchAllGameProviderList();
          this.$vs.notify({
            text: `เพิ่ม "` + this.inputT_game + `" สำเร็จ`,
            color: "success",
            position: "top-right",
          });

          setTimeout(() => {
            this.closePopupedit();
            this.btnDisabled = false;
            this.inputT_game = "";
            this.selectType = undefined;
            this.newlogo = require(`@/assets/images/mockup.jpg`);
            this.tags = [];
            this.cancelForm();
          }, 3000);
        }
      } else {
        //  update
        if (this.v_error == false) {
          this.tags = [];
          this.tagslist.forEach((value, index) => {
            this.tags.push({
              tag: value.value,
            });
          });

          if (this.fileBase64 !== null) {
            this.newlogo = await this.uploadImage(this.fileBase64).catch(
              (error) => {
                throw error;
              }
            );
          }
          //find provider data
          const providerData = this.listprovider.filter(
            (item, index) => valueData.brand === item.attributes.title
          );
          // update game list here!
          this.listgame.forEach((value, index) => {
            if (value.game == valueData.game) {
              value.game = valueData.game;
              value.type = this.selectType;
              value.status = status;
              if (this.fileBase64 != null) {
                value.img = this.newlogo;
              }
              value.brand = valueData.brand;
              value.tag = this.tags;
            }
          });

          const req = {
            title: providerData[0].attributes.title,
            tag: providerData[0].attributes.tag,
            logo: providerData[0].attributes.logo,
            status: providerData[0].attributes.status,
            open_start_time: providerData[0].attributes.open_start_time,
            open_end_time: providerData[0].attributes.open_end_time,
            isOpen: providerData[0].attributes.isOpen,
            gamelist: this.listgame,
          };

          // update provider game list here !
          await this.updateGameProviderList({
            id: providerData[0].id,
            data: req,
          });
          this.datalists = await this.fetchAllGameProviderList();

          this.$vs.notify({
            text: `ตั้งค่า "` + valueData.game + `" สำเร็จ`,
            color: "success",
            position: "top-right",
          });
          setTimeout(() => {
            this.btnDisabled = false;
          }, 3000);
        }
      }
    },

    cancelForm() {
      this.switchBrand = true;
      this.timeStart = false;
      this.timeend = false;
      this.v_error = false;
      this.t_error = false;
      this.timepickerStart = "--:--";
      this.timepickerEnd = "--:--";
      this.spantxtTimestart_h = "";
      this.spantxtTimestart_i = "";
      this.spantxtTimeend_h = "";
      this.spantxtTimeend_i = "";
    },
  },
  filters: {
    uppercase: function (value) {
      return value.toUpperCase();
    },
  },
  async mounted() {
    this.selectType = this.valueData.type;
    if (this.valueTag == "provider") {
      if (this.valueData.status == "success") {
        this.switchBrand = true;
      }
      if (this.valueData.status == "danger") {
        this.switchBrand = false;
        this.timepickerStart = "07:00";
        this.timepickerEnd = "15:30";
        this.spantxtTimestart_h = "07";
        this.spantxtTimestart_i = "00";
        this.spantxtTimeend_h = "15";
        this.spantxtTimeend_i = "30";
        this.txtTimestart_h = 7;
        this.txtTimestart_i = 0;
        this.txtTimeend_h = 15;
        this.txtTimeend_i = 30;
      }
    }

    if (this.valueTag == "game") {
      if (this.valueData.status == "success") {
        this.switchGame = true;
      }
      if (this.valueData.status == "danger") {
        this.switchGame = false;
      }
    }
  },
};
</script>

<style>
.popupComplete .vs-popup {
  background: #f9fff7 !important;
  text-align: center;
  border-radius: 3rem;
}
.inputT_provider input,
.inputT_game input {
  border-radius: 3rem;
}

.btn--type--setting-err,
.card--logo--err {
  border: 1px solid #d80101 !important;
}
</style>
