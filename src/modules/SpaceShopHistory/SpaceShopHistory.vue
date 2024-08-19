<template>
  <main>
    <section class="shop-history container">
      <h1 class="shop-history__heading">
        {{ $t("space-shop.purchase-history") }}
      </h1>

      <div class="shop-history__products-wrapper" v-if="products?.length">
        <el-row :gutter="40">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            v-for="product in products"
            :key="product.id"
          >
            <product-component
              :name="product.product.name"
              :price="product.product.cost"
              :date="product.created_at"
              :purchaseCode="product.unique_code"
              :status="product.status"
              :img="mediaLink + product.product.image"
            ></product-component>
          </el-col>
        </el-row>
      </div>
      <skeleton-shop-history v-else-if="!products"></skeleton-shop-history>
      <div v-else-if="!products?.length">
        <h1>Вы еще ничего не покупали</h1>
      </div>
    </section>
  </main>
</template>

<script>
import ProductComponent from "./components/ProductComponent.vue";
import SkeletonShopHistory from "./components/SkeletonShopHistory.vue";
import { getHistoryProducts } from "./api/get-history-products.api";
import { mediaLink } from "@/apiConfig/mediaLink";

// import { DateTime } from "luxon";
export default {
  components: {
    ProductComponent,
    SkeletonShopHistory,
  },
  data() {
    return {
      products: null,
      mediaLink: mediaLink,
    };
  },
  async beforeMount() {
    this.products = await getHistoryProducts();
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.shop-history {
  margin-top: 24px;
  &__heading {
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    color: #0e0d5d;
    position: relative;
    margin-left: 46px;
    text-align: left;
    &::before {
      position: absolute;
      content: "";
      left: -46px;
      top: -2px;
      width: 34px;
      height: 34px;
      background-image: url("@/assets/space-shop-history-blue.svg");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  &__products-wrapper {
    margin-top: 24px;
  }
  .el-row {
    margin-bottom: 40px;
  }
}
</style>
