<template>
  <div class="create-post">
    <!-- Header -->
    <div class="create-post__header">
      <div class="create-post__header-left">
        <img :src="mediaLink + studentInfo?.avatar" alt="" />
      </div>
      <div class="creae-post__header-right">
        <h1>{{ studentInfo?.first_name + " " + studentInfo?.last_name }}</h1>
        <p>{{ activeGroup?.name + " | " + activeGroup?.course.name }}</p>
      </div>
    </div>
    <!-- Body -->
    <div class="create-post__body">
      <el-input
        v-model="description"
        style="width: 100%"
        autosize
        type="textarea"
        :placeholder="$t('header.header-create-post.post-inp')"
      />

      <div class="image-preview" v-if="uploadedImg.length > 0">
        <swiper :slides-per-view="1" navigation>
          <swiper-slide v-for="img in uploadedImg" :key="img" class="wrapper-swiper">
            <img :src="img" alt="Image Preview" class="preview-image" />
          </swiper-slide>
        </swiper>
        <div class="times-btn">
          <button @click="clearData">
            <el-icon size="large" color="white"><CircleCloseFilled /></el-icon>
          </button>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="create-post__footer">
  <el-upload
    drag
    accept=".png, .jpg, .jpeg"
    :auto-upload="false"
    :limit="el-upload-dragger"
    v-model:file-list="fileList"
    @change="handleFileChange"
    class="upload-demo"
  >
    <button class="upload-image">
      <img src="@/assets/upload-img.svg" alt="Upload" />
    </button>
  </el-upload>
 <div>
   <button
    class="send"
    @click="createPost"
    :disabled="!description || uploadedImg.length === 0"
  >
    Post
  </button>
 <button
      v-if="uploadedImg.length > 0"
      class="remove-btn"
      @click="removeImages"
    >
     <img src="@/assets/trash.svg" alt="Delete" />
    </button>
 </div>
  
</div>

  </div>
</template>

<script>
import "./style/style.css";
import { ref, watch } from "vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { postPost } from "./api/create-post";
import { mediaLink } from "@/apiConfig/mediaLink";
import { useStore } from "vuex";
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation]);

export default {
  components: {
    CircleCloseFilled,
    Swiper,
    SwiperSlide,
  },
  setup(_, { emit }) {
    const store = useStore();
    const studentInfo = store.state.student.studentInfo;
    const description = ref("");
    const fileList = ref([]);
    const uploadImg = ref(false);
    const isDisable = ref(true);
    const uploadedImg = ref([]);

    const activeGroup = ref(null);

    watch(() => store.state.student.studentInfo, (newValue) => {
      studentInfo.value = newValue;
      if (studentInfo.value) {
        activeGroup.value =
          studentInfo.value?.groups?.find((group) => group.status === 5);
      }
    });

    const resizeImage = (file, maxWidth) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
              resolve(blob);
            }, file.type);
          };
        };
      });
    };

    // Ensure removeImages is called in the template
    const removeImages = () => {
      uploadedImg.value = [];
      fileList.value = [];
    };

    const handleFileChange = async (file, fileList) => {
      uploadedImg.value = [];
      if (fileList && fileList.length > 0) {
        for (const file of fileList.slice(0, 6)) {
          const rawFile = file?.raw || file;
          if (rawFile && (rawFile instanceof File || rawFile instanceof Blob)) {
            const resizedFile = await resizeImage(rawFile, 300); // Resize to 300px width
            uploadedImg.value.push(URL.createObjectURL(resizedFile));
          } else {
            console.error("Invalid file selected:", rawFile);
          }
        }
        isDisable.value = uploadedImg.value.length > 0 && uploadedImg.value.length <= 6 ? false : true;
      } else {
        uploadedImg.value = [];
        isDisable.value = true;
      }
    };

    const createPost = async () => {
      if (uploadedImg.value.length < 1) {
        console.error("Minimal 1 ta rasim yuklashingiz kerak.");
        return;
      }

      const formData = new FormData();
      for (const img of uploadedImg.value) {
        const response = await fetch(img);
        const blob = await response.blob();
        formData.append("files", blob);
      }
      await postPost(formData, description.value);
      emit("close");
      setTimeout(() => {
        clearData();
        window.location.reload();
      }, 500);
    };

    const clearData = () => {
      description.value = "";
      fileList.value = [];
      uploadedImg.value = [];
      isDisable.value = true;
      uploadImg.value = false;
    };

    return {
      description,
      fileList,
      uploadImg,
      isDisable,
      uploadedImg,
      clearData,
      createPost,
      removeImages, // Make sure removeImages is returned here
      studentInfo,
      activeGroup,
      mediaLink,
      handleFileChange,
    };
  },
};
</script>


<style >
.el-upload-dragger{
  border:0 !important
}
.image-preview {
  position: relative;
  margin-top: 20px;
}
.preview-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
.upload-wrapper-box {
  margin-top: 20px;
  position: relative;
}

.el-upload__text {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
}
.times-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.create-post__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}
.upload-image {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>