<template>
  <div
    :class="quantity <= 0 && !preorder ? 'disable-shop-item shop-item' : 'shop-item'"
    @click="openModal"
  >
    <img :src="img" alt="shop-item" />
    <!-- <img src="../../../assets/mars-shop__item.png" alt="shop-item" /> -->
    <p class="shop-item__title">{{ name }}</p>
    <p :class="['shop-item__price']">{{ price }} Coins</p>
    <!-- <p class="shop-item__price" v-if="haveDiscount">{{ discount }} Coins</p> -->
    <p class="shop-item__quantity" v-if="!preorder">
      {{ quantity }} {{ $t("space-shop.remainder") }}
    </p>
    <p class="shop-item__quantity" v-else>
      {{ $t("space-shop.preorder") }}
    </p>
    <!-- <div v-if="quantity <= 0" class="shop-item__is-no-product-wrapper">
      <img src="../../../assets/no-product-found.png" alt="" />
      <p>{{ $t("space-shop.no-product-found") }}</p>
    </div> -->
  </div>

  <el-dialog v-model="showModal" align-center>
    <modal-component
      :product_id="product_id"
      :name="name"
      :price="price"
      :quantity="quantity"
      :discount="discount"
      :preorder="preorder"
      @closeModale="closeModale"
    />
  </el-dialog>
</template>

<script>
import ModalComponent from "./ModalComponent.vue";
export default {
  props: [
    "name",
    "price",
    "img",
    "quantity",
    "product_id",
    "discount",
    "comment",
    "preorder"
  ],
  components: {
    ModalComponent,
  },
  data() {
    return {
      purchaseModal: false,
      showModal: false,
      lang: localStorage.getItem("lang"),
    };
  },
  methods: {
    closeModale(val) {
      this.showModal = val;
    },
    openModal() {
      if (this.quantity > 0 || this.preorder) {
        this.showModal = true;
      }
    },
  },
  computed: {
    haveDiscount() {
      return this.discount !== this.price;
    },
  },
};
</script>

<style lang="scss">
.shop-item {
  display: flex;
  flex-direction: column;
  row-gap: 11px;
  align-items: center;
  padding: 9px;
  background: #ffffff;
  box-shadow: 0px 4px 60px rgba(15, 5, 4, 0.05);
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;
  &.disable-shop-item {
    cursor: auto;
    .shop-item__title,
    .shop-item__price,
    .shop-item__quantity {
      opacity: 0.4;
    }
  }
  &__is-no-product-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.903);
    z-index: 11;
    cursor: auto;
    color: #fff;
    text-align: center;
    font-size: 24px;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  img {
    width: 160px;
    max-width: 100%;
    object-fit: contain;
    height: 146px;
  }
  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: #212121;
  }
  &__price {
    position: relative;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: #424242;
    margin-left: 26px;
    &--old {
      font-size: 14px;
      color: #bdbdbd;
      text-decoration: line-through;
      &.shop-item__price::before {
        width: 14px;
        height: 14px;
        left: -20px;
        filter: grayscale(100%);
        opacity: 0.5;
      }
    }
    &::before {
      position: absolute;
      content: "";
      left: -26px;
      top: 2px;
      background-image: url("../../../assets/Coin.svg");
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  &__quantity {
    font-size: 12px;
    color: #424242;
  }
}
</style>
