<template>
  <div class="el-tabs__content">
    <form class="auth-form">
      <template v-if="!codeSent">
        <div class="input-wrapper">
          <input
            type="text"
            class="auth-form__input-offer"
            :placeholder="$t('login.full_name')"
            v-model="name"
          />
          <button v-if="name" class="verifyBtn" @click.prevent.stop="name = ''">
            <img src="@/assets/close-circle.svg" alt="" />
          </button>
        </div>
        <p v-if="hasName" class="error">{{ $t("login.no-name") }}</p>
        <p class="auth-form__pasport">
          <span style="color: #ea1e61">*</span> {{ $t("login.tabs.pasport") }}
        </p>
        <div class="input-wrapper">
          <p class="inputPhone">+998 |</p>
          <input
            type="text"
            :placeholder="$t('login.phone')"
            class="auth-form__input-offer"
            style="padding-left: 70px"
            v-model="phone"
          />
        </div>
        <p v-if="hasPhone" class="error">{{ $t("login.no-phone") }}</p>
        <p v-if="wrongPhone" class="error">
          {{ $t("login.wrong-phone") }}
        </p>
        <div class="auth-form__check">
          <input type="checkbox" v-model="checkPhone" />
          <label @click="checkPhone = !checkPhone">{{
            $t("login.phone-checked")
          }}</label>
        </div>
      </template>
      <template v-else>
        <p class="auth-form__pasport" v-if="codeResent">
          {{ $t("login.code-resent") }}
        </p>
        <div class="input-wrapper">
          <input
            type="text"
            class="auth-form__input-offer-code"
            :placeholder="$t('login.verification-code')"
            v-model="code"
          />
          <button
            class="auth-form_resend"
            @click.prevent.stop="resendCode($event)"
          >
            Resend
          </button>
        </div>
        <p v-if="wrongCode" class="error">{{ $t("login.wrong-code") }}</p>
        <p class="auth-form__pasport">
          <span style="color: #ea1e61">*</span> {{ $t("login.tabs.num-info") }}
        </p>
      </template>
    </form>
    <button
      v-if="!codeSent"
      class="auth-form__btn-offer"
      :disabled="!checkPhone || !name || !phone"
      style="margin-top: 20px"
      @click.prevent.stop="postCode($event)"
    >
      {{ $t("login.button-id") }}
    </button>
    <button
      v-else
      class="auth-form__btn"
      :disabled="!verify"
      style="margin-top: 20px"
      @click.prevent.stop="sendVerification($event)"
    >
      {{ $t("login.button-id") }}
    </button>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { sendCode } from "./api/post-code";
import { postVerification } from "./api/post-verification";

export default {
  setup(_, { emit }) {
    const verify = ref(false);
    const codeSent = ref(false);

    const name = ref("");
    const phone = ref("");
    const code = ref("");
    const hasName = ref(false);
    const hasPhone = ref(false);
    const wrongPhone = ref(false);
    const wrongCode = ref(false);
    const checkPhone = ref(false);
    const codeResent = ref(false);

    watchEffect(() => {
      if (code.value.length >= 5) {
        verify.value = true;
      }
    });

    const postCode = async (event) => {
      event.preventDefault(); // Предотвращаем стандартное действие кнопки
      hasName.value = false;
      hasPhone.value = false;
      wrongPhone.value = false;
      wrongCode.value = false;
      const phoneRegex = /^[0-9]{9}$/;

      if (phone.value && phoneRegex.test(phone.value)) {
        codeSent.value = true;
        const data = {
          phone: "+998" + phone.value,
        };

        return await sendCode(data);
      } else if (!phone.value) {
        hasPhone.value = true;
      } else if (!phoneRegex.test(phone.value)) {
        wrongPhone.value = true;
      }
    };

    const sendVerification = async (event) => {
      event.preventDefault(); // Предотвращаем стандартное действие кнопки
      hasName.value = false;
      wrongCode.value = false;
      if (!wrongCode.value && name.value) {
        const data = {
          phone: "+998" + phone.value,
          code: code.value,
        };
        const response = await postVerification(data);
        if (!response.success && response.data.detail?.message === false) {
          wrongCode.value = true;
        } else {
          emit("verified", name.value, phone.value);
        }
        return response;
      } else if (!name.value) {
        hasName.value = true;
      }
    };

    const resendCode = async (event) => {
      event.preventDefault(); // Предотвращаем стандартное действие кнопки
      hasName.value = false;
      hasPhone.value = false;
      wrongPhone.value = false;
      wrongCode.value = false;
      const phoneRegex = /^[0-9]{9}$/;

      if (phone.value && phoneRegex.test(phone.value)) {
        const data = {
          phone: "+998" + phone.value,
        };

        const response = await sendCode(data);
        if (!response.success && response.data.detail?.message === false) {
          wrongCode.value = true;
        } else {
          codeResent.value = true;
          setTimeout(() => {
            codeResent.value = false;
          }, 2000);
        }
      } else if (!phone.value) {
        hasPhone.value = true;
      } else if (!phoneRegex.test(phone.value)) {
        wrongPhone.value = true;
      }
    };

    return {
      verify,
      codeSent,
      name,
      phone,
      code,
      postCode,
      sendVerification,
      hasPhone,
      wrongPhone,
      wrongCode,
      hasName,
      checkPhone,
      resendCode,
      codeResent,
    };
  },
};
</script>

<style>
.error {
  text-align: left;
  color: red;
  font-weight: 600;
}
</style>
