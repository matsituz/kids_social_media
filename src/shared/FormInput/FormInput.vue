<template>
  <div :class="['input-wrapper', wrapperClass]">
    <label :for="inputId" v-if="label" :class="labelClass">{{ label }}</label>
    <input
      :type="inputType || 'text'"
      :id="inputId"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="inputClass"
      :disabled="isDisable"
    />
    <button
      class="show-pass"
      @click="hideShowPass"
      type="button"
      v-if="showEye"
    >
      <img src="@/assets/eye.png" alt="eye" v-if="passShow" />
      <img src="@/assets/eyeslash.png" alt="eyeslash" v-else />
    </button>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import "./style/input.css";

export default {
  props: [
    "inputId",
    "inputClass",
    "placeholder",
    "label",
    "inputType",
    "labelClass",
    "wrapperClass",
    "showEye",
    "isDisable",
  ],
  emits: ["inputChanged", "hideShowPass"],
  setup(props, { emit }) {
    const inputValue = ref("");
    watch(inputValue, (value) => {
      emit("inputChanged", {
        [props.inputId]: value,
      });
    });

    const passShow = ref(false);

    const hideShowPass = () => {
      passShow.value = !passShow.value;
    };

    watch(passShow, (value) => {
      emit("hideShowPass", {
        passShow: value,
      });
    });

    return {
      inputValue,
      hideShowPass,
      passShow,
    };
  },
};
</script>
