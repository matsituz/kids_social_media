<template>
  <div
    :class="[
      'parent-part__payment-wrapper',
      { 'parent-part__payment-wrapper--true': balance >= 0 },
      { 'parent-part__payment-wrapper--false': balance < 0 },
    ]"
  >
    <h2 class="parent-part__payment-heading">
      {{ $t("main.payment.title") }}
    </h2>
    <div class="parent-part__payment-body">
      <div class="parent-part__payment-body__status">
        <p class="parent-part__payment-body__status-title">
          {{
            balance >= 0
              ? `${$t("main.payment.status-succes")}`
              : `${$t("main.payment.status-err")}`
          }}
        </p>
        <span v-if="balance >= 0"><img src="@/assets/payed.png" alt="" /></span>
        <span v-else><img src="@/assets/not-payed.png" alt="" /></span>
      </div>
      <p class="parent-part__payment-body__balance">{{ balance }} so'm</p>
      <p class="parent-part__payment-body__title">
        {{
          balance >= 0
            ? `${$t("main.payment.message-succes")}`
            : `${$t("main.payment.message-err")}`
        }}
      </p>

      <PaymentBtnComponent :payment_link="payment_link" v-if="payment_link" />
    </div>
    <el-dialog
      v-model="balanceModalValue"
      title="Warning"
      align-center
      style="
        max-width: 576px;
        border-radius: 10px;
        text-align: left;
        background-color: #fef8ea;
        border: 2px solid #ede3bf;
        position: relative;
        z-index: 100;
      "
    >
      <div class="payment-dialog-wrapper">
        <button
          class="dialog-times-btn"
          @click="balanceModalValue = false"
        ></button>
        <img
          src="../../../assets/warning-icon.png"
          alt=""
          class="warning-icon"
        />
        <div>
          <h2 style="text-align: left">
            {{ $t("parent-part.payment-modal.title") }}
          </h2>
          <p v-if="lang == 'ru'">
            У Вас есть задолженность в размере
            <span style="color: #f75555">{{
              numeral(-1 * balance).format()
            }}</span>
            сум.
            <br />
            <br />
            Чтобы Ваш ребенок мог продолжить обучение, пожалуйста, оплатите
            обучение <span style="color: #f75555">до 2 урока</span> учебного
            месяца!
            <br />
            <br />
            В противном случае Ваш ребенок может быть не допущен к урокам.
          </p>
          <p v-else>
            Hozirda sizda
            <span style="color: #f75555">{{
              numeral(-1 * balance).format()
            }}</span>
            so'm qarzdorlik mavjud.
            <br />
            <br />
            Farzandingiz o'qishini faol davom ettirishlari uchun,
            <span style="color: #f75555">oyning 2 - darsiga</span> qadar to’lov
            amalga oshirishngiz kerak!
            <br />
            <br />
            Aks xolda o'quvchi darsdan chetlatiladi.
          </p>
          <PaymentBtnComponent
            :payment_link="payment_link"
            v-if="payment_link"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
var numeral = require("numeral");
import PaymentBtnComponent from "../component/PaymentBtnComponent.vue";
export default {
  props: ["balance", "isModalVisible", "payment_link", "moodme_id"],
  components: {
    PaymentBtnComponent,
  },
  setup(props) {
    const fisrtShowingModal = localStorage.getItem("firstShowingModal");
    const balanceModalValue = ref(
      props.balance < 0 && props.isModalVisible && !fisrtShowingModal
    );
    const lang = localStorage.getItem("lang");

    onMounted(() => {
      if (props.isModalVisible) localStorage.setItem("firstShowingModal", true);
    });
    watch(props, () => {
      balanceModalValue.value =
        props.balance < 0 && props.isModalVisible && !fisrtShowingModal;
      if (props.isModalVisible) localStorage.setItem("firstShowingModal", true);
    });
    return {
      balanceModalValue,
      numeral,
      lang,
      PaymentBtnComponent,
    };
  },
};
</script>

<style lang="scss" scoped>
.parent-part__payment {
  &-wrapper {
    padding: 30px;
    border-radius: 20px;
    color: #fff;
    margin-bottom: 22px;
    &--false {
      background: #f75555;
    }
    &--true {
      background: #4ade80;
    }
  }
  &-heading {
    font-weight: 700;
    font-size: 25px;
    line-height: 120%;
    text-align: center;
    color: #ffffff;
    padding-bottom: 20px;
    border-bottom: 2px solid #ffaa92;
  }
  &-body {
    margin-top: 20px;
    &__status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title {
        font-weight: 700;
        font-size: 16px;
        line-height: 120%;
        color: #ffffff;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 3px 10px;
        max-height: 26px;
      }
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
    &__balance {
      font-weight: 700;
      font-size: 40px;
      line-height: 120%;
      color: #ffffff;
      margin-bottom: 25px;
    }
    &__title {
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      letter-spacing: 0.2px;
      color: #ffffff;
    }
  }
}

.payment-dialog-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  justify-content: space-between;
  position: relative;
  p {
    font-size: 16px;
    margin-top: 10px;
  }
  .warning-icon {
    width: 30px;
  }
}
.dialog-times-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  right: 10px;
  background-color: transparent;
  border: none;
  background-image: url(../../../assets/times-icon.png);
  background-size: cover;
  cursor: pointer;
  background-repeat: no-repeat;
  opacity: 0.7;
}
</style>
