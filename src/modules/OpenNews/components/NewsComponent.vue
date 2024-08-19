<template>
  <swiper-slide class="mars-news-wrapper">
    <!-- <img :src="mediaLink + newsItem.image" alt="" /> -->
    <div class="mars-news__text">
      <p class="mars-news__text-date">
        {{ date.fromISO(date).toLocaleString(date.DATETIME_MED) }}
      </p>
      <p class="mars-news__text-title">{{ title }}</p>
    </div>
  </swiper-slide>
</template>

<script>
import { onMounted, ref } from "vue";
import { SwiperSlide } from "vue-awesome-swiper";
import { mediaLink } from "@/apiConfig/mediaLink";

export default {
  props: ["imageUrl", "title", "date"],
  components: {
    SwiperSlide,
  },
  setup() {
    const img = ref(null);

    onMounted(() => {});

    return {
      img,
      mediaLink
    };
  },
};
</script>

<style></style>
