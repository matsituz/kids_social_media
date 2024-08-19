<template>
  <div class="el-tabs__content signup-tab-inner">
    <div v-if="!hasName" class="names">
      <form class="auth-form">
        <input
          type="text"
          class="auth-form__input"
          :placeholder="$t('signup.first_name')"
          v-model="first_name"
        />
        <input
          type="text"
          class="auth-form__input"
          :placeholder="$t('signup.last_name')"
          v-model="last_name"
        />
      </form>
      <button
        @click="hasName = true"
        class="auth-form__btn"
        :disabled="!first_name || !last_name"
      >
        {{ $t("signup.next") }}
      </button>
    </div>
    <div v-else class="phones">
      <div v-if="!hasPhone" class="phone">
        <div class="input-wrapper">
          <p class="inputPhone">+998 |</p>
          <input
            type="text"
            :placeholder="$t('signup.phone')"
            :class="['auth-form__input', {'error-border': errMsg === $t('signup.already-created')}]"
            style="padding-left: 70px"
            v-model="phone"
          />
        </div>
        <div class="auth-form__check" style="margin-top: 24px">
          <input type="checkbox" v-model="checkPhone" />
          <label @click="checkPhone = !checkPhone">{{
            $t("login.phone-checked")
          }}</label>
        </div>
        <button
          @click="sendCode"
          class="auth-form__btn"
          :disabled="!phone || !checkPhone || !isPhoneValid"
        >
          {{ $t("signup.next") }}
        </button>
      </div>
      <div v-else-if="hasPhone || !hasCode" class="code">
        <p v-if="resent" class="desc">{{ $t("signup.resent") }}</p>
        <div class="input-wrapper">
          <input
            type="text"
            class="auth-form__input"
            :placeholder="$t('signup.code')"
            v-model="code"
          />
          <p
            @click="
              sendCode();
              resentCode();
            "
            class="resend"
          >
            Resend
          </p>
        </div>
        <p class="desc"><span>*</span> {{ $t("signup.enter_code") }}</p>
        <button @click="verifyPhone" class="auth-form__btn" :disabled="!code">
          {{ $t("login.button-id") }}
        </button>
      </div>
    </div>
    <p class="signup-tab-inner_link">
      {{ $t("signup.to-signin") }}
      <router-link to="/" class="signin-link">Sign in</router-link>
    </p>
  </div>
</template>
<script setup>
import {
  ref,
  computed,
  defineEmits,
  defineProps,
  watch,
  watchEffect,
} from "vue";
import { useI18n } from "vue-i18n";
import "./style/signup-tab-inner.css";

const emit = defineEmits(["code-sent", "verify", "resend"]);
const props = defineProps(["verified", "errMsg"]);

const { t } = useI18n();

const first_name = ref("");
const last_name = ref("");
const phone = ref("");
const checkPhone = ref(false);
const code = ref("");

const hasName = ref(false);
const hasPhone = ref(false);
const hasCode = ref(false);
const resent = ref(false);

const phoneRegex = /^\+998\d{9}$/;

const isPhoneValid = computed(() => {
  return phoneRegex.test("+998" + phone.value);
});

const sendCode = () => {
  emit("code-sent", "+998" + phone.value);
  watchEffect(() => {
    if (props.errMsg === t("signup.already-created")) {
      hasPhone.value = false;
    } else {
      hasPhone.value = true;
    }
  });
};

const verifyPhone = () => {
  hasCode.value = true;
  emit("verify", { phone: "+998" + phone.value, code: code.value });
};

watchEffect(console.log(hasPhone.value));

watch(
  () => props.verified,
  (newValue) => {
    if (newValue) {
      const data = {
        first_name: first_name.value,
        last_name: last_name.value,
        phone: "+998" + phone.value,
        type: "student",
      };
      emit("signup", data);
    }
  }
);

const resentCode = () => {
  resent.value = true;
  setTimeout(() => {
    resent.value = false;
  }, 2000);
};
</script>