const state = {
  users: [
    { id: 1, name: "dionicio" },
    { id: 2, name: "pablo" }
  ]
};

const mutations = {
  SET_USERS(state, data) {
    state.users = data;
  }
};

const actions = {
  setData({ commit }, payload) {
    commit("SET_USERS", payload);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
