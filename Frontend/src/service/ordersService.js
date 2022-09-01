import httpClient, { checkStatusError, returnErrorData } from "./http-client";

// create
const createOrder = async (createData) => {
  try {
    const res = await httpClient
      .post("/api/orders", createData)
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

// create
const createOrderAll = async (createData) => {
  try {
    const res = await httpClient
      .post("/api/orders/all", createData)
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
const getOrders = async () => {
  try {
    const res = await httpClient.get("/api/orders").catch((error) => {
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

// get
const getOrdersByBill = async (id) => {
  try {
    const res = await httpClient
      .get("/api/orders/byBill/" + id)
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

const getOrderStatus = async () => {
  try {
    const res = await httpClient.get("/api/orders/status").catch((error) => {
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
const updateOrder = async (updateData) => {
  try {
    const res = await httpClient
      .update("/api/orders", updateData)
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

// create

export const func = {
  getOrders,
  getOrdersByBill,
  createOrder,
  createOrderAll,
  updateOrder,
  getOrderStatus,
};

export default func;
