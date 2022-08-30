import httpClient, {
  checkStatusError,
  dataURIToBlob,
  returnErrorData,
} from "./http-client";

const getPromotion = async (params) => {
  try {
    let path;
    if (params) {
      path = `pagination[page]=${params.currentPage}&pagination[pageSize]=${params.perPage}`;
    }
    const res = await httpClient
      .get("/api/promotions?" + path)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getPromotion");
  }
};

const createPromotion = async (dateCreate) => {
  try {
    const res = await httpClient
      .post("/api/promotions", dateCreate)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "createPromotion");
  }
};

const getPromotionById = async (promotionId) => {
  try {
    const res = await httpClient
      .get(`/api/promotions/${promotionId}`)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "getPromotionById");
  }
};

const updatePromotion = async (dateUpdate, promotionId) => {
  try {
    const res = await httpClient
      .update(`/api/promotions/${promotionId}`, dateUpdate)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "updatePromotion");
  }
};

const deletePromotionById = async (promotionId) => {
  try {
    const res = await httpClient
      .delete(`/api/promotions/${promotionId}`)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "deletePromotionById");
  }
};

const uploadPromotionImg = async (imgBase64) => {
  try {
    const file = dataURIToBlob(imgBase64);
    const res = await httpClient.upload([file]);
    if (res.status === 200) {
      return res.data;
    } else {
      if (res.status === 400) {
        throw res.data.error.name;
      }
      throw res.data;
    }
  } catch (error) {
    throw returnErrorData(error, "uploadPromotionImg");
  }
};

export const func = {
  getPromotion,
  createPromotion,
  getPromotionById,
  updatePromotion,
  deletePromotionById,
  uploadPromotionImg,
};

export default func;
