<template>
  <vs-popup :active.sync="ispopupFormDel" class="popupDel">
    <div class="row">
      <div class="col-12">
        <div
          class="card shadow position-relative"
          v-on:submit.prevent="deleter(valueId), $emit('Item', valueId)"
          v-on:keypress.enter.prevent="deleter(valueId), $emit('Item', valueId)"
        >
          <div class="card-header card-header-card bg-gray-90">
            <div class="px-2 text-center">
              <h5 class="text-black fw-light">
                พิมพ์คำว่า
                <span class="fw-bold font-montserrat">“Delete”</span> เพื่อลบ
              </h5>
              <vs-input
                id="input-del"
                @input.native="onInput"
                class="inputx input-delete w-100 mt-4"
                ref="taskDescription"
                v-model="input"
              />
            </div>
          </div>
          <div class="card-body my-2">
            <div class="px-2 text-center">
              <div class="btn-setting">
                <vs-button
                  :disabled="btnDisabled"
                  @click="deleter(valueId), $emit('Item', valueId)"
                  class="me-2"
                  color="#146EFF"
                >
                  <span class="material-icons"> backspace </span>
                  <span class="ms-1">Delete</span>
                </vs-button>
                <vs-button
                  :disabled="btncloseDisabled"
                  @click="closePopup"
                  color="#ADADAD"
                  ><span class="material-icons">highlight_off</span>Cancel
                </vs-button>
                <p v-if="err_msg" class="small text-danger mb-0 mt-2">
                  {{ msgErr }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vs-popup>
</template>

<script>
export default {
  name: "DeletePage",
  props: ["openDelModal", "valueId", "onDelete"],
  components: {},
  data: () => ({
    ispopupFormDel: false,
    btnDisabled: false,
    btncloseDisabled: false,
    input: "",
    err_msg: "",
    msgErr: "",
  }),
  watch: {
    openDelModal() {
      this.clickpopupDelete();
    },
  },
  methods: {
    clickpopupDelete() {
      this.ispopupFormDel = true;
      setTimeout(() => document.querySelector("#input-del").focus(), 200);
      this.clearForm();
    },

    closePopup() {
      this.ispopupFormDel = false;
      this.clearForm();
    },
    clearForm() {
      this.msgErr = "";
      this.input = "";
      this.err_msg = false;
      this.btnDisabled = true;
      this.btncloseDisabled = false;
    },
    onInput() {
      if (this.input == "Delete") {
        this.btnDisabled = false;
      }
    },
    deleter() {
      if (this.input != "" || this.input == "Delete") {
        this.btnDisabled = true;
        if (this.onDelete) {
          if (this.valueId.length > 1) {
            this.valueId.map((id, index) => {
              this.onDelete(this.valueId[index]);
            });
          } else {
            this.onDelete(this.valueId[0]);
          }
        }
        this.btncloseDisabled = true;
        this.closePopup();
      } else {
        this.err_msg = true;
        this.msgErr = "*** ไม่ถูกต้อง";
      }
    },
  },
};
</script>
