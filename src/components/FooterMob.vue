<template>
  <footer class="footer">
    <div class="container footer-wrapper">
      <ul class="footer-list">
        <li class="footer-list__item">
          <router-link to="/main" class="footer-list__item__link">
            <img
              class="footer-list__item__logo"
              src="../assets/home-icon.png"
              alt=""
            />
            <p>{{ $t("footer.home") }}</p></router-link
          >
        </li>
        <li class="footer-list__item">
          <router-link to="/learning" class="footer-list__item__link"
            ><img
              class="footer-list__item__logo"
              src="../assets/study_logo.png"
              alt=""
            />
            <p>{{ $t("footer.study") }}</p></router-link
          >
        </li>
        <li class="footer-list__item">
          <router-link to="/my-space" class="footer-list__item__link"
            ><img
              class="footer-list__item__logo"
              src="../assets/profile_logo.png"
              alt=""
            />
            <p>{{ $t("footer.profile") }}</p></router-link
          >
        </li>
        <!-- <li class="footer-list__item">
          <router-link to="/rating" class="footer-list__item__link"
            ><img
              class="footer-list__item__logo"
              src="../assets/rating-icon.png"
              alt=""
            />
            <p>{{ $t("footer.rating") }}</p></router-link
          >
        </li> -->
        <li class="footer-list__item">
          <router-link to="/space-shop" class="footer-list__item__link">
            <img
              class="footer-list__item__logo"
              src="../assets/shopping-cart-icon.png"
              alt=""
            />
            <p>{{ $t("footer.shop") }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
// import Calendar from "./CalendarComponent.vue";
export default {
  data() {
    return {
      calendar: false,
    };
  },
  components: {
    // Calendar,
  },
  methods: {
    openCalendar() {
      this.calendar = !this.calendar;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #fff;
  padding: 12px 0;
  border-radius: 16px 16px 0px 0px;
  flex: 0 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  height: auto;
  width: 100%;
  z-index: 99;
  &-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__item {
      &__link {
        display: flex;
        align-items: center;
        flex-direction: column;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.3px;
        color: #9e9e9e;
        row-gap: 5px;
      }
      &__link.is-active {
        color: #ef400f;
        font-weight: 700;
      }
      &__logo {
        width: 24px;
        height: 24px;
      }
    }
  }
  .calendar-btn {
    background-color: transparent;
    border: none;
  }
}
// @media screen and (max-width: $xs) {
//   .footer-list {
//     &__item {
//       &__logo {
//         width: 20px;
//         height: 20px;
//       }
//     }
//   }
// }
// @media screen and (max-width: 370px) {
//   .footer-list__item:last-child {
//     display: none;
//   }
// }
</style>
