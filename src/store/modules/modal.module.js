export default {
  namespaced: true,
  state() {
    return {
      isModal: false,
    };
  },
  mutations: {
    open(state) {
      state.isModal = !state.isModal;
      if (state.isModal === true) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
};
