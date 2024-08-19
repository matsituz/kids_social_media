<template>
  <div class="avatar-preview">
    <div class="avatar-preview-images" style="width: 400px; height: 400px">
      <img
        v-if="frame"
        :src="mediaLink + frame"
        alt=""
        class="avatar-preview-images__frame"
      />
      <img
        :src="mediaLink + avatar"
        alt=""
        class="avatar-preview-images__avatar"
        :style="{ backgroundColor: bgColors[color] }"
      />
    </div>
  </div>
</template>
<script>
import { myMixins } from "@/mixins";
import { mediaLink } from "@/apiConfig/mediaLink";
import frameImg from "@/assets/lvl_6.svg";

export default {
  mixins: [myMixins],
  props: ["frame", "avatar", "color"],
  setup() {
    return {
      mediaLink,
      frameImg,
    };
  },
};
</script>
