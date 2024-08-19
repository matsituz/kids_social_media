<template>
  <div class="rank-levels">
    <p class="rank-levels-title">{{ $t("main.levels-up") }}</p>
    <table class="rank-levels-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="rank in getLvlMarks(1)" :key="rank.id">
            <div
              :style="{
                opacity: studentXp >= rank.xp_from ? 1 : 0.2,
              }"
            >
              <img
                :src="mediaLink + rank?.taskbadge[0]?.image"
                alt=""
                class="rank-image"
              />
              <el-dialog v-model="avatarPreviewVal" align-center>
                <avatar-preview :frame="rank?.taskbadge[0]?.image" />
              </el-dialog>
              <p class="rank-title">
                {{ rank?.taskbadge[0].title }}
              </p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lvl in maxLevel" :key="lvl">
          <td>
            <div class="stars-cell">
              <img
                v-for="star in lvl"
                :key="star"
                width="22"
                src="@/assets/rank-star.svg"
                alt=""
              />
            </div>
          </td>
          <td v-for="range in getLvlMarks(lvl)" :key="range">
            <p
              class="rank-xp"
              :style="{
                color:
                  studentXp >= range?.xp_from && studentXp <= range?.xp_till
                    ? '#f1f578'
                    : range?.xp_from <= studentXp
                    ? '#94ed82'
                    : '#78bbf5',
              }"
            >
              {{ range?.xp_from + "-" + (range?.xp_till || " ...") }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import frame from "@/assets/lvl_2.svg";
import { mediaLink } from "@/apiConfig/mediaLink";

import { onMounted, ref } from "vue";
import { getRanks } from "../api";
// import { Check } from "@element-plus/icons-vue";
export default {
  props: ["level", "studentXp"],
  setup() {
    const ranks = ref([]);
    const maxLevel = ref(null);
    const avatarPreviewVal = ref(false);
    onMounted(async () => {
      ranks.value = await getRanks()
        .then((res) => {
          return res.data;
        })
        .catch(() => []);
      sortRanks();
    });

    const sortRanks = () => {
      ranks.value.sort((a, b) => a.level - b.level);
      maxLevel.value = ranks.value.at(-1).level;
    };

    const getLvlMarks = (level) => {
      return ranks.value
        .filter((el) => el.level == level)
        .sort((a, b) => a.xp_from - b.xp_from);
    };

    return {
      frame,
      ranks,
      maxLevel,
      getLvlMarks,
      mediaLink,
      avatarPreviewVal,
    };
  },
};
</script>
<style lang="scss">
@import "./style/rank-levels.scss";
</style>
