<template>
  <div class="shop-history__product-item" @click="showModal = true">
    <img class="shop-history__product-item__img" :src="img" alt="" />
    <div class="shop-history__product-item-info">
      <p
        :class="[
          `shop-history__product-item-info__status shop-history__product-item-info__status--${status}`,
        ]"
      >
        {{ $t(`space-shop.history.${status}`) }}
      </p>
      <p class="shop-history__product-item-info__name">{{ name }}</p>
      <p class="shop-history__product-item-info__price">
        {{ price }} <span>Coins</span>
      </p>
      <p class="shop-history__product-item-info__purchase-code">
        {{ $t("space-shop.purchase-code") }} <span>{{ purchaseCode }}</span>
      </p>
      <p class="shop-history__product-item-info__date">
        {{
          DateTime.fromISO(date)
            .setLocale("ru")
            .toFormat("MMMM dd, yyyy | HH:mm")
        }}
      </p>
    </div>
  </div>
  <el-dialog v-model="showModal" destroy-on-close center>
    <modal-inner
      @closeModale="closeModale"
      :unique_code="purchaseCode"
      :date="date"
      :status="status"
    ></modal-inner>
  </el-dialog>
</template>

<script>
import { DateTime } from "luxon";
import ModalInner from "./ModalInner.vue";
export default {
  props: ["img", "name", "price", "date", "purchaseCode", "status"],
  components: {
    ModalInner,
  },
  data() {
    return {
      DateTime: DateTime,
      showModal: false,
    };
  },
  methods: {
    closeModale(val) {
      this.showModal = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-history__product-item {
  text-align: center;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 4px 60px rgba(15, 5, 4, 0.05);
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 40px;
  &__img {
    width: 160px;
    max-width: 100%;
    object-fit: contain;
    height: 146px;
  }
  &-info {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 8px;
    &__status {
      padding: 6px 10px;
      // max-width: 110px;
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 12px;
      line-height: 12px;
      border-radius: 6px;
      &--given {
        background: #f2fffc;
        color: #4aaf57;
      }
      &--not_given {
        background: rgba(51, 94, 247, 0.08);
        color: #246bfd;
      }
      &--canceled {
        color: #f75555;
        background: rgba(247, 85, 85, 0.2);
      }
    }
    &__name {
      font-weight: 700;
      font-size: 18px;
      line-height: 120%;
      color: #212121;
    }
    &__price {
      font-weight: 700;
      font-size: 18px;
      color: #ef400f;
      span {
        font-weight: 500;
        font-size: 16px;
        color: #616161;
      }
    }
    &__purchase-code {
      font-weight: 500;
      font-size: 16px;
      color: #616161;
      span {
        font-weight: 700;
        font-size: 16px;
        line-height: 120%;
        color: #ef400f;
      }
    }
    &__date {
      font-weight: 500;
      font-size: 14px;
      color: #212121;
      text-transform: capitalize;
    }
  }
}
</style>
