<template>
  <div class="profile-info">
    <div class="profile-info__wrapper" v-if="studentInfo">
      <profile-image
        :imageUrl="studentInfo?.avatar"
        :borderImgUrl="studentInfo?.rank?.image"
        :modmeId="studentInfo?.external_id"
        :canChange="true"
        :student_id="studentInfo.id"
      />
      <div class="profile-info__level" @click="levelsModal = true">
        <p class="profile-info__level__heading">Levels</p>
        <div class="profile-info__level-stars">
          <img
            src="@/assets/rank-star.svg"
            alt=""
            width="20"
            v-for="star in studentInfo?.rank?.task?.level"
            :key="star"
          />
        </div>
      </div>
      <h4 class="profile-info__user-name">
        {{ studentInfo?.first_name }} {{ studentInfo?.last_name }}
      </h4>
      <p class="profile-info__user-faculty" v-if="activeGroup">
        {{ $t(`ligas.${studentInfo?.liga}`) }} •
        {{ activeGroup?.name || " -" }}
        •
        {{ activeGroup?.teacher || " - " }}
        •
        {{ activeGroup?.lesson_start_time.slice(0, 5) || "-" }}
      </p>
      <p class="profile-info__user-faculty" v-else>
        {{ studentInfo?.company?.title }} filial
      </p>
      <div class="profile-info__block">
        <div class="profile-info__block-coins" @click="coinsDialog = true">
          <img class="coin-img" src="@/assets/Coin.svg" alt="coin-icon" />
          <p class="profile-info__block-coins-count">
            {{ studentInfo?.coins }}
          </p>
        </div>
        <div class="profile-info__block-xp">
          <img class="xp-img" src="@/assets/XP.svg" alt="xp-icon" />
          <p class="profile-info__block-xp-count">
            {{ studentInfo?.xp || "-" }}
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="coinsDialog"
      align-center
      class="coins-history-modal"
    >
      <coins-history @close="coinsDialog = false" />
    </el-dialog>
    <el-dialog
      v-model="levelsModal"
      align-center
      style="background-color: transparent; box-shadow: none"
    >
      <rank-levels
        :level="studentInfo?.rank?.task?.level || 0"
        :studentXp="studentInfo?.xp || 0"
      />
    </el-dialog>
  </div>
</template>

<script>
import { ProfileImage } from "../../entities";
import { onBeforeMount, ref } from "vue";
import { getStudentInfo } from "./api/get-student-info.api";
import RankLevels from "@/modules/RankLevels/UI/RankLevels.vue";
import "./style/profile-component.css";
import CoinsHistory from "@/widgets/CoinsHistory/CoinsHistory.vue";

export default {
  components: {
    ProfileImage,
    RankLevels,
    CoinsHistory,
  },
  setup() {
    const studentInfo = ref(null);
    const coinsDialog = ref(false);

    const activeGroup = ref(null);

    const studentInfoGet = async () => {
      try {
        const res = await getStudentInfo();

        studentInfo.value = res.data;
      } catch (error) {
        console.error("Error fetching student info:", error);
      }
    };

    onBeforeMount(async () => {
      await studentInfoGet();
      activeGroup.value =
        studentInfo.value.groups.filter((el) => el?.status === 5).at(-1) ||
        null;
      localStorage.setItem("activeGroup", activeGroup.value?.id);
      localStorage.setItem("activeCourse", activeGroup.value?.course?.id);
    });

    const levelsModal = ref(false);

    return {
      studentInfo,
      activeGroup,
      levelsModal,
      coinsDialog,
    };
  },
};
</script>
