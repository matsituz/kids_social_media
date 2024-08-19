// import {createApp} from "vue";
import { createI18n } from "vue-i18n";
import ru from "./ru.json";
import uz from "./uz.json";

// createApp().use(VueI18n);

const defaultLocale = "ru";
const lang = localStorage.getItem("lang");
localStorage.setItem('lang', lang || defaultLocale)

const messages = {
  uz,
  ru,
};

export const i18n = new createI18n({
  legacy: false,
  fallbackLocale: "ru",
  locale: lang || defaultLocale,
  messages,
});
