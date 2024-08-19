<template>
  <div class="profile-section__games">
    <img class="img-wrapper" src="@/assets/mars-games.png" alt="" />
    <div class="profile-section__games__right">
      <p>Learn by playing</p>
      <button>
        <router-link to="/mars-games-typing" class="mars-games__game-wrapper">Play</router-link>
      </button>
    </div>
    <el-dialog v-model="gamesModal">
      <router-link to="/mars-games-typing" class="mars-games__game-wrapper">
        <img src="@/assets/mars-typing.png" alt="mars-typing" />
        <h3>Mars Typing</h3>
      </router-link>
      <!-- <games-modal /> -->
    </el-dialog>
  </div>
</template>

<script>
import "./style/mars-games.css";
// import GamesModal from "@/components/GamesModal.vue";
import { ref } from "vue";

export default {
  components: {
    // GamesModal,
  },
  setup() {
    const gamesModal = ref(false);

    return {
      gamesModal,
    };
  },
};
</script>
