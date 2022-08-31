import httpClient, {
  checkStatusError,
  dataURIToBlob,
  returnErrorData,
} from "./http-client";

// create
const createBeverages = async (createData) => {
  try {
    const res = await httpClient
      .post("/api/beverages", createData)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "updateSortManagement");
  }
};

// get
const getBeverages = async () => {
  try {
    const res = await httpClient.get("/api/beverages").catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getBeverages");
  }
};

// update
const updateBeverages = async (updateData, id) => {
  try {
    const res = await httpClient
      .update("/api/beverages/" + id, updateData)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "updateSortManagement");
  }
};
const uploadImage = async (imgBase64) => {
  try {
    const file = dataURIToBlob(imgBase64);
    const res = await httpClient.upload([file], "/api/beverages/image");
    if (res.data.status === 200) {
      return res.data;
    } else {
      if (res.status === 201) {
        throw res.data.message;
      }
      throw res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "uploadPromotionImg");
  }
};
// delete
const deleteBeverages = async (id) => {
  try {
    const res = await httpClient
      .delete("/api/beverages/" + id)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "updateSortManagement");
  }
};

export const func = {
  getBeverages,
  uploadImage,
  updateBeverages,
  createBeverages,
  deleteBeverages,
};

export default func;
