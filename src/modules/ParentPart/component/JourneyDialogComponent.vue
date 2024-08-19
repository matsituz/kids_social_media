<template>
  <div
    class="journey-modal-wrapper"
    ref="modalWrapper"
    @click="handleWrapperClick($event)"
  >
    <div class="journey-modal-body" ref="modalBody" v-dragscroll>
      <div class="times-btn-div">
        <button class="times-btn" @click="closeModal()"></button>
      </div>
      <div class="month-circle-wrapper">
        <div
          class="month-circle-modal"
          v-for="monthIndex in 21"
          :key="monthIndex"
          :class="getConditionalClass(monthIndex)"
          v-dragscroll.y
        >
          <span>{{ monthIndex }}</span>
          <span class="month-circle-module">{{ $t("main.module") }}</span>
          <div
            v-if="getConditionalClass(monthIndex - 2) == 'continue-bg-img'"
            id="active"
          ></div>
          <img
            :src="require('@/assets/journey-modal/' + getImgSrc(monthIndex))"
            alt=""
          />
        </div>
        <div class="pencil"></div>
        <div class="rocket"></div>
        <div class="mars"></div>
        <div class="earth"></div>
        <div class="keyboard"></div>
        <div class="pencil-top"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { dragscroll } from "vue-dragscroll";
export default {
  name: "Journey-modal",
  emits: ["close"],
  props: ["courseType", "active_month",'isOpenModal'],
  directives: {
    dragscroll: dragscroll,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit("close");
    };
    const modalWrapper = ref(null);
    const modalBody = ref(null);

    function handleWrapperClick(event) {
      const isClickedInsideBody = modalBody?.value?.contains(event.target);

      if (!isClickedInsideBody) {
        closeModal();
      }
    }
    const getConditionalClass = (monthIndex) => {
      if (props.courseType != "starter") {
        if (monthIndex < props.active_month + 3) return "done-bg-img";
        else if (monthIndex === props.active_month + 3)
          return "continue-bg-img";
        else if (monthIndex > props.active_month + 3) return "soon-bg-img";
      } else if (props.courseType === "starter") {
        if (monthIndex < props.active_month) return "done-bg-img";
        else if (monthIndex === props.active_month) return "continue-bg-img";
        else if (monthIndex > props.active_month) return "soon-bg-img";
      }
    };

    /* ---------------------------- get arrow images ---------------------------- */

    const getImgSrc = (monthIndex) => {
      let t = monthIndex % 4;
      const classCircle = getConditionalClass(monthIndex);
      let k = "";
      if (classCircle == "done-bg-img") {
        k = "-done";
      } else if (classCircle == "continue-bg-img") {
        k = "-continue";
      }

      if (t == 1) {
        return "top-left" + k + ".png";
      } else if (t == 2) {
        return "bottom-right" + k + ".png";
      } else if (t == 3) {
        return "top-right" + k + ".png";
      } else if (t == 0) {
        return "bottom-left" + k + ".png";
      }
    };

    onMounted(() => {
     if(props.isOpenModal){
       const link = document.createElement("a");
      link.setAttribute("href", "#active");
      link.click();
      link.remove();
     }
      modalWrapper.value.addEventListener("click", handleWrapperClick);
    });

    return {
      closeModal,
      getConditionalClass,
      getImgSrc,
      modalWrapper,
      modalBody,
      handleWrapperClick
    };
  },
};
</script>

<style lang="scss">
.journey-modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 111111111111111;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  overflow: hidden;

  .journey-modal-body {
    width: 800px;
    height: 500px;
    background-image: url(../../../assets/journey-bg.png);
    background-repeat: no-repeat;
    background-position: bottom left;
    background-size: cover;
    border-radius: 30px;
    padding: 20px;
    overflow: hidden;
    position: relative;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: -o-grab;
    cursor: grab;
    &:active {
      cursor: -webkit-grabbing;
      cursor: -moz-grabbing;
      cursor: -o-grabbing;
      cursor: grabbing;
    }
    .times-btn-div {
      .times-btn {
        position: fixed;
        top: 40px;
        right: 40px;
        width: 25px;
        height: 25px;
        background-image: url(../../../assets/times-white.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        cursor: pointer;
        background-color: transparent;
        cursor: pointer;
        border: none;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .month-circle-wrapper {
      display: flex;
      width: 790px;
      flex-direction: column-reverse;
      padding: 0 152px;
      position: relative;
      .month-circle-modal {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        margin-bottom: 56px;
        z-index: 1111111;
        position: relative;
        span {
          font-weight: 700;
          font-size: 28px;
          color: #ffffff;
          margin: 0;
          padding: 0;
          line-height: 20px;
          &:nth-child(2) {
            font-size: 12px;
          }
        }

        &:nth-child(even) {
          align-self: center;
        }
        &:nth-child(3),
        &:nth-child(7),
        &:nth-child(11),
        &:nth-child(15),
        &:nth-child(19) {
          align-self: flex-end;
        }
        &:nth-child(4n + 1) {
          img {
            position: absolute;
            width: 200px;
            height: 100px;
            top: -97.5px;
            right: -158px;
            z-index: 9;
          }
        }
        &:nth-child(4n + 2) {
          img {
            position: absolute;
            width: 200px;
            height: 100px;
            top: -60px;
            right: -197px;
            z-index: 9;
          }
        }
        &:nth-child(4n + 3) {
          img {
            position: absolute;
            width: 200px;
            height: 100px;
            top: -97.5px;
            left: -158px;
            z-index: 9;
          }
        }
        &:nth-child(4n) {
          img {
            position: absolute;
            width: 200px;
            height: 100px;
            top: -60px;
            left: -195.5px;
            z-index: 9;
          }
        }
        &.done-bg-img {
          background-image: url(../../../assets/circle-bg-done.png);
        }
        &.continue-bg-img {
          background-image: url(../../../assets/circle-bg-continue.png);
        }
        &.soon-bg-img {
          background-image: url(../../../assets/circle-bg-soon.png);
        }
      }
    }

    .pencil {
      width: 50px;
      height: 250px;
      background-image: url(../../../assets/journey-modal/pencil.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      bottom: 20px;
      right: -20px;
      transform: rotate(-25deg);
    }
    .earth {
      width: 200px;
      height: 200px;
      background-image: url(../../../assets/journey-modal/earth.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      left: -20px;
      bottom: 100px;
      transform: rotate(20deg);
    }
    .rocket {
      width: 200px;
      height: 200px;
      background-image: url(../../../assets/journey-modal/rocket.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      right: -100px;
      bottom: 600px;
    }
    .mars {
      width: 200px;
      height: 200px;
      background-image: url(../../../assets/journey-modal/mars.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 50px;
      left: -60px;
      transform: rotate(30deg);
    }
    .keyboard {
      width: 300px;
      height: 250px;
      background-image: url(../../../assets/journey-modal/keyboard.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 250px;
      right: -100px;
    }
    .pencil-top {
      width: 50px;
      height: 250px;
      background-image: url(../../../assets/journey-modal/pencil.png);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: -150px;
      right: 200px;
      transform: rotate(-25deg);
      background-position: bottom;
    }
  }
}
</style>
