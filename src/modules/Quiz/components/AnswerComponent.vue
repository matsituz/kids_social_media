<template>
  <div class="quiz__answers-block">
    <div class="quiz__answers-block__answers">
      <el-radio-group
        v-model="radio"
        v-if="quizQuestions[activeQuestion].type === 'Single Choice'"
      >
        <el-radio
          v-for="(answer, i) in quizQuestions[activeQuestion].options"
          :key="answer.id"
          :label="answer.id"
          :class="[
            {
              correct:
                isCorrect && isCorrect === radio && isCorrect === answer.id,
            },
            {
              incorrect:
                isCorrect && isCorrect !== radio && isCorrect !== answer.id,
            },
            // 'correct',
          ]"
          ><div class="quiz__answers-block__answer-num">{{ answ[i] }}</div>
          <p class="quiz__answers-block__answer">
            {{ answer.answer }}
          </p>
          <!-- <div class="correctAnsw">
                <img src="../assets/austronaut-like.png" alt="" />
              </div> -->
        </el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-model="checkList"
        v-if="quizQuestions[activeQuestion].type === 'Multiple Choice'"
      >
        <el-checkbox
          v-for="answer in quizQuestions[activeQuestion].options"
          :key="answer.id"
          :label="answer.id"
          :class="[
            {
              correct: isCorrect && answer.id in isCorrect,
            },
            {
              incorrect: isCorrect && !(answer.id in isCorrect),
            },
          ]"
          >{{ answer.answer }}
        </el-checkbox>
      </el-checkbox-group>
      <button
        class="quiz__answers-block__answers__btn"
        @click="(radio || checkList.length >= 1) && postAnswer()"
        :style="{
          cursor: (radio || checkList.length >= 1) && 'pointer',
          background:
            (radio || checkList.length >= 1) &&
            'linear-gradient(286.17deg, #e33d0e 0%, #ff7d58 100%)',
        }"
      >
        {{ $t("quiz.send-btn") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['answerType', 'answers']
};
</script>

<style></style>
