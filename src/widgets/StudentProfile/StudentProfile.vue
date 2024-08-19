<template>
  <div class="profile-info">
    <div class="profile-info__wrapper" v-if="studentProfile">
      <profile-image
        :imageUrl="studentProfile?.avatar"
        :borderImgUrl="studentProfile?.rank?.image"
        :modmeId="studentProfile?.external_id"
        :canChange="false"
        :student_id="studentProfile?.id"
      />
      <div class="profile-info__level" @click="levelsModal = true">
        <p class="profile-info__level__heading">Levels</p>
        <div class="profile-info__level-stars">
          <img
            src="@/assets/rank-star.svg"
            alt=""
            width="20"
            v-for="star in studentProfile?.rank?.task?.level"
            :key="star"
          />
        </div>
      </div>
      <h4 class="profile-info__user-name">
        {{ studentProfile?.first_name }} {{ studentProfile?.last_name }}
      </h4>
      <p class="profile-info__user-faculty" v-if="activeGroup">
        {{ $t(`ligas.${studentProfile?.liga}`) }} •
        {{ activeGroup?.name || " -" }}
        •
        {{activeGroup?.teacher || " - " }}
        •
        {{ activeGroup?.lesson_start_time.slice(0, 5) || "-" }}
      </p>
      <p class="profile-info__user-faculty" v-else>Group not found!</p>
      <div class="profile-info__block">
        <div class="profile-info__block-coins">
          <img class="coin-img" src="@/assets/Coin.svg" alt="coin-icon" />
          <p class="profile-info__block-coins-count">
            {{ studentProfile?.coins }}
          </p>
        </div>
        <div class="profile-info__block-xp">
          <img class="xp-img" src="@/assets/XP.svg" alt="xp-icon" />
          <p class="profile-info__block-xp-count">
            {{ studentProfile?.xp || "-" }}
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="levelsModal"
      align-center
      style="background-color: transparent; box-shadow: none"
    >
      <rank-levels
        :level="studentProfile?.rank?.task?.level || 0"
        :studentXp="studentProfile?.xp || 0"
      />
    </el-dialog>
  </div>
</template>

<script>
import { ProfileImage } from "../../entities";
import { ref, watchEffect } from "vue";
import RankLevels from "@/modules/RankLevels/UI/RankLevels.vue";
import "./style/profile-component.css";

export default {
  components: {
    ProfileImage,
    RankLevels,
  },
  props: ["studentProfile"],
  setup(props) {
    const levelsModal = ref(false);
    const activeGroup = ref(null)

    watchEffect(() => activeGroup.value = props.studentProfile?.groups?.find(g => g.status === 5));

    return {
      levelsModal,
      activeGroup
    };
  },
};
</script>
