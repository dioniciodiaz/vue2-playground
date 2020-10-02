import dayjs from "dayjs";

const getTimeLapse = time => {
  const dateIn = dayjs(time.in);
  const dateOut = dayjs(time.out);
  return dateOut.diff(dateIn, "m");
};

const getBreaksFormated = (breaks, name, type) => {
  const atendance = breaks.map(rest => {
    const timelapse = getTimeLapse(rest);
    const breakHistoryTemplate = { ...rest, name, type, timelapse };

    return breakHistoryTemplate;
  });
  return atendance;
};

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
    commit("UPDATE_ATTENDANCE", payload);
  }
};

const getters = {
  activeAttendance(state) {
    return state.asistance.filter(item => !!item.active);
  },
  inactiveAttendance(state) {
    return state.asistance.filter(item => !item.active);
  },
  historyAttendance(state, getters) {
    const atendance = getters.inactiveAttendance
      .map(attendance => {
        const { precense, breaks, lunch, name } = attendance;
        const historyTemplate = { ...precense, name, type: "In/out" };
        const breaksFormated = getBreaksFormated(breaks, name, "Break");
        let lunchFormated = [];
        if (lunch.in !== "") {
          lunchFormated = getBreaksFormated([lunch], name, "Lunch");
        }
        return [historyTemplate, ...breaksFormated, ...lunchFormated];
      })
      .flat();

    return atendance;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
