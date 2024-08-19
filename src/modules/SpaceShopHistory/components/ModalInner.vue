<template>
  <div class="modal-header modal-header--done">
    <span>
      <i
        ><svg
          width="60"
          height="59"
          viewBox="0 0 60 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.355 4.91406H40.6688C49.0025 4.91406 54.5829 10.7649 54.5829 19.4674V39.5544C54.5829 48.2324 49.0025 54.0807 40.6688 54.0807H19.355C11.0213 54.0807 5.41626 48.2324 5.41626 39.5544V19.4674C5.41626 10.7649 11.0213 4.91406 19.355 4.91406ZM29.9751 22.2723C28.8196 22.2723 27.8609 21.3111 27.8609 20.1335C27.8609 18.9289 28.8196 17.9702 30.0242 17.9702C31.2042 17.9702 32.163 18.9289 32.163 20.1335C32.163 21.3111 31.2042 22.2723 29.9751 22.2723ZM32.1384 38.792C32.1384 39.972 31.1797 40.9307 29.9751 40.9307C28.7951 40.9307 27.8363 39.972 27.8363 38.792V27.9262C27.8363 26.7437 28.7951 25.7628 29.9751 25.7628C31.1797 25.7628 32.1384 26.7437 32.1384 27.9262V38.792Z"
            fill="white"
          />
        </svg>
      </i>
    </span>
  </div>
  <div class="modal-body">
    <h2 class="modal-body__heading">
      {{ $t(`space-shop.history.${status}`) }}
    </h2>
    <p class="modal-body__date">
      {{ purchaseDate }}
    </p>
    <p class="modal-body__title">{{ $t("space-shop.modal.given-title") }}</p>
    <p class="modal-body__code">
      {{ $t("space-shop.purchase-code") }}:
      <span>{{ unique_code || "null" }}</span>
    </p>
  </div>
  <div class="modal-footer">
    <button class="modal-footer__btn" @click="closeModale">
      {{ $t("space-shop.modal.btn") }}
    </button>
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  props: ["unique_code", "date", "status"],
  emits: {
    closeModale: null,
  },
  date() {
    return {
      DateTime: DateTime,
    };
  },
  // beforeMount() {
  //   console.log(DateTime.now());
  // },
  methods: {
    closeModale() {
      this.$emit("closeModale", false);
    },
  },
  computed: {
    purchaseDate() {
      return DateTime.fromISO(this.date)
        .setLocale("ru")
        .toFormat("MMMM dd, yyyy | HH:mm");
    },
  },
};
</script>

<style lang="scss">
.shop-history {
  text-align: center;
  .el-dialog {
    padding: 32px;
    background: #ffffff;
    border-radius: 16px;
    max-width: 400px;
    .modal-header {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px auto;
      &--done {
        background: #4aaf57;
      }
      &--waiting {
        background: #246bfd;
      }
    }
    .modal-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 12px;
      &__heading {
        font-weight: 700;
        font-size: 24px;
        color: #212121;
      }
      &__date {
        font-weight: 500;
        font-size: 14px;
        color: #212121;
        text-transform: capitalize;
      }
      &__title {
        font-weight: 400;
        font-size: 16px;
        color: #212121;
        width: 216px;
      }
      &__code {
        font-weight: 600;
        font-size: 16px;
        color: #212121;
        span {
          color: #ef400f;
        }
      }
    }
    .modal-footer {
      &__btn {
        width: 276px;
        height: 58px;
        background: linear-gradient(286.17deg, #e33d0e 0%, #ff7d58 100%);
        border-radius: 16px;
        border: none;
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
        cursor: pointer;
        margin-top: 10px;
      }
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 0;
    text-align: center;
  }
}
</style>
