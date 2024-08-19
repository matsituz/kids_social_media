<template>
  <footer class="footer" ref="footer">
    <div class="container">
      <p class="footer__comp-name">MARS IT School 2022</p>
      <img
        src="../assets/mars-logo.png"
        alt="mars-logo"
        class="footer__comp-logo"
      />
      <a href="#" class="footer__conf">Политика конфидециальности</a>
    </div>
  </footer>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();

    const footer = ref();

    const checkRoute = (val) => {
      if (val.path.includes("games")) {
        footer.value.style.display = "none";
      }
    };

    watch(route, (val) => {
      checkRoute(val);
    });

    onMounted(() => {
      checkRoute(route);
    });

    return {
      checkRoute,
      footer,
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  // position: fixed;
  // bottom: 0;
  // width: 100%;
  // left: 0;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  padding: 10px 0;
  background: #ffffff;
  &__comp-name {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: #212121;
    width: 204px;
  }
  &__comp-logo {
    height: 24px;
    width: 94px;
    object-fit: contain;
  }
  &__conf {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    text-decoration-line: underline;
    color: #616161;
  }
}
</style>
