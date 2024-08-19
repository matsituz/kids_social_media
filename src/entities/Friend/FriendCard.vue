<template>
    <router-link :to="`/student-profile/${id}`" class="friend">
        <div class="friend-left">
            <img :src="avatar ? mediaLink + avatar : require('@/assets/av-code.png')" alt="">
        </div>
        <div class="friend-right">
            <h1>{{ student_name }}</h1>
            <p>{{ group_name }}</p>
        </div>
    </router-link>
</template>
<script>
import "./style/friend-card.css"
import { mediaLink } from "@/apiConfig/mediaLink";
export default {
    props: ["group_name", "student_name", "id", "avatar"],
    setup() {
        return {
            mediaLink
        }
    },
}
</script>