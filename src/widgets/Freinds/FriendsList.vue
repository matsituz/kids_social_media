<template>
  <section class="friends">
    <div class="friends__header">
      <img src="@/assets/profile_logo.png" alt="" />
      <h1>{{ $t("main.friends") }}</h1>
    </div>
    <div class="friends__body" v-if="group && group.students && group.students.length != 0">
      <friend-card
        v-for="student in group.students"
        :key="student?.id"
        :id="student?.id"
        :group_name="group?.course?.name + ' | ' + group?.name"
        :student_name="student?.first_name + ' ' + student?.last_name"
        :avatar="student?.avatar"
      />
    </div>
    <div class="friends__body" v-else>
      <div class="friend no-group">
        <h1>{{ $t("main.no-friends") }}</h1>
      </div>
    </div>
  </section>
</template>

<script>
import "./style/friends-list.css";
import { onBeforeMount, ref, watch } from "vue";
import { getGroup } from "./api/get-group.js";
import FriendCard from "@/entities/Friend/FriendCard.vue";
import { useStore } from "vuex";

export default {
  components: {
    FriendCard,
  },
  setup() {
    const store = useStore();
    const studentInfo = ref(null);
    const group = ref(null);

    const getGroupData = async () => {
      if (studentInfo.value && studentInfo.value.groups) {
        const activeGroup =
          studentInfo.value.groups.find((g) => g.status === 5) ||
          studentInfo.value.groups[studentInfo.value.groups.length - 1];
        if (activeGroup) {
          try {
            const res = await getGroup(activeGroup.id);
            group.value = res.data;
          } catch (error) {
            console.error("Error fetching group:", error);
          }
        }
      }
    };

    watch(
      () => store.state.student.studentInfo,
      async (newValue) => {
        studentInfo.value = newValue;
        if (newValue) {
          await getGroupData();
        }
      }
    );

    onBeforeMount(async () => {
      studentInfo.value = store.state.student.studentInfo;
      if (studentInfo.value) {
        await getGroupData();
      }
    });

    return {
      studentInfo,
      group,
    };
  },
};
</script>
