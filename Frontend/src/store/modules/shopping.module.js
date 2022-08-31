import notifyService from "../../service/notifyService";
import oderService from "../../service/ordersService";
import billsService from "../../service/billsService";

const state = {
  orders: [],
  table: 0,
  amount: 0,
  duration: 0,
};

const getters = {
  getOrders(state) {
    return state.orders;
  },
  getSumOrder(state) {
    return state.orders.length;
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
  async createBills({ state }) {
    try {
      const billData = {
        amount: state.amount,
        duration: state.duration,
        table: state.table,
      };

      console.log(billData);

      const bill = await billsService.createBill(billData).catch((error) => {
        throw error;
      });

      if (bill) {
        const ordersData = [];

        for (const item of state.orders) {
          const data = {
            price: (item.price + item.afterPrice) * item.bpm,
            duration: (item.duration + item.afterDuration) * item.bpm,
            beverage: {
              id: item.beverageId,
            },
            bill: {
              id: bill.id,
            },
          };

          ordersData.push(data);
        }

        console.log(ordersData);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
