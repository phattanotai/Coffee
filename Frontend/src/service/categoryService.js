import httpClient, { checkStatusError, returnErrorData } from "./http-client";

// create
const createCategory = async (createData) => {
  try {
    const res = await httpClient
      .post("/api/categories", createData)
      .catch((error) => {
        throw checkStatusError(error);
      });
    console.log(res);
    if (res.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "createCategory");
  }
};
// get
const getCategory = async () => {
  try {
    const res = await httpClient.get("/api/categories").catch((error) => {
      throw checkStatusError(error);
    });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "getCategory");
  }
};

// update
const updateCategory = async (updateData, id) => {
  try {
    const res = await httpClient
      .update("/api/categories/" + id, updateData)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "updateCategory");
  }
};

// delete
const deleteCategory = async (id) => {
  try {
    const res = await httpClient
      .delete("/api/categories/" + id)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "deleteCategory");
  }
};

export const func = {
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
};

export default func;
