<template>
  <div class="mars-news">
    <div v-if="showNews" class="mars-news-wrapper">
      <h2 class="mars-news-title">Yangiliklar</h2>
      <el-row :gutter="10">
        <el-col :span="15">
          <swiper
            class="swiper swiper-news"
            :pagination="{ clickable: true }"
            :loop="true"
            :modules="newsSpiwerModules"
            :autoplay="{
              delay: 25000,
              disableOnInteraction: false,
            }"
            :initial-slide="1"
            @active-index-change="
              ($event) => {
                activeNewsIndex = $event.realIndex;
              }
            "
          >
            <swiper-slide
              v-for="newsItem in news"
              :key="newsItem.id"
              class="mars-news-wrapper"
            >
              <img
                class="swiper-news-img"
                :src="mediaLink + newsItem.image"
                alt=""
              />
            </swiper-slide>
          </swiper>
        </el-col>
        <el-col :span="9">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="trending-products">
                <p class="trending-products-title">Trending products</p>
                <swiper
                  class="swiper swiper-trending-products"
                  :pagination="{ clickable: true }"
                  :loop="true"
                  :autoplay="{
                    delay: 2000,
                    disableOnInteraction: false,
                  }"
                  :modules="trendingProductsModules"
                >
                  <swiper-slide>
                    <div class="swiper-trending-products-slide">
                      <div class="swiper-trending-products-slide-product">
                        <div
                          class="swiper-trending-products-slide-product-info"
                        >
                          <p
                            class="swiper-trending-products-slide-product-info-name"
                          >
                            Mars Earspohone
                          </p>
                          <div
                            class="swiper-trending-products-slide-product-info-coin"
                          >
                            <span>559</span>
                            <img src="@/assets/Coin.svg" alt="" />
                          </div>
                        </div>
                        <img
                          class="swiper-trending-products-slide-product-img"
                          src="@/assets/earsphone.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="swiper-trending-products-slide">
                      <div class="swiper-trending-products-slide-product">
                        <div
                          class="swiper-trending-products-slide-product-info"
                        >
                          <p
                            class="swiper-trending-products-slide-product-info-name"
                          >
                            Mars Airpods
                          </p>
                          <div
                            class="swiper-trending-products-slide-product-info-coin"
                          >
                            <span>499</span>
                            <img src="@/assets/Coin.svg" alt="" />
                          </div>
                        </div>
                        <img
                          class="swiper-trending-products-slide-product-img"
                          src="@/assets/airpods.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="swiper-trending-products-slide">
                      <div class="swiper-trending-products-slide-product">
                        <div
                          class="swiper-trending-products-slide-product-info"
                        >
                          <p
                            class="swiper-trending-products-slide-product-info-name"
                          >
                            Mars Keyboard
                          </p>
                          <div
                            class="swiper-trending-products-slide-product-info-coin"
                          >
                            <span>350</span>
                            <img src="@/assets/Coin.svg" alt="" />
                          </div>
                        </div>
                        <img
                          class="swiper-trending-products-slide-product-img"
                          src="@/assets/keyboard.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="mars-messengers">
                <swiper
                  class="swiper swiper-messengers"
                  :pagination="{ clickable: true }"
                  :loop="true"
                  :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                  }"
                  :modules="trendingProductsModules"
                  direction="vertical"
                >
                  <swiper-slide>
                    <img
                      src="@/assets/messengers-items.png"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </swiper-slide>
                  <swiper-slide>
                    <img
                      src="@/assets/messengers-link.png"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </swiper-slide>
                </swiper></div
            ></el-col>
            <el-col :span="24" style="padding-top: 10px">
              <div class="mars-rules">
                <swiper
                  class="swiper swiper-mars-rules"
                  :pagination="{ clickable: true }"
                  :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                  }"
                  :loop="true"
                  :modules="trendingProductsModules"
                  direction="vertical"
                >
                  <swiper-slide class="slide"
                    ><img src="@/assets/rules/rule1.png" alt=""
                  /></swiper-slide>
                  <swiper-slide class="slide"
                    ><img src="@/assets/rules/rule2.png" alt=""
                  /></swiper-slide>
                  <swiper-slide class="slide"
                    ><img src="@/assets/rules/rule3.png" alt=""
                  /></swiper-slide>
                  <swiper-slide class="slide"
                    ><img src="@/assets/rules/rule4.png" alt=""
                  /></swiper-slide>
                </swiper>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <p class="mars-news-text">
        {{ news[activeNewsIndex]?.detail?.description.uz }}
      </p>
    </div>
    <leader-board-component v-if="showRating" />
  </div>
