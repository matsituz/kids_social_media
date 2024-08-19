<template>
  <div class="share-link">
    <div class="share-link-left">
      <!-- <img
        class="share-link-left-img"
        src="@/assets/share-icon-left.svg"
        alt=""
      /> -->

      <div>
        <p class="share-link-left-titleshr">
          {{ $t("main.share-link.heading") }}
        </p>
        <p class="share-link-left-textshr">
          {{ $t("main.share-link.title") }}
        </p>
      </div>
    </div>
    <div class="share-link-right">
      <div class="certificate-check-right">
        <button class="share-link-left-btn" @click="dialogVal = !dialogVal">
          Share
          <img src="@/assets/arrow-right-blue.svg" alt="" />
        </button>
      </div>
      <el-dialog
        v-model="dialogVal"
        class="share-link-custom-share-dialog"
      >
        <share-link @close="dialogVal = !dialogVal" />
      </el-dialog>
    </div>
  </div>
</template>
  <style lang="scss">
@import "./style/share-link.scss";
</style>
  

  <script>
import { ref } from "vue";
import ShareLink from "@/features/ShareLink/ShareLink.vue";
export default {
  components: {
    ShareLink,
  },
  setup() {
    const dialogVal = ref(false);

    return {
      dialogVal,
    };
  },
};
</script>