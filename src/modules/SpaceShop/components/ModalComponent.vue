<template>
  <div v-if="!isPurchased" class="purchase-confirm" v-loading="modalLoading">
    <div class="dialog-body">
      <h3 class="dialog-body__heading">
        {{ $t("space-shop.modal.confirm-purchase") }}
      </h3>
      <div class="dialog-body__price-box">
        <h4>{{ $t("space-shop.product-name") }}: {{ name }}</h4>
        <p>{{ $t("space-shop.product-price") }} : {{ price }}</p>

        <!-- <p v-if="price !== discount">
          {{ $t("space-shop.product-price-disc") }} : {{ discount }}
        </p>  -->
      </div>
    </div>
    <div class="dialog-footer">
      <div class="btn-wrapper">
        <button
          @click="purchaseProduct(product_id)"
          class="dialog-footer__btn dialog-footer__btn--accept"
          :disabled="quantity <= 0 && !preorder"
        >
          {{ $t("space-shop.modal.purchase") }}
        </button>
        <button
          @click="closeModale"
          class="dialog-footer__btn dialog-footer__btn--reject"
        >
          {{ $t("space-shop.modal.cancel") }}
        </button>
        <p class="dialog-footer__quantity-text" v-if="quantity <= 0 && !preorder">
          {{ $t("space-shop.modal.no-product") }}
        </p>
      </div>
    </div>
  </div>
  <div v-if="isPurchased" class="purchase-accept">
    <div :class="['dialog-header', { 'dialog-header--reject': noMuchCoins }]">
      <span>
        <i v-if="!noMuchCoins && !freemium && hasTelegram">
          <svg
            width="60"
            height="59"
            viewBox="0 0 60 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.3557 4.9165H40.6695C49.0032 4.9165 54.5837 10.7673 54.5837 19.4698V39.5569C54.5837 48.2323 49.0032 54.0832 40.6695 54.0832H19.3557C11.022 54.0832 5.41699 48.2323 5.41699 39.5569V19.4698C5.41699 10.7673 11.022 4.9165 19.3557 4.9165ZM28.599 36.8502L40.2761 25.1731C41.1119 24.3373 41.1119 22.9852 40.2761 22.1248C39.4402 21.2889 38.0636 21.2889 37.2277 22.1248L27.0748 32.2777L22.7727 27.9756C21.9369 27.1398 20.5602 27.1398 19.7244 27.9756C18.8886 28.8114 18.8886 30.1635 19.7244 31.0239L25.5752 36.8502C25.9931 37.2681 26.534 37.4648 27.0748 37.4648C27.6402 37.4648 28.1811 37.2681 28.599 36.8502Z"
              fill="white"
            />
          </svg>
        </i>
        <i
          v-else-if="
            noMuchCoins || notEnoughBalance || freemium || !hasTelegram
          "
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.9999 53.6668C13.8246 53.6668 2.33325 42.1755 2.33325 28.0002C2.33325 13.8249 13.8246 2.3335 27.9999 2.3335C42.1752 2.3335 53.6666 13.8249 53.6666 28.0002C53.6666 42.1755 42.1752 53.6668 27.9999 53.6668ZM27.9999 49.0002C39.5979 49.0002 48.9999 39.5981 48.9999 28.0002C48.9999 16.4022 39.5979 7.00016 27.9999 7.00016C16.4019 7.00016 6.99992 16.4022 6.99992 28.0002C6.99992 39.5981 16.4019 49.0002 27.9999 49.0002ZM27.9999 38.0284C31.0788 38.0284 33.9016 39.5274 35.6408 42.0002L39.4579 39.3155C36.8539 35.613 32.6142 33.3618 27.9999 33.3618C23.3856 33.3618 19.146 35.613 16.5419 39.3155L20.3591 42.0002C22.0982 39.5274 24.9211 38.0284 27.9999 38.0284ZM32.6666 28.0002V23.3335H37.3333V28.0002H32.6666ZM18.6666 23.3335V28.0002H23.3333V23.3335H18.6666Z"
              fill="white"
            />
          </svg>
        </i>
      </span>
    </div>
    <div
      class="dialog-body"
      v-if="!noMuchCoins && !notEnoughBalance && !freemium && hasTelegram"
    >
      <h3 class="dialog-body__heading">
        {{ $t("space-shop.modal.done-heading") }}
      </h3>
      <p class="dialog-body__title">
        {{ $t("space-shop.modal.done-title") }}
      </p>
      <p class="dialog-body__code">
        {{ $t("space-shop.purchase-code") }}:
        <span class="code">{{ unique_code }}</span>
      </p>
    </div>
    <div class="dialog-body" v-else-if="noMuchCoins && !notEnoughBalance">
      <h3 class="dialog-body__heading">
        {{ $t("space-shop.modal.fail-heading") }}
      </h3>
      <p class="dialog-body__title">
        {{ $t("space-shop.modal.fail-title") }}
      </p>
    </div>
    <div class="dialog-body" v-else-if="notEnoughBalance">
      <h3 class="dialog-body__heading">
        {{ $t("space-shop.modal.no-balance-heading") }}
      </h3>
      <p class="dialog-body__title">
        {{ $t("space-shop.modal.no-balance-title") }}
      </p>
    </div>
    <div class="dialog-body" v-else-if="!hasTelegram">
      <h3 class="dialog-body__heading">
        {{ $t("space-shop.modal.no-bot-heading") }}
      </h3>
      <p class="dialog-body__title">
        {{ $t("space-shop.modal.no-bot-title") }}
      </p>
    </div>
    <div class="dialog-body" v-else-if="freemium">
      <p class="dialog-body__title">
        {{ $t("space-shop.modal.freemium-shop") }}
      </p>
    </div>
    <div class="dialog-footer" v-if="!hasTelegram">
      <button
        @click="openTelegramBot"
        class="dialog-footer__btn dialog-footer__btn--accept"
      >
        {{ $t("space-shop.modal.no-bot-btn") }}
      </button>
    </div>
    <div class="dialog-footer" v-else>
      <button
        @click="closeModale"
        class="dialog-footer__btn dialog-footer__btn--accept"
      >
        {{ $t("space-shop.modal.btn") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import { buyProducts } from "../api/product-buy.api";

export default {
  props: ["product_id", "name", "price", "quantity", "discount", "preorder"],
  emits: ["closeModale"],
  data() {
    return {
      isPurchased: false,
      noMuchCoins: false,
      unique_code: null,
      notEnoughBalance: false,
      modalLoading: false,
      freemium: false,
      hasTelegram: true,
    };
  },
  methods: {
    closeModale() {
      this.$emit("closeModale", false);
      this.isPurchased = false;
    },
    openTelegramBot() {
      window.open("https://t.me/marsit_bot", "_blank");
      this.closeModale();
    },
    async purchaseProduct(id) {
      this.modalLoading = true;
      await buyProducts(id)
        .then((res) => {
          this.unique_code = res.data.uniques_code;
          this.isPurchased = true;
        })
        .catch((e) => {
          if (!e?.response?.status) {
            this.$emit("closeModale");
            ElNotification({
              type: "error",
              message: "Something is wrong",
            });
            return;
          }
          if (
            e.response.status === 400 &&
            e.response.data.detail === "Not enough coins"
          ) {
            this.noMuchCoins = true;
            this.isPurchased = true;
          } else if (
            e.response.status === 400 &&
            e.response.data.detail === "Not enough balance to buy product"
          ) {
            this.notEnoughBalance = true;
            this.isPurchased = true;
          } else if (
            e.response.status === 400 &&
            e.response.data.detail ===
              "Cannot process as you are in freemium class !"
          ) {
            this.freemium = true;
            this.isPurchased = true;
          } else if (
            e.response.status === 400 &&
            e.response.data.detail === "You should register to our bot"
          ) {
            console.log("no tg");
            this.hasTelegram = false;
            this.isPurchased = true;
          }
        });
      this.modalLoading = false;
    },
  },
};


</script>

<style lang="scss">
.shop {
  .el-dialog {
    border-radius: 16px;
    max-width: 430px;
    padding: 24px;
    &__body {
      padding: 0;
      text-align: center;
    }
    .dialog-header {
      width: 140px;
      height: 140px;
      background: #0e0d5d;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &--reject {
        background: #ef400f;
      }
    }
    .dialog-body {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      &__price-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding-bottom: 24px;
        border-bottom: 1px solid #eeeeee;
        font-size: 18px;
        h4 {
          color: #0e0d5d;
        }
        p {
          position: relative;
          &::before {
            position: absolute;
            content: "";
            right: -26px;
            top: 0px;
            background-image: url("../../../assets/coin-icon.png");
            width: 20px;
            height: 20px;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        &__price {
          font-size: 16px;
          text-decoration: line-through;
          &::before {
            filter: grayscale(100%);
          }
        }
      }
      &__heading {
        font-weight: 700;
        font-size: 24px;
        line-height: 120%;
        text-align: center;
        color: #212121;
      }
      &__title {
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        text-align: center;
        letter-spacing: 0.2px;
        color: #212121;
      }
      &__code {
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        text-align: center;
        letter-spacing: 0.2px;
        color: #212121;
        .code {
          color: #ef400f;
        }
      }
    }
    .dialog-footer {
      width: 100%;
      &__btn {
        width: 100%;
        height: 58px;
        background: linear-gradient(286.17deg, #e33d0e 0%, #ff7d58 100%);
        border-radius: 16px;
        border: none;
        font-weight: 700;
        font-size: 16px;
        line-height: 140%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.2px;
        color: #ffffff;
        cursor: pointer;
        &--accept {
          background: linear-gradient(286.17deg, #e33d0e 0%, #ff7d58 100%);
          color: #ffffff;
          &:disabled {
            opacity: 0.5;
            cursor: auto;
          }
        }

        &--reject {
          border: 1px solid #ef400f;
          background: #ffffff;
          color: #ef400f;
        }
      }
      &__quantity-text {
        color: #e33d0e;
        text-transform: capitalize;
      }
    }
    .purchase-confirm {
      .btn-wrapper {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        row-gap: 12px;
      }
    }
    .purchase-accept {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 32px;
    }
  }
}
@media (max-width: 470px) {
  .shop .el-dialog .dialog-body__heading {
    font-size: 22px;
  }
}
</style>import { is } from "core-js/core/object";
import { has } from "core-js/core/dict";

