<template>
  <div class="blog-post">
    <!-- Header -->
    <div class="blog-post__header-wrapper">
      <router-link
        :to="`/student-profile/${student.id}`"
        class="blog-post__header"
      >
        <div class="blog-post__header-left">
          <img
            :src="
              student?.profile?.avatar
                ? mediaLink + student?.profile?.avatar
                : require('@/assets/av-code.png')
            "
            alt="Avatar"
          />
        </div>
        <div class="blog-post__header-right">
          <h1>{{ student?.first_name + " " + student?.last_name }}</h1>
          <p>{{ postCreatedAt }}</p>
        </div>
      </router-link>
      <div
        v-if="mySpace || student.id === studentInfo.id"
        class="blog-post__header-wrapper-right"
        @click="showPostDelete = !showPostDelete"
      >
        <img src="@/assets/three-dots.svg" alt="Options" />
      </div>
      <button v-if="showPostDelete" class="delete_btn" @click="deletePost">
        Delete
      </button>
    </div>

    <!-- Body -->
    <div class="blog-post__body">
      <p class="post-text">{{ description }}</p>
      
      <!-- Swiper component -->
      <swiper
        v-if="images.length > 0"
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true }"
        class="mySwiper"
      >
        <swiper-slide v-for="img in images" :key="img.id">
          <img
            class="post-image"
            :src="mediaLink + img.file"
            alt="Post Image"
            @click="showImagePreview(mediaLink + img.file)"
          />
        </swiper-slide>
      </swiper>

      <div
        class="post-reactions"
        :class="{ 'show-comment': showComment || showLikedBy }"
        :style="{ gap: comments.length <= 0 ? '10px' : '60px' }"
      > 
        <div class="likedBy" @click="toggleLikedBy">
          <send-like
            :id="id"
            :liked="liked"
            @liked="handleLiked"
            class="like_btn"
          />
          <button
            class="liked_wrapper"
            :class="{ 'active-liked-wrapper': likes.length > 0 && showLikedBy }"
            @click="toggleLikedBy"
          >
            {{ likes.length > 0 ? '' : 'Liked By ' }}
            <span>{{ likes.length }}</span>
          </button>
        </div>
        <button
          v-if="comments.length <= 0"
          :class="{ 'comment-btn': showComment }"
          @click="toggleComments"
        >
          <img v-if="!showComment" src="@/assets/message.svg" alt="Comments" />
          <img v-else src="@/assets/message-dark.svg" alt="Comments" />
          Comments
        </button>
        <button
          v-else
          :class="{ 'comment-btn': showComment }"
          @click="toggleComments"
        >
          <div
            class="comment-number-icons"
            :class="{
              'one-comment': comments.length === 1,
              'few-comments': comments.length > 1 && comments.length < 3,
            }"
          >
            <img
              v-for="(image, index) in commentImages"
              :key="index"
              :src="image"
              :alt="'comment-icon-' + (index + 1)"
            />
          </div>
          {{ comments.length > 0 ? '' : 'Comments ' }}
          {{ comments.length }}
        </button>
      </div>

      <!-- Likes -->
      <div class="post-likes-wrapper post-comments" v-if="showLikedBy">
        <router-link
          :to="`/student-profile/${like.student_id}`"
          v-for="like in likes"
          :key="like.student_id"
          class="like_Wapper"
        >
          <div class="post-comments-left">
            <img
              v-if="like.avatar !== null"
              :src="like.avatar !== '' ? mediaLink + like.avatar : require('@/assets/blog-avatar.svg')"
              alt="Like Avatar"
              class="like_img"
            />
          </div>
          <div class="post-comments-left-title">
            <h1
              v-if="like.first_name !== null && like.last_name !== null"
              :class="[{ 'my-comment': like.student_id === studentInfo.id }]"
            >
              {{ like.first_name + " " + like.last_name }}
            </h1>
          </div>
        </router-link>
        <h1 v-if="likes.length === 0">No one has liked this post yet.</h1>
      </div>

      <!-- Comments -->
      <div class="post-comments" v-if="showComment">
        <template v-if="comments && comments.length">
          <div
            class="post-comments-wrapper"
            v-for="(comment, i) in formattedComments"
            :key="i"
          >
            <div class="post-comments-left">
              <router-link :to="`/student-profile/${comment.student_id}`">
                <img
                  :src="
                    comment.avatar
                      ? mediaLink + comment.avatar
                      : require('@/assets/blog-avatar.svg')
                  "
                  alt="Comment Avatar"
                />
              </router-link>
              <div class="post-comments-left-title">
                <router-link :to="`/student-profile/${comment.student_id}`">
                  <h1
                    :class="[
                      { 'my-comment': comment.student_id === studentInfo.id },
                    ]"
                  >
                    {{
                      comment?.first_name
                        ? comment?.first_name + " " + comment?.last_name
                        : "Unknown"
                    }}
                  </h1>
                </router-link>
                <p>{{ comment?.text }}</p>
              </div>
            </div>
            <div
              :class="[
                'post-comments-right',
                { 'my-comment': comment.student_id === studentInfo.id },
              ]"
            >
              <p>
                {{ comment.formattedCreatedAt }}
              </p>
              <div
                class="post-comments-right-del"
                v-if="comment.student_id === studentInfo.id"
              >
                <img
                  src="@/assets/three-dots.svg"
                  alt="Options"
                  @click="toggleCommentDelete(comment._id)"
                  class="post-comments-right-del-img"
                />
                <button
                  v-if="commentDeleteStatus[comment._id]"
                  class="post-comments-right-del-btn"
                  @click="deleteComment(comment._id)"
                >
                  <img src="@/assets/trash.svg" alt="Delete" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="post-comments-wrapper">
          <h1>No comment</h1>
        </div>
      </div>
    </div>

    <!-- Comment Input -->
    <div class="blog-post__footer">
      <send-comment
        v-if="studentInfo.is_client"
        :id="id"
        @commentAdded="handleCommentAdded"
      />
    </div>

    <!-- Image Preview Modal -->
    <div
      v-if="selectedImage"
      class="image-preview-modal"
      @click="selectedImage = null"
    >
      <img class="img" :src="selectedImage" alt="Image Preview" />
      <button @click="selectedImage = null">
        <img src="@/assets/times-white.png" alt="Close" />
      </button>
    </div>
  </div>
