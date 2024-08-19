<template>
  <router-link :to="`/student-profile/${id}`"
    :class="[
      'student-info',
      {
        'student-info--me': isMe,
      },
      {'pointer': showProfile},
    ]"
  >
    <p class="student-info__order" v-if="order">{{ order }}</p>
    <ProfileImage
      :imageUrl="avatarLink"
      :borderImgUrl="borderImgLink"
      :className="'student-info__avatar-wrapper'"
      :modmeId="modmeId"
      :is_open_dialog="false"
      :showProfile="showProfile"
    />
    <div class="student-info__text-wrapper">
      <p class="student-info__name">
        {{ studentName }}
        <span class="student-info__cup" v-if="position">
          {{ position === 1 ? "🥇" : position === 2 ? "🥈" : "🥉" }}
        </span>
      </p>
      <p class="student-info__group">
        {{ studentActiveGroup?.name }} | {{ studentActiveGroup?.teacher }}
      </p>
    </div>
    <div class="student-info__coins">
      <p class="coin">{{ studentCoins }}</p>
      <img src="@/assets/Coin.svg" alt="" width="20" />
    </div>
  </router-link>
  <el-dialog v-model="profile" class="profile-dialog">
      <friends-space :id="id" @close="profile = !profile"/>
    </el-dialog>
</template>

<script>
import { computed, ref } from "vue";
import "./style/student-card.css";
import { ProfileImage } from "..";
import FriendsSpace from "@/pages/FriendsSpace/FriendsSpace.vue";

export default {
  props: {
    order: {
      type: Number,
      required: false,
    },
    position: {
      type: Number,
      required: false,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentGroup: {
      type: Array,
      required: true,
    },
    studentCoins: {
      type: Number,
      required: true,
    },
    modmeId: {
      type: Number,
      required: true,
    },
    studentLevel: {
      type: Array,
      required: false,
    },
    avatarLink: {
      type: String,
      required: true,
    },
    borderImgLink: {
      type: String,
      required: true,
    },
    isMe: {
      type: Boolean,
      required: false,
      default: false,
    },
    showProfile: {
      type: Boolean,
      required: true,
      default: false
    },
    id: {
      type: Number
    }
  },
  components: {
    ProfileImage,
    FriendsSpace,
  },
  setup(props) {
    const studentActiveGroup = computed(() => {
      return props.studentGroup.find((group) => group?.status === 5);
    });

    const profile = ref(false);

    const showProfileModal = () => {
      if(props.showProfile) {
        profile.value = !profile.value
      }
    }
    

    return {
      studentActiveGroup,
      profile,
      showProfileModal
    };
  },
};
</script>

<style></style>
