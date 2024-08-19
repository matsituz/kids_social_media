<template>
  <div v-if="login" class="header-right__popover">
    <div class="header-right__popover__el" @click="changeLang('uz')">
      <img src="@/assets/uzb-icon.svg" alt="" />
      <p>O'zbekcha</p>
    </div>
    <div class="header-right__popover__el" @click="changeLang('ru')">
      <img src="@/assets/rus-icon.svg" alt="" />
      <p>Русский</p>
    </div>
  </div>
  <div v-else class="header-right__popover">
    <router-link :to="'/my-space'" class="header-right__popover-profile">
      <img :src="mediaLink + imageUrl" alt="" />
      <p class="header-right__student-name">{{ student_name }}</p>
    </router-link>
    <div class="header-right__popover__el" @click="calendar = true">
      <img src="@/assets/attendance-icon.svg" alt="" />
      <p>{{ $t("main.attendance") }}</p>
    </div>
    <div
      class="header-right__popover__el"
      @click="passChange = true"
      v-if="isTest === 'development'"
    >
      <img src="@/assets/pass-logo.svg" alt="" />
      <p>{{ $t("header.change-password") }}</p>
    </div>
    <div class="header-right__popover__el" @click="phoneChange = true">
      <img src="@/assets/settings-icon.svg" alt="settings" />
      <p>{{ $t("header.settings") }}</p>
    </div>
    <div @click="langModal = true" class="header-right__popover__el">
      <img src="@/assets/lang-icon.svg" alt="" />
      <p>{{ lang === "ru" ? "Русский" : "O'zbekcha" }}</p>
    </div>
    <div class="header-right__popover__el" @click="logOut()">
      <img src="@/assets/logout-icon.svg" alt="" />
      <p>{{ $t("header.logout") }}</p>
    </div>

    <el-dialog v-model="calendar">
      <calendar-component />
    </el-dialog>
    <el-dialog v-model="passChange">
      <change-password />
    </el-dialog>
    <div class="settings">
      <el-dialog v-model="phoneChange">
        <change-phone @close="phoneChange = false" />
      </el-dialog>
    </div>
    <el-dialog align-center v-model="langModal" class="change-lang-modal"
      ><ChangeLang
    /></el-dialog>
  </div>
</template>

<script>
import "./style/header-popover.css";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CalendarComponent from "@/components/CalendarComponent.vue";
import ChangePassword from "../ChangePassword/ChangePassword.vue";
import ChangePhone from "../ChangePhone/ChangePhone.vue";
import { mediaLink } from "@/apiConfig/mediaLink";
import ChangeLang from "@/features/ChangeLang/ChangeLang.vue";
import { useI18n } from "vue-i18n";

export default {
  components: {
    CalendarComponent,
    ChangePassword,
    ChangePhone,
    ChangeLang,
  },
  props: ["student_name", "imageUrl", "login"],
  setup() {
    const calendar = ref(false);
    const passChange = ref(false);
    const phoneChange = ref(false);
    const langModal = ref(false);

    const isTest = process.env.NODE_ENV;

    const store = useStore();
    const router = useRouter();

    const lang = localStorage.getItem("lang") || locale.value;

    const logOut = () => {
      store.commit("auth/logout");
      router.push("/");
      localStorage.removeItem("firstShowingModal");
    };

    const { locale } = useI18n();

    const changeLang = (lang) => {
      locale.value = lang;
      localStorage.setItem("lang", lang);
      location.reload();
    };

    return {
      calendar,
      passChange,
      phoneChange,
      isTest,
      logOut,
      mediaLink,
      langModal,
      lang,
      changeLang,
    };
  },
};
</script>
