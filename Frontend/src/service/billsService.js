import httpClient, { checkStatusError, returnErrorData } from "./http-client";

// create
const createBill = async (createData) => {
  try {
    const res = await httpClient
      .post("/api/bills", createData)
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
const getBills = async () => {
  try {
    const res = await httpClient.get("/api/bills").catch((error) => {
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

const getBillStatus = async () => {
  try {
    const res = await httpClient.get("/api/bills/status").catch((error) => {
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

// update
const updateBill = async (updateData) => {
  try {
    const res = await httpClient
      .update("/api/bills", updateData)
      .catch((error) => {
        throw checkStatusError(error);
      });
    if (res.data.status === 200) {
      return res.data.data;
    } else {
      return false;
    }
  } catch (error) {
    throw returnErrorData(error, "updateSortManagement");
  }
};

// create
export const func = {
  createBill,
  updateBill,
  getBills,
  getBillStatus,
};

export default func;
