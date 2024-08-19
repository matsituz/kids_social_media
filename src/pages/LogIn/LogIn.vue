<template>
  <main class="login">
    <div class="login__header">
      <div class="login__header-wrapper container">
        <div class="mars-logo">
          <img src="@/assets/mars-logo.png" alt="mars-logo" />
        </div>
        <div class="lang" v-popover="popoverRef">
          <img src="@/assets/lang-icon.svg" alt="mars-logo" />
          <p>{{ lang === "ru" ? "Рус" : "O'zb" }}</p>
        </div>
      </div>
    </div>
    <div class="login__body">
      <div class="login__body-wrapper">
        <div class="login__body-header">
          <div class="mars-logo">
            <img src="@/assets/mars-logo.png" alt="mars-logo" />
          </div>
          <button
            v-if="!offerTab"
            class="login__body-header-offer_bottom"
            @click="offerTab = !offerTab"
          >
            {{ $t("login.tabs.offerta") }}
            <img src="@/assets/clipboard-text.svg" alt="" />
          </button>
          <button v-else class="login__body-header-offer download">
            <a :href="mediaUrl + file" target="_blank" download="true">
              {{ $t("login.check-offerta") }}
            </a>
            <img src="@/assets/offerta-icon.svg" alt="" />
          </button>
        </div>
        <offer-tab v-if="offerTab" @term="handleTerm" />
        <log-in-tabs
          v-if="!showQr && !offerTab"
          @showQr="showQr = !showQr"
          :offer-tab="offerTab"
          @offer-required="offerTab = true"
        />
        <button
          v-if="offerTab"
          class="login__body-header-offer"
          @click="offerTab = !offerTab"
          style="justify-content: center; margin-top: 50px"
        >
          {{ $t("login.tabs.login") }}
          <img src="@/assets/offer.svg" alt="" />
        </button>
        <qr-code v-if="showQr" :userType="activeName" />
        <p v-if="showQr" class="toggleQr" @click="showQr = !showQr">
          {{ $t("login.enterwithid") }}
        </p>
      </div>
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
import "./style/login.css";
import { LogInTabs } from "@/widgets";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import OfferTab from "@/widgets/OfferTab/OfferTab.vue";
import HeaderFeature from "@/features/Header/HeaderFeature.vue";

export default {
  components: {
    LogInTabs,
    OfferTab,
    HeaderFeature,
  },
  setup() {
    const showQr = ref(false);
    const showVideo = ref(false);
    const langModale = ref(false);
    const offerTab = ref(false);
    const popoverRef = ref();

    const activeName = ref("student");

    const router = useRouter();

    const { locale } = useI18n();

    const lang = localStorage.getItem("lang") || locale.value;

    onBeforeMount(() => {
      activeName.value = localStorage.getItem("roleInSpace") || "student";

      if (window.innerWidth >= 1030) {
        showVideo.value = true;
      } else {
        showVideo.value = false;
      }

      if (localStorage.getItem("access_token")) {
        router.push({ name: `${activeName.value}-main` });
      }
    });

    const file = ref("");

    const handleTerm = (offertaValue) => {
      file.value = offertaValue.file;
    };

    const mediaUrl = process.env.VUE_APP_MEDIA_URL;

    return {
      showQr,
      showVideo,
      langModale,
      lang,
      offerTab,
      popoverRef,
      file,
      handleTerm,
      mediaUrl,
    };
  },
};
</script>
