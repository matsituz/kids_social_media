<template>
  <div class="avatar-dialog">
    <div class="avatar-dialog__header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.46491 24.2917H18.0343C21.7778 24.2917 24.2918 21.6659 24.2918 17.7587V8.74142C24.2918 4.83421 21.7778 2.20837 18.0354 2.20837H8.46491C4.72257 2.20837 2.2085 4.83421 2.2085 8.74142V17.7587C2.2085 21.6659 4.72257 24.2917 8.46491 24.2917ZM9.38432 12.1459C7.86206 12.1459 6.62516 10.9073 6.62516 9.38546C6.62516 7.86362 7.86206 6.62504 9.38432 6.62504C10.9055 6.62504 12.1435 7.86362 12.1435 9.38546C12.1435 10.9073 10.9055 12.1459 9.38432 12.1459ZM21.8856 16.4896C22.2554 17.4377 22.0633 18.5772 21.668 19.5161C21.1995 20.6328 20.3023 21.4783 19.172 21.8475C18.6701 22.0116 18.1439 22.0834 17.6187 22.0834H8.31304C7.38703 22.0834 6.56761 21.8612 5.89587 21.4475C5.47505 21.1877 5.40066 20.5884 5.71266 20.1998C6.23451 19.5503 6.7497 18.8985 7.26934 18.241C8.25975 16.983 8.92705 16.6184 9.66875 16.9386C9.96965 17.0708 10.2717 17.269 10.5825 17.4787C11.4108 18.0416 12.5623 18.8153 14.079 17.9755C15.1169 17.3942 15.7189 16.3971 16.2431 15.5287L16.2519 15.5142C16.2889 15.4534 16.3257 15.3926 16.3623 15.3319L16.3625 15.3316L16.3626 15.3316C16.5387 15.0401 16.7125 14.7525 16.9092 14.4875C17.1557 14.1559 18.0695 13.119 19.2531 13.8574C20.007 14.3223 20.641 14.9513 21.3194 15.6247C21.5781 15.8823 21.7624 16.1751 21.8856 16.4896Z"
          fill="#EF400F"
        />
      </svg>
      <h2 class="avatar-dialog__header-title">{{ $t("avatar.title") }}</h2>
    </div>
    <div class="tabs">
      <div @click="selectedTab = 'images'" :class="{ red: isImagesTabActive }">
        <img
          src="@/assets/images-grey.png"
          alt="images"
          v-if="isAvatarsTabActive"
          style="width: 20px"
        />
        <img
          src="@/assets/images-red.png"
          alt="images"
          v-if="isImagesTabActive"
          style="width: 20px"
        />
        <p :class="{ 'red-text': isImagesTabActive }">Images</p>
      </div>
      <div
        @click="selectedTab = 'avatars'"
        :class="{ red: isAvatarsTabActive }"
      >
        <img
          src="@/assets/avatar-grey.png"
          alt="avatars"
          v-if="isImagesTabActive"
          style="width: 20px"
        />
        <img
          src="@/assets/avatars-red.png"
          alt="avatars"
          v-if="isAvatarsTabActive"
          style="width: 20px"
        />
        <p :class="{ 'red-text': isAvatarsTabActive }">Avatars</p>
      </div>
    </div>
    <div
      class="upload-wrapper-box"
      v-if="isDisable && selectedTab === 'images'"
    >
      <el-upload
        class="upload-demo"
        drag
        accept=".png , .jpg, .jpeg "
        :auto-upload="false"
        v-model:file-list="fileList"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">{{ $t("avatar.file") }}</div>
      </el-upload>
    </div>
    <div class="avatar-images" v-if="isDisable && selectedTab === 'avatars'">
      <template v-for="(avatar, index) in avatars" :key="index">
        <img
          @click="selectAvatar(index)"
          :src="mediaLink + avatar"
          alt="profile-photo"
          :style="{ backgroundColor: avatarBgColors[index] }"
        />
      </template>
    </div>
    <div class="avatar-preview" v-if="!isDisable && selectedTab === 'avatars'">
      <div class="times-btn">
        <button @click="clearData">
          <el-icon size="large"><CircleCloseFilled /></el-icon>
        </button>
      </div>
      <img :src="selectedAvatar" alt="avatar-preview" style="max-width: 100%" />
    </div>
    <div
      class="cropper-wrapper"
      v-if="!isDisable && uploadedImg && selectedTab === 'images'"
    >
      <div class="times-btn">
        <button @click="clearData">
          <el-icon size="large"><CircleCloseFilled /></el-icon>
        </button>
      </div>
      <cropper
        :src="uploadedImg"
        ref="cropperRef"
        class="upload-example-cropper"
        :stencil-props="{
          handlers: {},
          movable: false,
          resizable: false,
          aspectRatio: 1,
        }"
        :stencil-size="{
          width: 230,
          height: 230,
        }"
        :resize-image="{
          adjustStencil: false,
        }"
        image-restriction="stencil"
      />
    </div>

    <div class="avatar-dialog-btn">
      <button v-if="!isDisable" class="upload-btn" @click="postImg">
        {{ $t("avatar.upload") }}
      </button>
      <button
        v-else-if="fileList.length"
        class="upload-btn"
        @click="handleUploadSuccess"
      >
        {{ $t("avatar.next") }}
      </button>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch, onBeforeMount } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { postAvatarImg } from "@/service/post-avatar-img";
