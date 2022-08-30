<template>
  <div id="header">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <router-link to="/">
          <img
            src="../../assets/images/logo-betflix.gif"
            class="img_logoHeader"
          />
        </router-link>
      </vs-col>

      <vs-col
        vs-type="flex"
        class="collapes_credit"
        vs-justify="center"
        vs-align="center"
        vs-w="6"
      >
        <vs-row vs-type="flex" vs-justify="flex-end">
          <vs-col vs-justify="center" vs-align="center" vs-sm="11" vs-lg="8">
            <vs-collapse>
              <vs-collapse-item>
                <div slot="header">
                  <span class="username mb-1">
                    <img
                      src="../../assets/images/user--icon.png"
                      class="me-2"
                      style="width: 30px"
                    />{{ username }}</span
                  >
                  <span class="credit">
                    <img
                      src="../../assets/images/coin_credit.png"
                      class="me-2"
                      style="width: 30px"
                    />{{ credit | numFormat("0,0.00") }}</span
                  >
                </div>
                <div class="mb-2 lang">
                  <div
                    :class="{ action: lang == 'th' }"
                    @click="settingLang('th')"
                    class="lang_th"
                  >
                    <img class="me-2" src="../../assets/images/th--icon.png" />
                    <span>TH</span>
                  </div>
                  <div
                    :class="{ action: lang == 'en' }"
                    @click="settingLang('en')"
                    class="lang_en"
                  >
                    <span>EN</span>
                    <img class="ms-2" src="../../assets/images/en--icon.png" />
                  </div>
                </div>
                <div @click="popupActivo = true" class="btn_change_pass">
                  <img src="../../assets/images/key_pass.png" class="me-2" />
                  title
                </div>
              </vs-collapse-item>
            </vs-collapse>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>

    <vs-popup fullscreen title="fullscreen" :active.sync="popupActivo">
      <div class="row" id="div_changePass">
        <div
          class="close"
          style="text-align: right"
          @click="popupActivo = false"
        >
          <i class="fas fa-times-circle"></i>
        </div>
        <div class="col-10 col-md-8 col-lx-8 col-lg-8 m-auto mt-3">
          <h2>title</h2>
          <div class="div_username">
            <img
              src="../../assets/images/user--icon.png"
              class="me-2"
              style="width: 30px"
            />
            <span class="username mb-1"> {{ username }}</span>
          </div>

          <b-input
            class="mt-5 input_changePass"
            :class="classinputC"
            v-model="password_old"
            type="password"
            :placeholder="currentPass"
            password-reveal
            @input="inputData"
          >
          </b-input>

          <b-input
            class="mt-4 input_changePass"
            :class="classinputP"
            v-model="password_new"
            type="password"
            :placeholder="newPass"
            password-reveal
            @input="inputData"
          >
          </b-input>

          <b-input
            class="mt-4 mb-5 input_changePass"
            :class="classinputN"
            v-model="password_con"
            type="password"
            :placeholder="newPass2"
            password-reveal
            @input="inputData"
          >
          </b-input>
          <p v-if="errorMsg" class="errorMsg">
            {{ errorMsg }}
          </p>
          <div
            class="mt-5 btn_submitPass vs-con-loading__container"
            @click="resetPassword"
            ref="loadableButton"
          >
            resetBtn
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import storage from "@/service/storage";

export default {
  data() {
    return {
      username: this.$store.getters.getUserData.username,
      credit: 12128436,
      lang: "",
      popupActivo: false,
      disabledBtn: false,
      password_old: "",
      password_new: "",
      password_con: "",
      classinputC: "",
      classinputP: "",
      classinputN: "",
      errorMsg: "",
      checkInput: false,
    };
  },
  methods: {
    setleng() {
      if (localStorage.lang != undefined) {
        storage.setLang(localStorage.lang);
        this.lang = localStorage.lang;
      } else {
        storage.setLang("th");
        this.lang = "th";
      }

      this.$i18n.locale = this.lang;
    },
    settingLang(lang) {
      this.lang = lang;
      storage.setLang(lang);
      this.$i18n.locale = lang;
    },
    btnLoading() {
      this.$vs.loading({
        color: "#fff",
        container: this.$refs.loadableButton,
        scale: 0.45,
      });
    },
    closeLoading() {
      this.$vs.loading.close(this.$refs.loadableButton);
      this.$vs.loading.close();
    },
  },

  computed: {},
  watch: {},
};
</script>
<style>
.errorMsg {
  color: red;
}

.classErr--inputT_ input,
.classErr--inputTs_ input,
.classErr--inputDate,
.err_editor .toastui-editor-defaultUI {
  border: 1px solid #d80101 !important;
}
</style>