</template>
<script setup>
import "./style/style.css";
import { ref, computed, defineProps, defineEmits, watch } from "vue";
import { mediaLink } from "@/apiConfig/mediaLink";
import SendComment from "@/features/SendComment/SendComment.vue";
import SendLike from "@/features/SendLike/SendLike.vue";
import { DateTime } from "luxon";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";

const props = defineProps([
  "id",
  "description",
  "images",
  "student",
  "comments",
  "liked",
  "likes",
  "created_at",
  "refreshSinglePost",
  "mySpace",
]);

const emits = defineEmits(["deletePost", "deleteComment"]);
const store = useStore();

const showComment = ref(false);
const showPostDelete = ref(false);
const showLikedBy = ref(false);
const activeGroup = ref("");
const studentInfo = store.state.student.studentInfo;
const commentDeleteStatus = ref({});

const { t } = useI18n();

watch(() => store.state.student.studentInfo, (newValue) => {
  studentInfo.value = newValue;
});

activeGroup.value = props.student?.groups?.find((group) => group.status === 5);

const handleCommentAdded = async (postId) => {
  await props.refreshSinglePost(postId);
  showComment.value = true;
};

const handleLiked = async (postId) => {
  await props.refreshSinglePost(postId);
  showLikedBy.value = true;
};

