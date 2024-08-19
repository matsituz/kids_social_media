<template>
  <div>
    <form class="auth-form">
      <form-input
        inputClass="auth-form__input"
        placeholder="Modme ID"
        inputType="text"
        @inputChanged="getInputValue($event)"
        inputId="login"
      />
      <form-input
        inputClass="auth-form__input"
        placeholder="Password"
        :inputType="passType"
        :showEye="true"
        @hideShowPass="hideShowPass($event)"
        @inputChanged="getInputValue($event)"
        inputId="pass"
      />
    </form>
  </div>
</template>

<script>
import { FormInput } from "@/shared";
import { ref, watch } from "vue";
import "./style/auth-form.css";

export default {
  // props: {
  //   heading: {
  //     type: String,
  //     required: true,
  //     default: "Заголовок",
  //   },
  //   role: {
  //     type: String,
  //     required: true,
  //     default: "student",
  //   },
  // },
  components: {
    FormInput,
  },
  emits: ["credentials"],
  setup(_, { emit }) {
    const passType = ref("password");

    const hideShowPass = ({ passShow }) => {
      if (passShow === true) {
        passType.value = "text";
      } else {
        passType.value = "password";
      }
    };

    let inputDatas = ref({
      external_id: "",
      phone: "",
      code: "",
    });

    const getInputValue = (val) => {
      if (val?.login) {
        const isPhoneNumber = /^\+?998\d{9}$/.test(val.login);
        if (isPhoneNumber) {
          inputDatas.value = {
            ...inputDatas.value,
            phone: val.login,
          };
          inputDatas.value.external_id = null;
        } else {
          inputDatas.value = {
            ...inputDatas.value,
            external_id: val.login,
          };
          inputDatas.value.phone = null;
        }
      } else {
        inputDatas.value = {
          ...inputDatas.value,
          code: val?.pass,
        };
      }
    };

    watch(inputDatas, (val) => {
      emit("credentials", val);
    });

    return {
      passType,
      hideShowPass,
      getInputValue,
    };
  },
};
</script>
