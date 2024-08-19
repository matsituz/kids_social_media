<template>
  <div class="el-tabs__content">
    <p v-if="alreadyCreated" class="error">
      {{ $t("login.offerta-already-created") }}
    </p>
    <form class="auth-form">
      <div class="input-wrapper">
        <input
          type="text"
          class="auth-form__input"
          placeholder="Modme Id"
          v-model="studentId"
          @input="getStudent"
        />
        <button class="verifyBtn" @click.prevent.stop="studentId=''">
          <img src="@/assets/close-circle.svg" alt="" />
        </button>
      </div>
      <div class="offerta-student" v-if="student.length">
        <div class="offerta-student-left">
          <img
            :src="
              student[0]?.profile?.avatar
                ? mediaLink + student[0]?.profile?.avatar
                : require('@/assets/av-code.png')
            "
            alt=""
          />
          <div class="offerta-student-left-details">
            <h2>{{ student[0]?.name }}</h2>
            <p>
              {{
                activeGroup?.name ||
                student[0]?.groups[student[0]?.groups?.length - 1]?.name
              }}
            </p>
          </div>
        </div>
        <div class="offerta-student-right">
          <p>
            {{
              activeGroup?.branch?.title ||
              student[0]?.groups[student[0]?.groups?.length - 1]?.branch?.title
            }}
          </p>
        </div>
      </div>
      <div class="auth-form__check">
        <input type="checkbox" v-model="offerCheck" />
        <label @click="offerCheck = !offerCheck">{{
          $t("login.offerta-check")
        }}</label>
      </div>
    </form>
    <button
      class="auth-form__btn_in_signing"
      @click="signOfferta"
      style="margin-top: 20px"
      :disabled="!offerCheck || !student.length"
    >
      {{ $t("login.signing") }}
    </button>
  </div>
</template>
<script>
import "./style/offerta-student.css";
import { ref } from "vue";
import { getSearch } from "./api/get-search";
import { mediaLink } from "@/apiConfig/mediaLink";
import { postOfferta } from "./api/post-offerta";
export default {
  props: ["offerta_id", "name", "phone"],
  setup(props, { emit }) {
    const studentId = ref("");
    const offerCheck = ref(false);
    const offerChecked = ref(false);
    const student = ref([]);
    const activeGroup = ref("");
    const alreadyCreated = ref(false);

    const getStudent = async () => {
      if (studentId.value.length >= 5) {
        const searchedStudent = await getSearch(studentId.value).then(
          (res) => res.data.students
        );

        student.value = searchedStudent.filter((s) => {
          return s.external_id == studentId.value;
        });
      }

      activeGroup.value = student.value[0]?.groups.find((group) => {
        return group.status === 5;
      });
    };

    const signOfferta = async () => {
      alreadyCreated.value = false;
      offerChecked.value = false;
      try {
        offerChecked.value = !offerChecked.value;
        if (student.value.length && offerCheck.value) {
          const data = {
            student_id: student.value[0]?.id,
            term_and_condition_id: props.offerta_id,
            full_name: props.name,
            phone_number: "+998" + props.phone,
          };

          const response = await postOfferta(data);
          if (response) {
            emit("offer-checked");
            return response;
          }
        }
      } catch (error) {
        console.error("Error signing offerta:", error);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.detail === "Already created"
        ) {
          alreadyCreated.value = true;
        }
        throw error;
      }
    };

    return {
      studentId,
      offerCheck,
      offerChecked,
      getStudent,
      student,
      mediaLink,
      activeGroup,
      signOfferta,
      alreadyCreated,
    };
  },
};
</script>
<style>
.error {
  text-align: left;
  color: red;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>