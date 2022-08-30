import httpClient, { returnErrorData } from "./http-client";

const login = async (loginData) => {
  try {
    const res = await httpClient
      .post("/api/auth/login", {
        username: loginData.username.trim(),
        password: loginData.password.trim(),
      })
      .catch((error) => {
        if (error.response.data.error) {
          throw error.response.data.error;
        } else {
          throw error;
        }
      });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "login");
  }
};

const getUserInfo = async () => {
  try {
    const res = await httpClient.get("/api/users/me").catch((error) => {
      if (error.response.data.error) {
        throw error.response.data.error;
      } else {
        throw error.message;
      }
    });

    if (res.data.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getUserInfo");
  }
};

const parseJwt = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
};

export default {
  login,
  parseJwt,
  getUserInfo,
};
export { login, parseJwt, getUserInfo };
