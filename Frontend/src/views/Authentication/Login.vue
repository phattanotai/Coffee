<template>
  <div
    id="login"
    class="d-flex align-items-center justify-content-center vh-100"
  >
    <div class="divLogin">
      <div class="pt-4">
        <div class="row m-0">
          <div class="col-5 d-flex align-items-center justify-content-center">
            <v-img
              max-height="700"
              max-width="350"
              contain
              class="rounded-img"
              src="images/Benefits-of-Coffee.jpeg"
            ></v-img>
          </div>
          <div class="col-7 formLogin p-5">
            <div
              class="centerx labelx w-100"
              v-on:submit.prevent="login"
              v-on:keypress.enter.prevent="login"
            >
              <vs-input label="Username" class="w-100" v-model="username" />
              <vs-input
                type="password"
                label="Password"
                v-model="password"
                class="mt-3 w-100"
              />
              <vs-button
                :disabled="disabledBtn"
                id="button-with-loading"
                ref="loadableButton"
                @click="login"
                color="primary"
                type="filled"
                class="vs-con-loading__container btn-login mt-5 rounded-pill w-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.101"
                  height="30.316"
                  viewBox="0 0 28.101 30.316"
                >
                  <g
                    id="logout"
                    transform="translate(28.101 30.316) rotate(180)"
                  >
                    <g id="Group_26" data-name="Group 26">
                      <path
                        id="Path_40"
                        data-name="Path 40"
                        d="M13.537,28.579H5.63a3.9,3.9,0,0,1-3.892-3.892V5.63A3.9,3.9,0,0,1,5.63,1.737h8.036a.869.869,0,0,0,0-1.737H5.63A5.636,5.636,0,0,0,0,5.63V24.687a5.636,5.636,0,0,0,5.63,5.63h7.907a.869.869,0,0,0,0-1.737Z"
                        fill="#fff"
                      />
                      <path
                        id="Path_41"
                        data-name="Path 41"
                        d="M21.2,5.776,15.679.256A.869.869,0,1,0,14.45,1.485l4.04,4.04H.869a.869.869,0,0,0,0,1.737H18.491L14.45,11.3a.872.872,0,0,0,.611,1.486.848.848,0,0,0,.611-.257l5.52-5.52A.868.868,0,0,0,21.2,5.776Z"
                        transform="translate(28.101 21.56) rotate(180)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
                <span class="txt-login">Login</span>
              </vs-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import alertService from "@/service/alertService";
export default {
  name: "Login",
  data: () => ({
    username: process.env.NODE_ENV === "development" ? "admin" : "",
    password: process.env.NODE_ENV === "development" ? "12345678" : "",
    disabledBtn: false,
    loading: null,
    backgroundLoading: "primary",
    colorLoading: "#fff",
  }),
  methods: {
    async login() {
      if (!this.username) {
        alertService.warning("username cannot be empty");
      } else if (!this.password) {
        alertService.warning("password cannot be empty");
      } else {
        this.disabledBtn = true;
        this.openLoading();
        const loginData = {
          username: this.username,
          password: this.password,
        };
        await this.$store.dispatch("doLogin", loginData);
        this.disabledBtn = false;
        this.closeLoading();
      }
    },
    openLoading() {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: this.$refs.loadableButton.$el,
        scale: 0.45,
      });

      this.$vs.loading({
        type: "default",
      });
    },
    closeLoading() {
      this.$vs.loading.close(this.$refs.loadableButton.$el);
      this.$vs.loading.close();
    },
  },
};
</script>
<style>
.rounded-img {
  border-radius: 20%;
}

#login {
  background: transparent linear-gradient(165deg, #ffffff 0%, #ebebeb 100%) 0%
    0% no-repeat padding-box !important;
}

#login .divLogin {
  min-width: 950px;
  min-height: 496px;
  background: transparent linear-gradient(199deg, #3f90ff 0%, #0057e3 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 25px 30px #00000029;
  border-radius: 20px;
}

#login .formLogin {
  min-height: 472px;
  background: transparent linear-gradient(180deg, #ffffff 0%, #e0ecff 100%) 0%
    0% no-repeat padding-box;
  border-radius: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#login .formLogin label {
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #8c98a9;
  text-transform: capitalize;
}

#login .vs-con-input-label {
  width: 100%;
}

#login .vs-input--label {
  color: #8c98a9;
}

#login input.vs-input--input {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  color: #000000;
  height: 58px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e6e7e9 !important;
  border-radius: 50rem;
  padding: 1rem !important;
}

#login .btn-login {
  height: 58px;
}

#login .btn-login svg {
  position: relative;
  top: -3px;
  margin-right: 10px;
}

#login .btn-login span.txt-login {
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  text-transform: uppercase;
}

.box-loading {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
}
</style>