import { ElNotification } from "element-plus";
import { getAvatars } from "@/service/get-avatars";
import { mediaLink } from "@/apiConfig/mediaLink";

export default {
  props: ["student_id"],
  components: {
    UploadFilled,
    Cropper,
    CircleCloseFilled,
  },
  setup(props, { emit }) {
    const isDisable = ref(true);
    const uploadedImg = ref(null);
    const fileList = ref([]);
    const cropperRef = ref(null);
    const lang = localStorage.getItem("lang");
    const selectedTab = ref("avatars");

    const handleUploadSuccess = () => {
      isDisable.value = false;
      uploadedImg.value = URL.createObjectURL(
        fileList.value[0]?.raw ? fileList.value[0].raw : fileList.value[0]
      );
    };

    const postImg = async () => {
      if (selectedTab.value === "avatars") {
        const selectedAvatarId = await selectAvatar(avatarId.value); // Await the result
        await postAvatarImg(null, selectedAvatarId, props.student_id);
      } else if (selectedTab.value === "images" && uploadedImg.value !== null) {
        const result = cropperRef.value.getResult();
        const canvas = document.createElement("canvas");
        canvas.width = result.canvas.width / 2;
        canvas.height = result.canvas.height / 2;
        const context = canvas.getContext("2d");
        context.drawImage(result.canvas, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append("file", blob);
          await postAvatarImg(formData, null, props.student_id);
        }, "image/jpeg");
      }

      // Common cleanup
      fileList.value = [];
      uploadedImg.value = null;
      isDisable.value = true;
      ElNotification({
        message: lang == "uz" ? "Rasm yangilandi!" : "Изображение обновлено!",
        type: "success",
      });
      emit("closeModal", false);
    };

    const clearData = () => {
      fileList.value = [];
      uploadedImg.value = null;
      isDisable.value = true;
    };

    const avatars = ref(null);

    const getAvatarImgs = async () => {
      avatars.value = await getAvatars().then((res) => res.data);
    };

    onBeforeMount(() => {
      getAvatarImgs();
    });

    const avatarBgColors = {
      0: "#FBF0B2",
      1: "#FFE4D6",
      2: "#D2E0FB",
      3: "#DFCCFB",
      4: "#D2E0FB",
      5: "#DBFBB2",
      6: "#B2FBCF",
      7: "#FBB2EF",
      8: "#FBF0B2",
      9: "#DFCCFB",
    };

    let selectedAvatar = ref(null);
    let avatarId = ref(null);

    const selectAvatar = async (avatarIndex) => {
      const avatarUrl = avatars.value[avatarIndex];
      avatarId.value = avatarIndex;

      isDisable.value = false;

      selectedAvatar.value = mediaLink + avatarUrl;

      return avatarId.value;
    };

    const isAvatarsTabActive = computed(() => selectedTab.value === "avatars");
    const isImagesTabActive = computed(() => selectedTab.value === "images");

    watch(selectedTab, () => {
      clearData();
    });

    return {
      isDisable,
      handleUploadSuccess,
      uploadedImg,
      fileList,
      cropperRef,
      postImg,
      clearData,
      selectAvatar,
      selectedTab,
      isAvatarsTabActive,
      isImagesTabActive,
      avatars,
      getAvatarImgs,
      mediaLink,
      avatarBgColors,
      selectedAvatar,
      avatarId,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/avatar-dialog/avatar-dialog.scss";
</style>
