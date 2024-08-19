<template>
  <main>
    <section class="shop container">
      <div class="shop-header">
        <h1 class="shop-heading">{{ $t("space-shop.shop") }}</h1>
        <router-link to="/space-shop/history" class="shop-history-link">{{
          $t("space-shop.purchase-history")
        }}</router-link>
      </div>
      <div class="shop-items-wrapper">
        <div v-if="this.products?.length">
          <el-row :gutter="40">
            <el-col
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              v-for="product in products"
              :key="product.name"
            >
              <purchase-product
                :name="product.name"
                :price="product.cost"
                :discount="product.discount_price"
                :quantity="product.quantity"
                :img="mediaLink + product.image"
                :product_id="product.id"
                :preorder="product.preorder"
              ></purchase-product>
            </el-col>
          </el-row>
        </div>
        <div v-else-if="!this.products?.length">
          <h1>Товары отсутствуют</h1>
        </div>
        <div v-else-if="!this.products">
          <skeleton-shop-history></skeleton-shop-history>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PurchaseProduct from "./components/PurchaseProduct.vue";
import SkeletonShopHistory from "../SpaceShopHistory/components/SkeletonShopHistory.vue";
import { getProducts } from "./api/get-products.api";
import { mediaLink } from "@/apiConfig/mediaLink";
import { useStore } from "vuex";
export default {
  components: {
    PurchaseProduct,
    SkeletonShopHistory,
  },
  data() {
    return {
      products: null,
      mediaLink: mediaLink,
    };
  },
  async beforeMount() {
    const store = useStore();
    const {company_id} = store.state.student.studentInfo;
    this.products = await getProducts(company_id ? company_id : 3);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.shop {
  margin-top: 30px;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-heading {
    position: relative;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 120%;
    color: #0e0d5d;
    padding-left: 46px;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: "";
      background-image: url("../../assets/shopping-cart-icon.png");
      width: 34px;
      height: 34px;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  &-history-link {
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    text-align: right;
    color: #f54336;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      left: -46px;
      top: 0px;
      width: 34px;
      height: 34px;
      background-image: url("@/assets/space-shop-history-red.svg");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  &-items-wrapper {
    margin-top: 27px;
  }
}
@media (max-width: 1200px) {
  .shop-items-wrapper {
    justify-content: start;
    gap: 10px;
  }
}
@media (max-width: 470px) {
  .shop-heading {
    font-size: 18px;
    padding-left: 40px;
    &::before {
      width: 20px;
      height: 20px;
      left: 10px;
      top: 0px;
    }
  }
  .shop-history-link {
    font-size: 18px;
    &::before {
      left: -22px;
      width: 20px;
      height: 20px;
      top: 4px;
    }
  }
}
</style>