const formattedComments = computed(() => {
  return props.comments.map((comment) => {
    const createdAt = DateTime.fromISO(comment.created_at);
    const now = DateTime.now();
    const isToday = createdAt.hasSame(now, "day");

    return {
      ...comment,
      formattedCreatedAt: isToday
        ? `${t("blog.comments.today")} ${createdAt.toFormat("HH:mm")}`
        : createdAt.toFormat("dd.MM.yyyy"),
    };
  });
});

const postCreatedAt = computed(() => {
  const createdAt = DateTime.fromISO(props.created_at);
  const now = DateTime.now();

  const isToday = createdAt.hasSame(now, "day");

  return isToday
    ? `${t("blog.comments.today")} ${createdAt.toFormat("HH:mm")}`
    : createdAt.toFormat("dd.MM.yyyy");
});

const selectedImage = ref(null);

const showImagePreview = (imageUrl) => {
  selectedImage.value = imageUrl;
};

const deletePost = () => {
  emits("deletePost", props.id);
  showPostDelete.value = false;
};

const deleteComment = (id) => {
  emits("deleteComment", id, props.id);
};

const toggleComments = () => {
  showLikedBy.value = false
  showComment.value = !showComment.value;
  if (showComment.value) {
    showLikedBy.value = false;
  }
};

const toggleLikedBy = () => {
  showComment.value = false
  if (props.likes.length > 0) {
    showLikedBy.value = !showLikedBy.value;
    if (showLikedBy.value) {
      showComment.value = false;
    }
  }
};

const commentImages = computed(() => {
  return props.comments.slice(0, 3).map((comment) => {
    return comment.avatar
      ? mediaLink + comment.avatar
      : require("@/assets/blog-avatar.svg");
  });
});

const toggleCommentDelete = (id) => {
  commentDeleteStatus.value = {
    ...commentDeleteStatus.value,
    [id]: !commentDeleteStatus.value[id],
  };
};
</script>

<style scoped>
.post-comments-left-title{
  text-decoration: none !important;
  color: #0e0d5d !important;
}

.blog-post .likedBy {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #8c8c8c;
  font-size: 14px;
}

.blog-post .liked_wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #8c8c8c;
  font-size: 14px;
  padding: 0;
}

.blog-post .liked_wrapper.active-liked-wrapper {
  color: #0e0d5d;
}

.blog-post .heart-icon {
  color: red;
  margin-right: 5px;
  font-size: 16px;
}

.blog-post .likes-number {
  color: #8c8c8c;
  font-size: 14px;
}

.post-likes-wrapper {
 
  display: flex;
  flex-direction: column;
}

.like_Wapper {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
}

.comment-number-icons {
  position: relative;
}

.comment-number-icons img {
  background: #f5f5f5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.comment-number-icons img:nth-child(1) {
  position: absolute;
  left: -60px;
  top: 60%;
  transform: translateY(-60%);
}

.comment-number-icons img:nth-child(2) {
  position: absolute;
  left: -45px;
  top: 60%;
  transform: translateY(-60%);
}

.comment-number-icons img:nth-child(3) {
  position: absolute;
  left: -30px;
  top: 60%;
  transform: translateY(-60%);
}

.post-comments-left img,
.like_Wapper img {
  width: 34px;
  height: 34px;
  object-fit: contain;
  border-radius: 50%;
}

.like_img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: contain;
}

.blog-post .liked_wrapper {
  display: flex !important;
  align-items: center !important;
  cursor: pointer !important;
  color: #8c8c8c !important;
  font-size: 16px !important;
  padding-left: 3px;
  padding-top: 3px;
}

.blog-post .liked_wrapper.active-liked-wrapper {
  color: #0e0d5d !important;
}

.like_Wapper .likes-number {
  margin-left: 5px !important;
}
.comment-number-icons.few-comments img:nth-child(1) {
  left: -45px;
}

.comment-number-icons.few-comments img:nth-child(2) {
  left: -30px;
}

.comment-number-icons.few-comments img:nth-child(3) {
  left: -15px;
}

/* Styles for one comment */
.comment-number-icons.one-comment img:nth-child(1) {
  left: -30px;
}
</style>
