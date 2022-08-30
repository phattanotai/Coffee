<template>
  <div id="contentPromotion">
    <div
      class="px-4 d-flex align-items-top justify-content-center border-bottom"
    >
      <div class="w-30 mb-3">
        <div class="position-relative mb-2">
          <img
            :src="newbanner"
            class="w-100 rounded-3"
            :class="card_logo_error"
          />
          <div
            @click="isPopupEdit(), deleteDropFile()"
            class="upload--logo rounded-circle position-absolute d-flex align-items-center justify-content-center"
          >
            <span class="material-icons rounded-circle"> photo_camera </span>
          </div>
        </div>
        <vs-checkbox class="text-black" color="#00D9A6" v-model="status"
          >ขึ้นสไลด์</vs-checkbox
        >
      </div>
      <div class="w-75 ps-4">
        <h5 class="text-black">ระยะเวลากิจกรรม</h5>
        <div class="mt-4">
          <div class="div--daterange" :class="classinputDate_">
            <v-date-picker
              :rows="2"
              v-model="date"
              mode="dateTime"
              is-range
              is24hr
              locale="th"
              :firstDayOfWeek="firstDayOfWeek"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div
                  class="flex flex-col sm:flex-row justify-start items-center"
                >
                  <div class="relative flex-grow">
                    <span style="width: 60px"> เริ่มต้น :</span>
                    <input :value="inputValue.start" v-on="inputEvents.start" />
                    <img
                      class="icon--right"
                      :src="require(`@/assets/images/right.png`)"
                    />
                    <span style="width: 60px"> สิ้นสุด :</span>
                    <input :value="inputValue.end" v-on="inputEvents.end" />
                  </div>
                </div>
              </template>
            </v-date-picker>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ range }} -->
    <div class="text--editor p-4">
      <h5 class="text-black">ชื่อโปรโมชั่น</h5>
      <vs-input
        class="inputx inputTitle w-100 mt-1"
        v-model="title"
        :class="classinputT_"
      />
      <h5 class="text-black mt-4">รายละเอียดกิจกรรม</h5>
      <editor
        ref="toastuiEditor"
        :initialValue="valueData.detail"
        :options="editorOptions"
        height="300px"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        :class="err_editor"
      />
    </div>
    <div class="d-flex justify-content-center">
      <p v-if="v_error" class="small text-danger mb-0 mt-2">
        {{ t_error }}
      </p>
    </div>
    <div class="btn-setting d-flex justify-content-center">
      <vs-button
        :disabled="btndisabled"
        class="me-2"
        color="#146EFF"
        @click="submitPromotion(valueData)"
        ><span class="material-icons"> save </span> Save</vs-button
      >
      <vs-button @click="cancelForm()" color="#ADADAD" :disabled="btndisabled"
        ><span class="material-icons">highlight_off</span>Cancel</vs-button
      >
    </div>
    <vs-popup class="popupEditPromotion" :active.sync="popupEdit">
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
                <b-field class="card--upload promotion">
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
                            >ขนาด 700 x 320 px เท่านั้น</span
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
                  <div v-if="popupCardupload" class="card--upload promotion">
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
                    :disabled="btndisabled"
                    @click="submit"
                    class="me-2"
                    color="#146EFF"
                  >
                    <span class="material-icons"> save </span>
                    Save</vs-button
                  >
                  <vs-button
                    v-show="popupCardbtn"
                    :disabled="btndisabled"
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
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";

