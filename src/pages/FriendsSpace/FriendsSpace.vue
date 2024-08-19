<template>
  <main class="main main-page">
    <div class="friends-space container">
      <div class="friends-space-left">
        <h2 class="main__heading profile-info__heading">
          {{ $t("main.profile") }}
        </h2>
        <student-profile :studentProfile="student?.profile" />
      </div>
      <div class="friends-space-right">
        <div class="blog-feed-section">
          <blog-feed :useId="true" :id="id" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import "./style/style.css";
import StudentProfile from "@/widgets/StudentProfile/StudentProfile.vue";
import BlogFeed from "@/widgets/BlogFeed/BlogFeed.vue";
import { getStudents } from "./api/get-student";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    StudentProfile,
    BlogFeed,
  },
  setup(_, { emit }) {
    const studentProfile = ref(true);
    const student = ref("");

    const route = useRoute();
    const id = ref(null);

    const getStudentData = async () => {
      id.value = route.params.id;
      student.value = await getStudents(id.value).then((res) => res.data);
    };

    onBeforeMount(async () => {
      await getStudentData();
    });

    const close = () => {
      emit("close");
    };

    return {
      studentProfile,
      close,
      student,
      id,
    };
  },
};
</script>