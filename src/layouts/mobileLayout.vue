<template>
  <the-header />
  <router-view />
  <footer-desc />
</template>

<script>
// import TheHeader from "@/components/TheHeader.vue";
import FooterDesc from "@/components/FooterDesk.vue";
import { TheHeader } from "@/widgets";

export default {
  components: {
    TheHeader,
    FooterDesc,
  },
};
</script>

<style></style>
