<template>
  <main class="main main-page">
    <section class="main__blog-section container">
      <div class="main__blog-section-left">
        <h2 class="main__heading profile-info__heading">
          {{ $t("main.profile") }}
        </h2>
        <profile-component />
        <mars-games />
      </div>
      <div class="main__blog-section-right-blog">
        <!-- <leads-advertisement /> -->
        <div class="main__blog-section-right-blog-wrapper">
          <div class="main__blog-section-right__systems">
          <blog-feed :isCreated="isCreated" />
        </div>
        <div class="main__blog-section-right__systems">
          <friends-list />
        </div>
        </div>
      </div>
    </section>
  </main>
</template>
  
  <script>
import { ProfileComponent, MarsGames, FriendsList, } from "@/widgets";
import BlogFeed from "@/widgets/BlogFeed/BlogFeed.vue";
import "./style/main-page.css";
// import RatingComponent from "@/components/RatingComponent.vue";

export default {
  components: {
    ProfileComponent,
    MarsGames,
    BlogFeed,
    FriendsList,
    
  },
  props: ["isCreated"],
};
</script>
  