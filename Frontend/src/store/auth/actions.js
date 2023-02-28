import authService from "@/service/authService";
import alertService from "@/service/alertService";
import storage from "@/service/storage";
import router from "../../router";

export default {
  async doLogin(context, loginData) {
    try {
      context.commit("loginStart");
      const loginDataRes = await authService.login(loginData).catch((error) => {
        alertService.error(error.message);
        context.commit("loginStop");
        throw error;
      });
      // check response data
      if (loginDataRes) {
        context.commit("updateAccessToken", loginDataRes.jwt);
        context.commit("setUserData", loginDataRes.user);
        storage.setToken(loginDataRes.jwt);
        alertService.success("Login Success");
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        alertService.warning("Login Fail");
      }
      context.commit("loginStop");
      return;
    } catch (error) {
      return;
    }
  },
  fetchAccessToken(context) {
    context.commit("updateAccessToken", storage.getToken());
  },
  doLogout(context) {
    storage.clearToken();
    context.commit("logout");
    router.push("/login");
    context.commit("loginStop");
  },
  async fetchUserData(context) {
    const data = await authService.getUserInfo().catch((error) => {
      console.log(3, error);
      throw error;
    });
    if (data) {
      context.commit("setUserData", data);
    }
  },
};
