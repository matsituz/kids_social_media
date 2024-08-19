<template>
  <li class="coins-body__list-item">
    <p class="coins-body__list-item__count">{{ order }}</p>
    <p class="coins-body__list-item__title">
      {{ title }}
    </p>
    <p class="coins-body__list-item__date">{{ date }}</p>
    <div class="coins-body__list-item__coin-wrapper">
      <p
        :class="[
          'coins-body__list-item__coin',
          { 'coins-body__list-item__coin--plus': coinType(coins_value) },
          { 'coins-body__list-item__coin--minus': !coinType(coins_value) },
        ]"
      >
        {{ coins_value }}
      </p>
      <img src="@/assets/coin-icon.png" alt="coin" />
      <div
        :class="[
          'coins-body__list-item__line',
          { 'coins-body__list-item__line--plus': coinType(coins_value) },
          { 'coins-body__list-item__line--minus': !coinType(coins_value) },
        ]"
      ></div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["order", "title", "date", "coins_value"],
  methods: {
    coinType(val) {
      return val[0] === "+";
    },
  },
};
</script>

<style lang="scss" scoped>
.coins-body__list-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 24px;
  background: #ffffff;
  box-shadow: 0px 20px 100px rgba(15, 6, 4, 0.08);
  border-radius: 18px;
  align-items: center;

  &__count {
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    display: flex;
    align-items: center;
    color: #0e0d5d;
    min-width: 25px;
  }
  &__title {
    max-width: 350px;
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    color: #0e0d5d;
  }
  &__date {
    font-weight: 500;
    font-size: 14px;
    color: #616161;
  }
  &__coin-wrapper {
    display: flex;
    align-items: center;
    column-gap: 20px;
    img {
      width: 38px;
      height: 38px;
    }
  }
  &__coin {
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    letter-spacing: 0.2px;
    min-width: 31px;
    &--plus {
      color: #8bc255;
    }
    &--minus {
      color: #f54336;
    }
  }
  &__line {
    height: 40px;
    width: 3px;
    border-radius: 1.5px;
    &--plus {
      background: #8bc255;
    }
    &--minus {
      background: #f54336;
    }
  }
}
</style>
