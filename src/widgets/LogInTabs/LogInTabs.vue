<template>
  <h1 class="auth-form__heading">{{ $t("login.heading.welcome") }}</h1>

  <form @keypress.enter="checkOffertaAndPostCredentials">
    <log-in-tab-inner @credentials="getCredentials($event)" />
  </form>
  <p v-if="errMsg" class="error-message">{{ errMsg }}</p>

  <button
    type="button"
    class="login_btn"
    :disabled="hasEmptyInputs"
    @click="postCredentials"
  >
    {{ $t("login.tabs.sign-up") }}
  </button>

  <p class="login_no-password">
    {{ $t("login.tabs.no-login") }}
    <router-link :to="'/signup'" class="login_sign">Sign up</router-link>
  </p>
</template>

<script>
import { LogInTabInner } from "@/entities";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus"; // Import ElMessage
import "./style/login-tab.css";
import numeral from "numeral";

export default {
  components: {
    LogInTabInner,
  },
  props: {
    offerTab: Boolean,
  },
  setup(props, { emit }) {
    const activeName = ref("student");

    const userRoles = ["student", "parent"];

    const hasEmptyInputs = ref(true);

    const store = useStore();
    const router = useRouter();

    const credentials = ref({
      external_id: undefined,
      phone: undefined, // Add phone field
      code: undefined,
      role: activeName.value,
    });

    const getCredentials = (values) => {
      for (let key in values) {
        if (!values[key]) {
          hasEmptyInputs.value = true;
        } else {
          hasEmptyInputs.value = false;
        }
      }
      const { external_id, phone, code } = values; // Include phone in destructuring
      credentials.value = {
        external_id,
        phone, // Assign phone value
        code,
        role: activeName.value,
      };
    };

    const errMsg = ref("");

    const i18n = useI18n();

    const postCredentials = async () => {
      if (!hasEmptyInputs.value) {
        const { external_id, phone, code } = credentials.value;

        const requestBody = {
          role: activeName.value,
          code,
        };

        if (external_id) {
          requestBody.external_id = external_id;
        } else if (phone) {
          requestBody.phone = phone;
        }

        await store
          .dispatch("auth/login", {
            student: requestBody,
          })
          .catch((e) => {
            if (e.response.data.detail === "Inactive student") {
              errMsg.value = i18n.t("login.inactive");
            } else if (
              e.response.data.detail.error === "student is not active!"
            ) {
              errMsg.value = i18n.t("login.inactive");
            } else if (
              e.response.data.detail === "student not found" ||
              e.response.data.detail === "Could not validate credentials"
            ) {
              errMsg.value = i18n.t("login.unknown");
            } else if (
              e.response.data.detail.message ===
              "Student Payment is not enough!"
            ) {
              errMsg.value =
                i18n.t("login.payment-block") +
                numeral(e.response.data.detail.balance).format("0,0") +
                " UZS";
            } else if (e.response.data.detail === "Offerta is not signed !") {
              ElMessage({
                message: i18n.t("login.tabs.sign-offerta"),
                type: "warning",
              });
              emit("offer-required");
            }
          });

        router.push({ name: `${activeName.value}-main` });
        localStorage.setItem("roleInSpace", activeName.value);
      }
    };

    const toggleQr = () => {
      emit("showQr");
    };

    return {
      activeName,
      userRoles,
      getCredentials,
      hasEmptyInputs,
      postCredentials,
      errMsg,
      toggleQr,
    };
  },
};
</script>
