<template>
    <button @click="sendLike" :class="{ liked: liked }" style="padding: 0!important;">
        <img v-if="!liked" src="@/assets/heart.svg" alt="" />
        <img v-else src="@/assets/heart-red.svg" alt="" />
        {{ likes ? likes : "" }}
    </button>
</template>
<script>
import { postLike } from "./api/post-like"
export default {
    props: ["id", "liked", "likes"],
    setup(props, { emit }) {
        const sendLike = async () => {
            const data = {
                post_id: props.id
            }
            const response = await postLike(data)
            if (response.status === 200) {
                emit("liked", props.id)
            }
        }

        return {
            sendLike
        }
    },
}
</script>