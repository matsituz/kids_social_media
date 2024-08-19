<template>
  <div class="not-found">
    <p class="not-found__title">404 page</p>
    <router-link class="not-found__btn" to="/">Go back</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 40px;
  &__title {
    font-size: 40px;
    font-weight: 600;
  }
  &__btn {
    background: rgba(51, 94, 247, 0.08);
    width: 220px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    font-size: 28px;
    color: #0e0e0e;
    font-weight: 600;
  }
}
</style>
