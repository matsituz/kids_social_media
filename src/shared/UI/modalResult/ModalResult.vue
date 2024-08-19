<template>
  <div class="modal-result">
    <div
      :class="[
        'modal-result__icon-wrapper',
        `modal-result__icon-wrapper--${resultStatus}`,
      ]"
    >
      <img
        v-if="resultStatus === 'loading'"
        src="@/assets/loading.svg"
        alt="loading"
      />
      <img
        v-else-if="resultStatus === 'fail'"
        src="@/assets/fail-icon.svg"
        alt="success"
      />
      <img
        v-else-if="resultStatus === 'success'"
        src="@/assets/success-icon.svg"
        alt="fail"
      />
    </div>
    <h3 class="modal-result__heading">{{ heading }}</h3>
    <p class="modal-result__title">{{ title }}</p>
  </div>
</template>

<script>
import "./style/modal-result.css";

export default {
  props: {
    resultStatus: {
      props: String,
      required: true,
    },
    heading: {
      props: String,
      required: true,
    },
    title: {
      props: String,
      required: true,
    },
  },
};
</script>

<style></style>
