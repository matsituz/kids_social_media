<template>
  <div class="quiz" v-if="quizInfo">
    <h1
      :class="[
        'task-about__heading',
        // {
        //   'task-about__heading--checking': task.status === 'uploaded',
        // },
        // {
        //   'task-about__heading--marked': task.status === 'marked',
        // },
      ]"
    >
      {{ quizInfo.title[lang] }}
    </h1>
    <question-component
      :question="quiz[activeQuestion].title[lang]"
      :activeQuestion="activeQuestion + 1"
      :totalQuestion="quiz.length"
      :questionImg="quiz[activeQuestion].image"
    />
    <answer-component></answer-component>
    <button @click="activeQuestion = activeQuestion + 1">Next</button>
  </div>
</template>

<script>
import QuestionComponent from "./components/QuestionComponent.vue";
import AnswerComponent from "./components/AnswerComponent.vue";
import { getQuizInfo, getQuiz } from "./api/quiz.api";

export default {
  components: {
    QuestionComponent,
    AnswerComponent,
  },
  data() {
    return {
      quizInfo: null,
      quiz: null,
      activeQuestion: 0,
      lang: localStorage.getItem("lang") || this.$i18n.locale,
    };
  },
  async beforeMount() {
    this.quizInfo = await getQuizInfo(4);
    this.quiz = await getQuiz(this.quizInfo.id);
    console.log(this.quizInfo);
    console.log(this.quiz);
  },
};
</script>

<style></style>