export default {
  name: "contentPromotion",
  props: ["valueData", "valueImg", "datalists", "btnDisabled"],
  components: {
    Completecomponent,
    Failcomponent,
    editor: Editor,
  },
  data: () => ({
    title: "",
    date: {},
    status: false,
    newbanner: "",
    firstDayOfWeek: 2,
    editorOptions: {
      hideModeSwitch: true,
    },
    popupEdit: false,
    fileBase64: null,
    dropFiles: null,
    imageData: "",
    index: "",
    popupCardbtn: true,
    popupSuccess: false,
    popupDanger: false,
    msg: "",
    v_error: false,
    card_logo_error: "",
    classinputDate_: "",
    classinputT_: "",
    err_editor: "",
  }),
  watch: {
    openDelModal() {
      this.clickpopupDelete();
    },
  },
  methods: {
    isPopupEdit() {
      this.popupEdit = true;
    },
    onEditorChange() {
      this.detail = this.$refs.toastuiEditor.invoke("getHTML");
    },

    closePopupedit() {
      this.popupEdit = false;
      this.dropFiles = null;
      this.fileBase64 = null;
      this.imageData = "";
      this.popupSuccess = false;
      this.popupDanger = false;
    },
    // upload image
    uploadFile() {
      var reader = new FileReader();
      reader.readAsDataURL(this.dropFiles);
      reader.onload = (e) => {
        this.fileBase64 = reader.result;
        this.imageData = e.target.result;
      };
      this.popupCardupload = true;
    },

    submit() {
      if (this.dropFiles != null) {
        this.btndisabled = true;
        this.popupCardbtn = false;
        this.popupCardupload = false;
        this.popupSuccess = true;
        this.msg = "อัพโหลดรูปภาพสำเร็จ";
        setTimeout(() => {
          this.newbanner = this.imageData;
          this.popupEdit = false;
          this.popupSuccess = false;
          this.popupDanger = false;
          this.btndisabled = false;
        }, 1500);
      }
    },
    deleteDropFile(index) {
      this.dropFiles = null;
      this.fileBase64 = null;
      this.imageData = "";
      this.btnDisabled = false;
      this.popupCardbtn = true;
    },
    checkImg(type) {
      if (this.fileBase64 === null && type === "add") {
        this.v_error = true;
        this.t_error = "*** รูปภาพ";
        this.card_logo_error = "card--logo--error";
      }
    },
    // clear form and hide form
    cancelForm() {
      this.title = "";
      this.status = false;
      this.date = undefined;
      this.newbanner = "/img/mockup.a491b4f5.png";

      this.classinputDate_ = "";
      this.classinputT_ = "";

      this.card_logo_error = "";
      this.v_error = false;
      this.t_error = false;
      this.err_editor = "";
      this.$emit("cancelForm");
    },
    // chech data and  emit to parent component for save
    submitPromotion(valueData) {
      this.v_error = false;
      this.card_logo_error = "";
      this.classinputDate_ = "";
      this.classinputT_ = "";
      this.err_editor = "";
      let emitDataIndex = undefined;
      this.checkImg(valueData);
      if (this.date == undefined) {
        this.v_error = true;
        this.t_error = "*** ระบุระยะเวลากิจกรรม";
        this.classinputDate_ = "classErr--inputDate";
      }
      if (this.title == undefined) {
        this.v_error = true;
        this.t_error = "*** ระบุชื่อโปรโมชั่น";
        this.classinputT_ = "classErr--inputT_";
      }
      if (
        this.$refs.toastuiEditor.invoke("getHTML") ==
        `<p><br class="ProseMirror-trailingBreak"></p>`
      ) {
        this.v_error = true;
        this.t_error = "*** รายละเอียด";
        this.err_editor = "err_editor";
      }
      if (this.v_error == false) {
        this.btndisabled = true;
        this.dateStart = this.date.start;
        this.dateEnd = this.date.end;
        const data = {
          i: valueData.i ? valueData.i : undefined,
          promotion: this.title,
          status: this.status,
          img: this.valueImg,
          detail: this.$refs.toastuiEditor.invoke("getHTML"),
          date: { start: this.dateStart, end: this.dateEnd },
        };

        this.$emit("onSaveData", {
          type: this.valueData === "add" ? this.valueData : "edit",
          data,
          id: valueData.i ? valueData.i : undefined,
          fileBase64: this.fileBase64,
        });
      }
    },
  },
  mounted() {
    this.title = this.valueData?.promotion;
    this.date = this.valueData?.date;
    this.status = this.valueData?.status;
    this.newbanner = this.newbanner ? this.newbanner : this.valueImg;
  },
  computed: {
    btndisabled: {
      get() {
        return this.btnDisabled;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style>
.toastui-editor-defaultUI,
.toastui-editor-ww-container {
  border-radius: 25px !important;
}

.toastui-editor-defaultUI-toolbar {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}

.toastui-editor-mode-switch {
  background: transparent;
}

#contentPromotion .div--daterange {
  border: 1px solid #dedfe1;
}

#contentPromotion .relative.flex-grow input {
  color: #000000 !important;
}

#contentPromotion .vs-checkbox--input {
  position: relative;
  left: 20px;
}

.inputTitle input {
  border-radius: 100px;
  font-weight: bold;
  color: #000;
}

.popupEditPromotion .vs-popup--content {
  margin: 0;
}
/* width */
.popupEditPromotion .vs-popup--content::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

/* Track */
.popupEditPromotion .vs-popup--content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
.popupEditPromotion .vs-popup--content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(99, 97, 97, 0.562);
}

/* Handle on hover */
.popupEditPromotion .vs-popup--content::-webkit-scrollbar-thumb:hover {
  background: black;
}
#completion {
  width: 200px;
}
</style>
