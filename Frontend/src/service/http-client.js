import axios from "axios";
import storage from "./storage";
import router from "../router";

export const URL_ENDPOINT = process.env.VUE_APP_URL_ENDPOINT;
// set http request headers config
export const setHeaders = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (storage.getToken()) {
    headers.authorization = "Bearer " + storage.getToken();
  }
  return headers;
};

export const http = () => {
  return axios.create({
    baseURL: URL_ENDPOINT,
    timeout: 60000, // indicates, 1000ms ie. 1 second
    headers: setHeaders(),
  });
};

export const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
};

const checkAuth = (error) => {
  if (error.response?.data?.error?.message === "Unauthorized") {
    storage.clearToken();
    router.push("/login");
  }
};

export const returnErrorData = (error, service = "") => {
  if (process.env.NODE_ENV === "development") {
    console.log("Service " + service + " : ", error);
  }
  return error;
};

export const checkStatusError = (error) => {
  let errorMessage = {
    message: "",
    status: "",
  };
  if (error.response?.status === 400) {
    errorMessage = {
      message: error.response?.statusText,
      status: error.response?.status,
    };
  } else if (error.response?.status === 401) {
    errorMessage = {
      message: error.response?.statusText,
      status: error.response?.status,
    };
  } else if (error.response?.status === 404) {
    errorMessage = {
      message: error.response?.statusText,
      status: error.response?.status,
    };
  } else if (error.response?.status === 405) {
    errorMessage = {
      message: error.response?.statusText,
      status: error.response?.status,
    };
  } else if (error.response?.status === 500) {
    errorMessage = {
      message: "Internet Server Error",
      status: error.response?.status,
    };
  }

  return errorMessage;
};

export default {
  // get method
  async get(path) {
    try {
      return await http()
        .get(path)
        .then((response) => {
          return response;
        })
        .catch((e) => {
          checkAuth(e);
          throw e;
        });
    } catch (error) {
      throw returnErrorData(error);
    }
  },

  //post method
  async post(path, data) {
    try {
      return await http()
        .post(path, data)
        .then((response) => {
          return response;
        })
        .catch((e) => {
          checkAuth(e);
          throw e;
        });
    } catch (error) {
      throw returnErrorData(error);
    }
  },

  // delete method
  async delete(path, params) {
    try {
      return await http()
        .delete(path, { params })
        .then((response) => {
          return response;
        })
        .catch((e) => {
          checkAuth(e);
          throw e;
        });
    } catch (error) {
      throw returnErrorData(error);
    }
  },

  // put method
  async update(path, data) {
    try {
      return await http()
        .put(path, data)
        .then((response) => {
          return response;
        })
        .catch((e) => {
          checkAuth(e);
          throw e;
        });
    } catch (error) {
      throw returnErrorData(error);
    }
  },

  upload(fileData, url) {
    const formData = new FormData();

    Array.from(fileData).forEach((file) => {
      formData.append("image", file);
    });

    return this.post(url, formData).catch((error) => {
      return error.response;
    });
  },
};
