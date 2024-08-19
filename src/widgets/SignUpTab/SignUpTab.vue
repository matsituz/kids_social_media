<template>
  <div class="signup-tab">
    <div class="signup-tab__header">
      <img src="@/assets/mars-logo.png" alt="mars-logo" />
    </div>
    <div class="signup-tab__body">
      <h1 v-if="!registered" class="auth-form__heading">
        {{ $t("signup.heading") }}
      </h1>
      <p v-if="errMsg" :class="['error', {'already-created': errMsg === $t('signup.already-created')}]">{{ errMsg }}</p>
      <sign-up-tab-inner
        v-if="!registered"
        @code-sent="sendVerificationCode"
        @verify="verifyPhone"
        @signup="signup"
        :verified="verified"
        :errMsg="errMsg"
      />
      <div v-else class="el-tab__content registered">
        <h1 class="auth-form__heading">
          {{ $t("signup.heading") }}
        </h1>
        <img src="@/assets/success.svg" alt="" />
        <router-link class="to-login" :to="'/'">
          {{ $t("signup.login") }} <img src="@/assets/offer.svg" alt=""
        /></router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, ref } from "vue";
import "./style/signup-tab.css";
import SignUpTabInner from "@/entities/SignUpTabInner/SignUpTabInner.vue";
import { sendCode } from "./api/send-code";
import { verify } from "./api/verify-phone";
import { postSignup } from "./api/post-signup";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

defineComponent(["SignUpTabInner"]);

const registered = ref(false);
const errMsg = ref("");
const verified = ref(false);

const route = useRoute();
const referralCode = route.query.referral_code;

const { t } = useI18n();

const sendVerificationCode = async (phone) => {
  errMsg.value = ""
  try {
    await sendCode({ phone: phone, for_register: true });
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.detail === "Already created"
    ) {
      errMsg.value = t("signup.already-created");
    } else {
      console.error("Signup error:", error);
    }
  }
};

const verifyPhone = async (code_data) => {
  verified.value = false;
  const response = await verify(code_data);
  if (!response.success && response.data.detail?.message === false) {
    errMsg.value = t("login.wrong-code");
  } else {
    verified.value = true;
  }
};

const signup = async (data) => {
  if (verified.value) {
    await postSignup(data, referralCode);
    registered.value = true;
  }
};
</script>