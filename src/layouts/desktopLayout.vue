<template>
  <!-- <the-header-vue></the-header-vue> -->
  <the-header @post-created="created"/>
  <router-view :isCreated="newCreated"/>
  <footer-desk />
</template>

<script>
// import TheHeaderVue from "@/components/TheHeader.vue";
import FooterDesk from "@/components/FooterDesk.vue";
import { TheHeader } from "@/widgets";
import { ref } from 'vue';

export default {
  components: { FooterDesk, TheHeader },
  setup() {
    const newCreated = ref(false)
    const created = () => {
      newCreated.value = !newCreated.value
    }

    return {
      created,
      newCreated
    }
  }
};
</script>

<style></style>
