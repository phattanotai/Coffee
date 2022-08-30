import httpClient, { checkStatusError, returnErrorData } from "./http-client";

// get
const getTypes = async () => {
  try {
    const res = await httpClient
      .get("/api/master-data/types")
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getTypes");
  }
};

const getOptions = async () => {
  try {
    const res = await httpClient
      .get("/api/master-data/options")
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getOptions");
  }
};

const getTables = async () => {
  try {
    const res = await httpClient
      .get("/api/master-data/tables")
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getTables");
  }
};

const getSweetness = async () => {
  try {
    const res = await httpClient
      .get("/api/master-data/sweetness")
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getSweetness");
  }
};

// update

// create

export const func = {
  getOptions,
  getSweetness,
  getTables,
  getTypes,
};

export default func;
