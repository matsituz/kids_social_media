<template>
  <div class="mars-games">
    <router-link to="/mars-games-typing" class="mars-games__game-wrapper">
      <img src="../assets/mars-typing.png" alt="mars-typing" />
      <h3>Mars Typing</h3>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.mars-games {
  min-width: 900px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: start;
  &__game-wrapper {
    display: inline-block;
    width: 300px;
    height: 150px;
    text-align: center;
    img {
      width: 100%;
      height: 130px;
      object-fit: contain;
    }
  }
}
@media (max-width: 768px) {
  .mars-games {
    justify-content: center;
  }
}
</style>
