function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default {
  namespaced: true,
  state() {
    return {
      taskId: getCookie("taskId") || null,
    };
  },
  mutations: {
    setTaskId(state, taskId) {
      state.taskId = taskId;
      document.cookie = `taskId=${taskId}`;
    },
  },
  actions: {
    changeTaskId({ commit }, payload) {
      commit("setTaskId", payload);
    },
  },
  getters: {
    taskId(state) {
      return state.taskId;
    },
  },
};
