import httpClient, { checkStatusError, returnErrorData } from "./http-client";

const getUserInfo = async (params) => {
  try {
    let path = "";
    if (params) {
      path += `pagination[page]=${params.currentPage}`;
      path += `&pagination[pageSize]=${params.perPage}`;
      path += `&filters[user][$containsi]=${params.searchData}`;
    }
    const res = await httpClient
      .get("/api/user-informations?" + path)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

const getUserReport = async (params) => {
  try {
    let path = "";
    if (params) {
      path += `pagination[page]=${params.currentPage}`;
      path += `&pagination[pageSize]=${params.perPage}`;
      path += `&filters[user]=${params.user}`;

      if (params.startDate) {
        path += `&filters[updatedAt][$between]=${params.startDate}`;
      }
      if (params.endDate) {
        path += `&filters[updatedAt][$between]=${params.endDate}`;
      }
    }

    const res = await httpClient
      .get("/api/user-information-reports?" + path)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

const getUserInfoLog = async (params) => {
  try {
    let path = "";
    if (params) {
      path += `pagination[page]=${params.currentPage}`;
      path += `&pagination[pageSize]=${params.perPage}`;
      path += `&filters[user]=${params.user}`;

      if (params.startDate) {
        path += `&filters[updatedAt][$between]=${params.startDate}`;
      }
      if (params.endDate) {
        path += `&filters[updatedAt][$between]=${params.endDate}`;
      }
    }
    const res = await httpClient
      .get("/api/user-information-logs?" + path)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

const getUserCreditLog = async (params) => {
  try {
    let path = "";
    if (params) {
      path += `pagination[page]=${params.currentPage}`;
      path += `&pagination[pageSize]=${params.perPage}`;
      path += `&filters[user]=${params.user}`;

      if (params.startDate) {
        path += `&filters[updatedAt][$between]=${params.startDate}`;
      }
      if (params.endDate) {
        path += `&filters[updatedAt][$between]=${params.endDate}`;
      }
    }
    const res = await httpClient
      .get("/api/user-information-credit-logs?" + path)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

const getUserTopupLog = async (params) => {
  try {
    let path = "";
    if (params) {
      path += `pagination[page]=${params.currentPage}`;
      path += `&pagination[pageSize]=${params.perPage}`;
      path += `&filters[user]=${params.user}`;

      if (params.startDate) {
        path += `&filters[updatedAt][$between]=${params.startDate}`;
      }
      if (params.endDate) {
        path += `&filters[updatedAt][$between]=${params.endDate}`;
      }
    }
    const res = await httpClient
      .get("/api/user-information-top-up-logs?" + path)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getSortManagement");
  }
};

export const func = {
  getUserCreditLog,
  getUserTopupLog,
  getUserInfo,
  getUserInfoLog,
  getUserReport,
};

export default func;