</template>

<script>
import { Swiper } from "vue-awesome-swiper";
import { Pagination, FreeMode, Autoplay } from "swiper";
import { getMarsNews } from "./api/get-news.api";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { onBeforeMount, ref } from "vue";
import { DateTime } from "luxon";
import { mediaLink } from "@/apiConfig/mediaLink";
import LeaderBoardComponent from "@/components/LeaderBoardComponent.vue";
export default {
  components: {
    Swiper,
    LeaderBoardComponent,
  },
  setup() {
    const news = ref([]);
    const img = ref(null);
    const lang = localStorage.getItem("lang");
    const activeNewsIndex = ref(null);

    const date = DateTime;
    onBeforeMount(async () => {
      news.value = await getMarsNews().then((res) => res.data);
      activeNewsIndex.value = 0;
      // changeWindow();
    });

    const showNews = ref(true);
    const showRating = ref(false);

    // const changeWindow = () => {
    //   if (showNews.value === true) {
    //     setTimeout(() => {
    //       showNews.value = false;
    //       showRating.value = true;
    //     }, 360000);
    //   }
    //   if (showRating.value === true) {
    //     setTimeout(() => {
    //       showRating.value = false;
    //       showNews.value = true;
    //     }, 1200000);
    //   }
    // };

    // watch(showNews, changeWindow);
    // watch(showRating, changeWindow);

    return {
      newsSpiwerModules: [Pagination, FreeMode, Autoplay],
      trendingProductsModules: [Autoplay],
      news,
      lang,
      mediaLink,
      date,
      showNews,
      showRating,
      img,
      activeNewsIndex,
    };
  },
};
</script>

<style lang="scss">
.mars-news {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  max-width: 2200px;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  &-wrapper {
    width: 100%;
  }
  &-title {
    color: #0e0d5d;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
  }

  .swiper {
    width: 100%;
    &-news {
      position: relative;
      height: 75vh;
      overflow: hidden;

      .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background-color: #e0e0e0;

        &-active {
          width: 38px;
          background-color: #e0e0e0;
          border-radius: 5px;
        }
      }

      &-img {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        object-fit: fill;
      }
    }
    &-trending-products {
      height: 30vh;
      overflow: hidden;
      &-slide {
        height: 100%;
        &-product {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          &-info {
            &-name {
              color: #fff;
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 140%; /* 22.4px */
              letter-spacing: 0.2px;
            }
            &-coin {
              border-radius: 10px;
              background: rgba(255, 255, 255, 0.2);
              display: flex;
              align-items: center;
              gap: 5px;
              padding: 5px 10px;
              margin-top: 10px;
              width: 120px;
              justify-content: center;
              span {
                color: #fff;
                font-size: 24px;
                font-style: normal;
                font-weight: 700;
                line-height: 120%; /* 26.483px */
              }
              img {
                width: 21px;
                height: 21px;
              }
            }
          }
          &-img {
            width: 100px;
            height: 100px;
            object-fit: fill;
          }
        }
      }
    }
    &-mars-rules {
      height: 44vh;
      overflow: hidden;
      .swiper-slide {
        width: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 20px;
      }
    }
    &-messengers {
      height: 30vh;
      .swiper-slide {
        width: 100%;
        height: 100%;
        padding: 20px;
        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
    }
  }
  &-text {
    color: #0e0d5d;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 38.4px */
    margin-top: 10px;

    @keyframes textAnimation {
      100% {
        transform: translateX(-100%);
      }
    }
  }
  .trending-products,
  .mars-messengers {
    border-radius: 20px;
  }
  .mars-messengers {
    background-image: url("@/assets/messengers-bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .trending-products {
    padding: 10px;
    height: 30vh;
    background: linear-gradient(286deg, #22bb9c 0%, #35debc 100%);
    &-title {
      color: #fff;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 28.8px */
    }
  }
  .mars-rules {
    border-radius: 20px;
  }
}
</style>
