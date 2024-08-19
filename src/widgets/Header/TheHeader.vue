<template>
  <header class="header">
    <div class="container header-wrapper">
      <div class="header-left">
        <router-link
          :to="this.$router.name != 'parent-main' ? '/main' : '/parent-main'"
        >
          <img
            class="header-left__logo"
            src="@/assets/mars-logo.png"
            alt="mars-logo"
          />
        </router-link>
      </div>

      <div class="header-right" v-popover="popoverRef">
        <button
          @click.prevent.stop="postModal = !postModal"
          class="create-post"
          :disabled="!studentInfo?.is_client"
        >
          + {{ $t("header.header-create-post.post-btn") }}
        </button>
        <profile-image
          :borderImgUrl="studentInfo?.rank?.image"
          :canChange="false"
          :modmeId="studentInfo?.external_id"
          :imageUrl="studentInfo?.avatar"
          className="header-right__avatar"
          :is_open_dialog="false"
        />
      </div>
    </div>

    <el-popover
      ref="popoverRef"
      trigger="click"
      popper-class="header-right__popover-wrapper"
      popper-style="width: unset"
    >
      <header-feature
        :student_name="studentInfo?.first_name + ' ' + studentInfo?.last_name"
        :imageUrl="studentInfo?.avatar"
      />
    </el-popover>
    <el-dialog v-model="postModal" class="create-post-modal">
      <create-post @close="created" />
    </el-dialog>
  </header>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ProfileImage } from "@/entities";
import { HeaderFeature } from "@/features";
import "./style/header.css";
import CreatePost from "@/features/CreatePost/CreatePost.vue";
import { useStore } from "vuex";

export default {
  components: { ProfileImage, HeaderFeature, CreatePost },
  setup(_, { emit }) {
    const router = useRoute();

    const homeActive = ref(false);
    const learningActive = ref(false);
    const shopActive = ref(false);

    const checkRoute = () => {
      if (router.path === "/main") {
        homeActive.value = true;
        learningActive.value = false;
        shopActive.value = false;
      } else if (/^\/learning\/\d+$/.test(router.path)) {
        homeActive.value = false;
        learningActive.value = true;
        shopActive.value = false;
      } else if (router.path === "/learning") {
        homeActive.value = false;
        learningActive.value = true;
        shopActive.value = false;
      } else if (router.path === "/space-shop") {
        homeActive.value = false;
        learningActive.value = false;
        shopActive.value = true;
      } else {
        homeActive.value = false;
        learningActive.value = false;
        shopActive.value = false;
      }
    };

    const studentInfo = ref(null);
    const store = useStore();

    onMounted(() => {
      checkRoute();
      studentInfo.value = store.state.student.studentInfo;
    });

    watch(router, () => {
      checkRoute();
    });

    watch(
      () => store.state.student.studentInfo,
      (newValue) => {
        studentInfo.value = newValue;
      }
    );

    const popoverRef = ref();

    const postModal = ref(false);

    const created = () => {
      postModal.value = !postModal.value;
      emit("post-created");
    };

    return {
      homeActive,
      learningActive,
      shopActive,
      studentInfo,
      popoverRef,
      postModal,
      created,
    };
  },
};
</script>
