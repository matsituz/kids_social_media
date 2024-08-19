<template>
  <main class="signup">
    <div class="signup__header">
      <div class="signup__header-wrapper container">
        <div class="mars-logo">
          <img src="@/assets/mars-logo.png" alt="mars-logo" />
        </div>
        <div class="lang" v-popover="popoverRef">
          <img src="@/assets/lang-icon.svg" alt="">
          <p>{{ lang === "ru" ? "Рус" : "O'zb" }}</p>
        </div>
      </div>
    </div>
    <div class="signup__body">
        <sign-up-tab />
    </div>
  </main>
  <el-popover
    ref="popoverRef"
    trigger="click"
    popper-class="header-right__popover-wrapper"
    popper-style="width: unset"
  >
    <header-feature :login="true" />
  </el-popover>

  
</template>
<script>
import { useI18n } from "vue-i18n";
import "./style/signup.css";
import HeaderFeature from "@/features/Header/HeaderFeature.vue";
import SignUpTab from "@/widgets/SignUpTab/SignUpTab.vue"
import { ref } from 'vue';

export default {
  components: {
    HeaderFeature,
    SignUpTab
  },
  setup() {
    const { locale } = useI18n();
    const popoverRef = ref();

    const lang = localStorage.getItem("lang") || locale.value;

    return {
      lang,
      popoverRef
    };
  },
};
</script>