export const myMixins = {
  data() {
    return {
      bgColors: {
        0: "#7a5548",
        1: "#25c1a1",
        2: "#9d28ac",
        3: "#246bfd",
        4: "#673ab3",
        5: "#facc15",
        6: "#607d8a",
        7: "#00a9f1",
        8: "#8bc255",
        9: "#eb5024",
      },
      profileImage: {
        0: require("../assets/av-game.png"),
        1: require("../assets/av-hack.png"),
        2: require("../assets/av-code.png"),
      },
    };
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.lang = localStorage.getItem("lang");
      location.reload();
    },
  },
};