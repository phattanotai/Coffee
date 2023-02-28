import notifyService from "../../service/notifyService";
import oderService from "../../service/ordersService";
import billsService from "../../service/billsService";

const state = {
  orders: [],
  table: 0,
  amount: 0,
  duration: 0,
  billId: 0,
};

const getters = {
  getOrders(state) {
    return state.orders;
  },
  getSumOrder(state) {
    return state.orders.length || "0";
  },
  getTable(state) {
    return state.table;
  },
  getAmount(state) {
    return state.amount;
  },
  getDuration(state) {
    return state.duration;
  },
  getBillId(state) {
    return state.billId;
  },
};

const actions = {
  async addOrder({ commit }, data) {
    try {
      commit("ADD_ORDER", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  removeOrder({ commit }, index) {
    try {
      commit("REMOVE_ORDER", index);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  editOrder({ commit }, data) {
    try {
      commit("EDIT_ORDER", data);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  changeTable({ commit }, tableNumber) {
    try {
      commit("CHANGE_TABLE", tableNumber);
    } catch (error) {
      notifyService.error(error.message);
    }
  },
  async createBills({ commit, state }) {
    try {
      const billData = {
        amount: state.amount,
        duration: state.duration,
        table: state.table,
      };

      const bill = await billsService.createBill(billData).catch((error) => {
        throw error;
      });

      if (bill) {
        const ordersData = [];
        state.billId = bill.id;
        localStorage.setItem("billId", bill.id);
        for (const item of state.orders) {
          const data = {
            price: (item.price + item.afterPrice) * item.bpm,
            duration: (item.duration + item.afterDuration) * item.bpm,
            total: item.bpm,
            beverage: {
              id: item.beverageId,
            },
            sweetness: item.sweetness,
            type: item.type,
            option: item.option,
            bill: {
              id: bill.id,
            },
          };
          ordersData.push(data);
        }

        const order = await oderService
          .createOrderAll(ordersData)
          .catch((error) => {
            throw error;
          });

        if (order) {
          commit("CLEAR_DATA");

          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      notifyService.error(error.message);
    }
  },
};

const mutations = {
  ADD_ORDER(state, data) {
    state.duration += (data.duration + data.afterDuration) * data.bpm;
    state.amount += (data.price + data.afterPrice) * data.bpm;
    state.orders.push(data);
  },
  REMOVE_ORDER(state, index) {
    console.log(state.orders[index]);

    state.duration -= state.orders[index].duration * state.orders[index].bpm;
    state.amount -= state.orders[index].price * state.orders[index].bpm;

    state.orders.splice(index, 1);
  },
  EDIT_ORDER(state, data) {
    const index = state.orders.findIndex((element) => element.id === data.id);
    if (index !== -1) {
      state.orders[index] = data;
      let d = 0;
      let p = 0;
      for (const item of state.orders) {
        d += (item.duration + item.afterDuration) * item.bpm;
        p += (item.price + item.afterPrice) * item.bpm;
      }

      state.duration = d;
      state.amount = p;
    }
  },
  CHANGE_TABLE(state, tableNumber) {
    console.log(tableNumber);
    state.table = tableNumber;
  },
  CLEAR_DATA(state) {
    state.orders = [];
    state.amount = 0;
    state.duration = 0;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
