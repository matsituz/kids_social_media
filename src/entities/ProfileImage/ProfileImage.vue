<template>
  <div :class="['profile-image__wrapper', className]">
    <img
      :src="mediaLink + imageUrl"
      alt=""
      class="profile-image"
      :style="{
        backgroundColor: bgColors[modmeId % 10],
      }"
      @click="avatarPreviewVal = is_open_dialog != false ? true : false"
    />
    <img
      v-if="borderImgUrl"
      :src="mediaLink + borderImgUrl"
      alt=""
      class="profile-image__border"
      @click="avatarPreviewVal = is_open_dialog != false ? true : false"
    />
    <el-dialog
      v-model="avatarPreviewVal"
      class="avatar-modal"
      align-center
    >
      <avatar-preview
        :frame="borderImgUrl"
        :avatar="imageUrl"
        :color="modmeId % 10 || 0"
      />
    </el-dialog>

    <template v-if="canChange">
      <div class="profile-image--change" @click="avatarDialog = true">
        <span>
          <i>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.02 34.875H12.4784C7.18265 34.875 3.625 31.1592 3.625 25.6301V12.8699C3.625 7.3408 7.18265 3.625 12.4784 3.625H26.0216C31.3174 3.625 34.875 7.3408 34.875 12.8699V25.6301C34.875 31.1592 31.3174 34.875 26.02 34.875Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.4784 34.875H26.02C31.3174 34.875 34.875 31.1592 34.875 25.6301V12.8699C34.875 7.3408 31.3174 3.625 26.0216 3.625H12.4784C7.18265 3.625 3.625 7.3408 3.625 12.8699V25.6301C3.625 31.1592 7.18265 34.875 12.4784 34.875ZM13.7795 17.6875C11.6253 17.6875 9.875 15.9348 9.875 13.7812C9.875 11.6277 11.6253 9.875 13.7795 9.875C15.932 9.875 17.6839 11.6277 17.6839 13.7812C17.6839 15.9348 15.932 17.6875 13.7795 17.6875ZM31.47 23.8343C31.9932 25.1759 31.7214 26.7884 31.1621 28.1171C30.499 29.6973 29.2295 30.8938 27.63 31.4162C26.9198 31.6484 26.175 31.75 25.4318 31.75H12.2635C10.9531 31.75 9.79356 31.4356 8.84298 30.8502C8.24749 30.4826 8.14221 29.6344 8.58372 29.0846C9.3222 28.1654 10.0512 27.2431 10.7866 26.3127C12.1881 24.5325 13.1324 24.0165 14.182 24.4696C14.6078 24.6567 15.0351 24.9372 15.4751 25.2339C16.6472 26.0305 18.2765 27.1254 20.4228 25.937C21.8916 25.1144 22.7434 23.7033 23.4853 22.4746L23.4977 22.454C23.55 22.3682 23.6019 22.2824 23.6536 22.1969L23.6543 22.1956C23.9036 21.7831 24.1496 21.3761 24.4278 21.0012C24.7767 20.5319 26.0698 19.0646 27.7447 20.1095C28.8115 20.7674 29.7087 21.6574 30.6687 22.6104C31.0348 22.9748 31.2956 23.3893 31.47 23.8343Z"
                fill="#EF400F"
              />
            </svg>
          </i>
        </span>
      </div>
      <el-dialog v-model="avatarDialog" width="400px" align-center>
        <avatar-dialog
          @closeModal="avatarDialog = false"
          :student_id="student_id"
        />
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { mediaLink } from "@/apiConfig/mediaLink";
import AvatarPreview from "@/components/AvatarPreview.vue";
import AvatarDialog from "@/components/AvatarDialog.vue";
import "./style/profile-img.css";

import { ref } from "vue";

export default {
  props: [
    "imageUrl",
    "borderImgUrl",
    "modmeId",
    "canChange",
    "className",
    "student_id",
    "is_open_dialog",
  ],
  components: {
    AvatarPreview,
    AvatarDialog,
  },
  setup() {
    const bgColors = {
      0: "#7a5548",
      1: "#25c1a1",
      2: "#9d28ac",
      3: "#246bfd",
      4: "#673ab3",
      5: "#facc15",
      6: "#607d8a",
      7: "#00a9f1",
      8: "#8bc255",
      9: "#eb5024",
    };

    const avatarPreviewVal = ref(false);
    const avatarDialog = ref(false);

    return {
      mediaLink,
      bgColors,
      avatarPreviewVal,
      avatarDialog,
    };
  },
};
</script>

<style scoped lang="scss">
.profile-info__avatar-wrapper {
  width: 188px;
  height: 235px;
}
</style>
