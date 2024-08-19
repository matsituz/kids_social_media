<template>
  <div class="container news-page">
    <div class="news-page-wrapper">
      <router-link to="/main">
        <button class="news-page-prev-btn">
          <el-icon color="#F25E33"><Back /></el-icon>
        </button>
      </router-link>
      <div class="news-page-content">
        <div class="news-page-content__heading">
          <p class="news-page-content__heading-title">So’ngi Yangiliklar</p>
        </div>
        <div class="news-page-content__body">
          <el-tabs tab-position="right" class="demo-tabs">
            <el-tab-pane
              label="Task"
              v-for="newsItem in news"
              :key="newsItem.id"
            >
              <template #label>
                <div class="news-tab">
                  <img
                    :src="mediaLink + newsItem.image"
                    alt=""
                    class="news-tab-image"
                  />
                  <p>{{ newsItem.title[lang] }}</p>
                </div>
              </template>

              <img
                :src="mediaLink + newsItem.image"
                alt=""
                class="preview-image"
              />
              <p
                v-html="formatText(newsItem.detail.description[lang])"
                class="preview-text"
              ></p>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Back } from "@element-plus/icons-vue";
import { onBeforeMount, ref } from "vue";
import { getNews } from "./api/get-news.api";
import { mediaLink } from "@/apiConfig/mediaLink";
export default {
  components: {
    Back,
  },
  setup() {
    const news = ref([]);
    const lang = localStorage.getItem("lang");

    onBeforeMount(async () => {
      news.value = await getNews().then((res) => res.data);
    });
    const formatText = (text) => {
      return text.replace(/\n/g, "<br>");
    };
    return {
      news,
      lang,
      mediaLink,
      formatText,
    };
  },
};
</script>
<style lang="scss">
@import "./style/news-page.scss";
</style>
