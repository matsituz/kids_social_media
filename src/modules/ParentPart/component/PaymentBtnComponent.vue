<template>
  <div class="payment_btn_wrapper">
    <a target="_blank" :href="payment_link">
      <button class="payment_btn">
        <img src="../../../assets/uzum-logo.png" alt="" />
        {{ $t("main.payment.pay") }}
      </button>
    </a>
  </div>
</template>

<script>
export default {
  props: ["payment_link"],
  setup() {},
};
</script>
<style lang="scss">
.payment_btn_wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  .payment_btn {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #8401ff;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
