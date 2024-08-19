<template>
  <main class="iframe-main">
    <iframe
      v-show="!loading"
      ref="iframeBlock"
      src="https://games.marsit.uz"
      width="100%"
      height="100%"
    ></iframe>
  </main>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { getMyInfo } from "./api/get-student-info.api";

export default {
  setup() {
    const iframeBlock = ref();



    const loading = ref(false);

    onBeforeMount(async () => {
      const userToken = localStorage.getItem("access_token");
      loading.value = true;
      await getMyInfo()
        .then((res) => {
          iframeBlock.value.contentWindow.postMessage(
            {
              student_modme_id: res.data.external_id,
              student_id: res.data.id,
              student_name: res.data.first_name,
              student_surname: res.data.last_name,
              token: userToken,
              devStatus: process.env.NODE_ENV,
            },
            "*"
          );
        })
        .finally(() => {
          loading.value = false;
        });
    });
    return {
      iframeBlock,
      loading,
    };
  },
};
</script>

<style scoped>
.iframe-main {
  margin-top: 45px !important;
}
</style>
