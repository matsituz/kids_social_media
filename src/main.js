import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueGtag from "vue-gtag";
import { i18n } from "@/i18n";
import VueCookies from "vue-cookies";
import FsLightbox from "fslightbox-vue/v3";
import "./assets/fonts/stylesheet.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "element-plus/dist/index.css";
import "v-calendar/style.css";
import { setupCalendar, Calendar } from "v-calendar";
import ru from "element-plus/dist/locale/ru.mjs";
import uz from "element-plus/dist/locale/uz-uz.mjs";

const lang = localStorage.getItem("lang");

const locales = {
  ru,
  uz,
};

// import("element-plus")
//   .then((ElementPlus) => {
//     createApp(App).use(ElementPlus, {
//       locale: locales[lang],
//     });
//   })
//   .catch((error) => {
//     console.error("Ошибка динамического импорта ElementPlus:", error);
//   });

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then((registration) => {
//       console.log("Service Worker зарегистрирован:", registration);
//     })
//     .catch((error) => {
//       console.log("Ошибка при регистрации Service Worker:", error);
//     });
// }

if (store.getters["auth/isAuth"]) {
  store.dispatch("getMe");
}

createApp(App)
  .component("VCalendar", Calendar)
  .use(store)
  .use(router)
  .use(i18n)
  .use(setupCalendar, {})
  .use(FsLightbox)
  .use(VueCookies)
  .use(ElementPlus, {
    locale: locales[lang],
  })
  .use(VueAwesomeSwiper)
  .use(
    VueGtag,
    {
      config: {
        id: "G-CCVWT9XX6Y",
      },
    },
    router
  )
  .mount("#app");
