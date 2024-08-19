<template>
  <main class="parent-part">
    <section class="container">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8">
          <h2 class="activity-title">
            {{ $t("parent-part.parent-part-student-activity") }}
          </h2>
          <payment-component
            :balance="studentInfo?.balance"
            :payment_link="studentInfo?.payment_link"
            :moodme_id="studentInfo?.external_id"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="16">
          <LeadsAdvertisement />
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :xs="24" :md="8">
          <h2 class="parent-part__exam-title" ref="examResultRef">
            {{ $t("exam-results.exam-title") }}
          </h2>
          <table v-if="studentInfo?.groups?.length">
            <thead>
              <tr>
                <th>Modul</th>
                <th>Baho</th>
              </tr>
            </thead>
            <tbody v-if="examResults?.length">
              <tr v-for="(exam, i) in examResults" :key="i">
                <td>{{ i + 1 }} - Module</td>
                <td><TheMark :mark="exam?.total_mark" /></td>
              </tr>
            </tbody>
            <p v-else>Imtihon natijalari topilmadi</p>
          </table>
          <p v-else>Aktiv guruh topilmadi</p>
        </el-col>
        <el-col :xs="24" :md="16">
          <div v-if="studentInfo?.groups?.length">
            <div class="homeTasksHeader">
              <h2 class="parent-part__course-title" ref="projectsRef">
                {{ $t("parent-part.parent-part-title") }}
              </h2>
              <el-select
                v-model="groupId"
                placeholder="Guruh"
                @change="getCourseElements"
              >
                <el-option
                  v-for="gr in studentInfo?.groups"
                  :key="gr.id"
                  :label="gr.name"
                  :value="gr.id"
                />
              </el-select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Vazifa</th>
                  <th>Izoh</th>
                  <th>Baho</th>
                </tr>
              </thead>
              <tbody v-if="studentCourseInfo?.length">
                <tr v-for="(task, i) in studentCourseInfo" :key="task.id">
                  <td>{{ i + 1 }}.{{ task?.title[lang] }}</td>
                  <td>
                    {{ task?.answer?.comment || "-" }}
                  </td>
                  <td>
                    <TheMark :mark="task?.answer?.mark" />
                  </td>
                </tr>
              </tbody>
              <p v-else>Uyga vazifalar topilmadi</p>
            </table>
          </div>
          <p v-else>Aktiv guruh topilmadi</p>
        </el-col>
      </el-row>
    </section>
  </main>
</template>
<script setup>
// import CalendarComponent from "../../components/CalendarComponent.vue";
import { ref, computed, watch } from "vue";
import { getProjects } from "@/service/get-courses.service";
import { getExamResult } from "@/service/get-exam-result";
import PaymentComponent from "./component/PaymentComponent.vue";
import LeadsAdvertisement from "@/widgets/LeadsAdvertisement/LeadsAdvertisement.vue";
import { useStore } from "vuex";
import TheMark from "@/components/TheMark.vue";

const lang = localStorage.getItem("lang") || "uz";
const groupId = ref(null);
const studentCourseInfo = ref([]);
const examResults = ref(null);

const store = useStore();
const studentInfo = computed(() => store.state.student.studentInfo);

//get method of selected course elements

const getCourseElements = async () => {
  if (groupId.value) {
    const courseId = studentInfo.value?.groups?.find(
      (gr) => gr.id == groupId.value
    )?.course?.id;
    studentCourseInfo.value = await getProjects(courseId)
      .then((res) => res.data)
      .catch(() => []);
  }
};

const getStudentExamResults = async () => {
  if (groupId.value) {
    examResults.value = await getExamResult(groupId.value)
      .then((res) => res.data)
      .catch(() => []);
  }
};
watch(
  () => studentInfo.value,
  () => {
    if (!groupId.value && studentInfo.value?.groups?.length) {
      groupId.value = studentInfo.value?.groups[0]?.id;
    }
  }
);
watch(
  () => groupId.value,
  () => {
    getCourseElements();
    getStudentExamResults();
  }
);
</script>
