<template>
  <input
    :class="{ 'comment-input': comment }"
    class="comment-input"
    type="text"
    :placeholder="$t('blog.send-comment')"
    v-model="comment"
  />
  <img
    v-if="comment"
    src="@/assets/close-circle.svg"
    alt=""
    @click="comment = ''"
  />
  <button
    @click="sendComment"
    :class="{ 'comment-btn': comment }"
    :disabled="!comment || isSending"
  >
    Send
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { postComment } from "./api/postComment";

const props = defineProps(["id"]);
const emit = defineEmits(["commentAdded"]);
const comment = ref("");
const isSending = ref(false);

const sendComment = async () => {
  if (isSending.value) return;
  isSending.value = true;

  const data = {
    post_id: props.id,
    text: comment.value,
  };

  try {
    const response = await postComment(data);
    if (response.status === 200) {
      comment.value = "";
      emit("commentAdded", props.id);
    }
  } finally {
    isSending.value = false;
  }
};
</script>
