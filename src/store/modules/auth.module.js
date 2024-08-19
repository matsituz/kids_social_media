import api from "@/apiConfig/api";

export default {
  namespaced: true,
  state() {
    return {
      access: localStorage.getItem("access_token"),
      refresh: localStorage.getItem("refresh_token"),
    };
  },
  mutations: {
    setToken(state, tokens) {
      state.access = tokens.access;
      state.refresh = tokens.refresh;
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);
    },
    logout(state) {
      state.access = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("activeCourse");
      localStorage.removeItem("firstShowingModal");
      localStorage.removeItem("studentInfo");

      location.reload();
    },
    async refreshToken(state) {
      await api
        .get(`/auth/token`, {
          headers: {
            Authorization: `Bearer ${state.refresh}`,
          },
        })
        .then(async (res) => {
          localStorage.setItem("access_token", res.data.access_token);
          state.access = res.data.access_token;
        })
        .catch((e) => {
          if (e.response.status === 403) {
            state.access = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            location.reload();
          }
        })
        .finally(async () => {
          // await getStudentInfo().then((res) =>
          //   setCookie("studentInfo", JSON.stringify(res.data))
          // );
        });
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        console.log("Dispatching login action with payload:", payload);

        const res = await api.post(`/auth/signin`, payload);

        // Save user info to Vuex store
        commit("getUserInfo", res.data.user);

        // Set access and refresh tokens
        commit(
          "auth/setToken",
          {
            access: res.data.access_token,
            refresh: res.data.refresh_token,
          },
          { root: true }
        );

        //   const studentRes = await getStudentInfo();

        // // Check and sanitize first_name if needed
        // if (
        //   studentRes.data.contact &&
        //   studentRes.data.contact.first_name &&
        //   studentRes.data.contact.first_name.charAt(0) === ";"
        // ) {
        //   studentRes.data.contact.first_name =
        //     studentRes.data.contact.first_name.slice(1);
        // }

        // setCookie("studentInfo", JSON.stringify(studentRes.data), 4);

        await dispatch("getMe", null, { root: true });
      } catch (error) {
        console.error("Error in login action:", error);
        throw error;
      }
    },
  },

  getters: {
    token(state) {
      return state.access;
    },
    isAuth(_, getters) {
      return !!getters.token;
    },
  },
};
