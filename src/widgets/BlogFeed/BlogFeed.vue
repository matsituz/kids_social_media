<template>
  <section class="blog-feed">
    <div class="blog-feed__header" v-if="!noHeader">
      <img src="@/assets/saturn-icon.png" alt="" />
      <h1>{{ useId ? $t("main.posts") : $t("main.feed") }}</h1>
    </div>
    <div class="blog-feed__body" ref="blogFeed" @scroll="handleScroll" v-if="posts && posts?.length">
      <blog-post v-for="post in posts" :key="post?.id" :id="post?.id" :student="post?.student"
        :description="post?.description" :images="post?.items" :comments="post.comments" :liked="post.is_liked"
        :likes="post.likes" :created_at="post.created_at" :refreshSinglePost="refreshSinglePost" @deletePost="deletePost"
        @deleteComment="deleteComment" :mySpace="useMyPosts" />
    </div>
    <div class="blog-feed__body" v-else>
      <div class="blog-post">
        <p class="no-post">{{ $t("main.no_posts") }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import "./style/style.css";
import { getPosts } from "./api/get-posts";
import { getPost } from "./api/get-post";
import BlogPost from "@/entities/BlogPost/BlogPost.vue";
import { onBeforeMount, ref, onMounted, onBeforeUnmount, watch } from "vue";
import { deletePostById } from "./api/delete-post";
import { deleteCommentById } from "./api/delete-comment";
import { useStore } from "vuex";

export default {
  components: {
    BlogPost,
  },
  props: ["noHeader", "useMyPosts", "useId", "isCreated", "newCreated", "id"],
  setup(props) {
    const store = useStore();
    const studentInfo = store.state.student.studentInfo;
    const posts = ref([]);
    const activePage = ref(1);
    const totalPages = ref(1);
    const loading = ref(false);
    const isFetching = ref(false);
    const limit = 10;
    const blogFeed = ref(null);

    watch(() => store.state.student.studentInfo, (newValue) => {
      studentInfo.value = newValue;
    });

    const getAllPosts = async (page = 1) => {
      if (loading.value || page > totalPages.value || isFetching.value) return;
      isFetching.value = true;
      loading.value = true;
      try {
        const response = await getPosts(
          props.useMyPosts
            ? studentInfo.id
            : props.useId
              ? props.id
              : undefined,
          page,
          limit
        );
        if (response.data && Array.isArray(response.data.data)) {
          posts.value =
            page === 1
              ? response.data.data
              : [...posts.value, ...response.data.data];
          totalPages.value = response.data.page_count;
        } else {
          console.error("Unexpected API response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        loading.value = false;
        isFetching.value = false;
      }
    };

    const refreshSinglePost = async (postId) => {
      try {
        const response = await getPost(postId);
        if (response.status === 200) {
          let updatedPost = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          const index = posts.value.findIndex((post) => post.id === postId);
          if (index !== -1) {
            posts.value[index] = updatedPost;
          }
        }
      } catch (error) {
        console.error("Error in refreshSinglePost:", error);
      }
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = blogFeed.value;
      const thresholdPercentage = 0.9;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      if (distanceFromBottom <= scrollHeight * (1 - thresholdPercentage)) {
        if (activePage.value < totalPages.value && !isFetching.value) {
          activePage.value++;
          getAllPosts(activePage.value);
        }
      }
    };

    onMounted(() => {
      blogFeed.value = document.querySelector(".blog-feed");
      blogFeed.value?.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      if (blogFeed.value) {
        blogFeed.value.removeEventListener("scroll", handleScroll);
      }
    });

    onBeforeMount(async () => {
      await getAllPosts();
    });

    const deletePost = async (post_id) => {
      try {
        await deletePostById(post_id);
        activePage.value = 1;
        await getAllPosts(activePage.value);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    const deleteComment = async (comment_id, post_id) => {
      await deleteCommentById(comment_id);
      await refreshSinglePost(post_id);
    };

    return {
      posts,
      activePage,
      totalPages,
      loading,
      handleScroll,
      refreshSinglePost,
      blogFeed,
      deletePost,
      deleteComment
    };
  },
};
</script>
