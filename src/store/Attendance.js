// const atendance = {
//   in: "date",
//   out: "date",
//   id: 1,
//   name: "dionicio",
//   breaks: [
//     { in: "date", out: "date" },
//     { in: "date", out: "date" }
//   ],
//   active: "boolean"
// };

const state = {
  asistance: []
};

const mutations = {
  ADD_ATTENDANCE(state, data) {
    state.asistance = [...state.asistance, data];
  },
  UPDATE_ATTENDANCE(state, data) {
    let asistance = [...state.asistance];
    let busIndex = asistance.findIndex(item => item.id === data.id);
    asistance[busIndex] = { ...data };
    state.asistance = [...asistance];
  }
};

const actions = {
  addAttendance({ commit }, payload) {
    commit("ADD_ATTENDANCE", payload);
  },
  updateAttendance({ commit }, payload) {
    commit("ADD_ATTENDANCE", payload);
  }
};

const getters = {
  activeAttendance() {
    return state.asistance.filter(item => item.active);
  },
  inactiveAttendance() {
    return state.asistance.filter(item => !item.active);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
