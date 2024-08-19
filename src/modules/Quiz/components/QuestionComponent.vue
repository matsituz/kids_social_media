<template>
  <div class="quiz__question-block">
    <div class="quiz__question-block-top">
      <el-progress :percentage="handlePercentage" />
      <p class="quiz__question-block-top__count">
        <!-- {{ activeQuestion + 1 }} / <span>{{ quizQuestions.length }}</span> -->
        {{ activeQuestion }} / <span>{{ totalQuestion }}</span>
      </p>
    </div>
    <div class="quiz__question-block-bottom">
      <h2 class="quiz__question-block-bottom__heading">
        <!-- {{ quizQuestions[activeQuestion].title[lang] }} -->
        {{ question }}
      </h2>
      <div v-if="questionImg">
        <div class="quiz__question-block-bottom__example-photos">
          <el-image
            :src="mediaLink + questionImg"
            :zoom-rate="1.2"
            :preview-src-list="image"
            fit="contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mediaLink } from "@/apiConfig/mediaLink";
export default {
  props: ["question", "activeQuestion", "totalQuestion", "questionImg"],
  data() {
    return {
      mediaLink: mediaLink,
    };
  },
  computed: {
    image() {
      let image = [];
      image.push(this.mediaLink + this.questionImg);
      return image;
    },
    handlePercentage() {
      return (this.activeQuestion * 100) / this.totalQuestion;
    },
  },
};
</script>

<style></style>
