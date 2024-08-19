import { createStore } from "vuex";
import auth from "./modules/auth.module";
import modal from "./modules/modal.module";
import lang from "./modules/lang.module";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, modal, lang },
});
