<template>
  <component :is="layout + '-layout'" v-if="layout" />
  <!-- <h1>{{layout}}</h1> -->
</template>

<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
// import {useI18n} from 'vue-i18n'
import desktopLayout from "./layouts/desktopLayout.vue";
import AuthLayout from "@/layouts/authLayout.vue";
import mobileLayout from "./layouts/mobileLayout.vue";
export default {
  components: {
    desktopLayout,
    mobileLayout,
    AuthLayout,
  },
  setup() {
    const route = useRoute(); // берем роут
    // const {t} = useI18n({useScope: 'global'})
    // const layout = computed(() => route.meta.layout);

    const layout = ref(null);


    watch(route, (val) => {
      layout.value = val.meta.layout;
    });

    return {
      layout,
    };
  },
};
</script>

<style lang="scss">
* {
  outline: none;
  font-family: "Gilroy";
}
body {
  background: #f5f5f5;
  height: 100vh;
}

#app {
  font-family: Urbanist, Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.el-dialog {
  position: initial !important;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
}
.view-container {
  width: 826px;
  margin: 0 auto;
}
main {
  flex: 1 1 auto;
  margin-top: 95px !important;
  padding-bottom: 10px;
}
li,
a,
ul {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.el-tabs {
  &__header {
    margin-bottom: 28px !important;
  }
  &__nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__item.is-top {
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: #9e9e9e;
    width: 50%;
    padding: 0;
    &.is-active {
      font-weight: 600;
      color: #ef400f;
    }
  }
  &__active-bar {
    height: 4px !important;
    background: #ef400f !important;
    border-radius: 100px;
  }
}
.el-tab {
  &-pane {
    display: flex;
    flex-wrap: wrap;
    max-height: 272px;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    flex-direction: column;
    row-gap: 18px;
    column-gap: 32px;
    .el-skeleton {
      width: 380px;
      &__item {
        width: 100%;
        height: 114px;
      }
    }
  }
}

@media (max-width: 1300px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

@media (max-width: 920px) {
  .container {
    max-width: 720px;
  }
}
@media (max-width: 500px) {
  main {
    margin-top: 70px;
    padding-bottom: 70px;
  }
  .container {
    max-width: 380px;
  }
}
</style>
