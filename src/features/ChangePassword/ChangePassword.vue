<template>
  <button @click="dialogVisible = false" class="dialog-close">
    <img src="@/assets/close-btn.svg" alt="" />
  </button>
  <h1>{{ $t("header.change-password") }}</h1>
  <div class="dialog-footer">
    <input
      :placeholder="$t('header.change-password')"
      :type="passType"
      class="change-password-input"
    />
    <button class="show-pass" @click="hideSHowPass()" type="button">
      <img src="@/assets/eye.png" alt="" v-if="passType === 'password'" />
      <img src="@/assets/eyeslash.png" alt="" v-else />
    </button>
    <button
      class="dialog-confirm"
      type="primary"
      @click="dialogVisible = false"
    >
      {{ $t("header.modal.confirm_btn") }}
    </button>
    <button class="dialog-cancel" @click="dialogVisible = false">
      {{ $t("header.modal.cancel_btn") }}
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
