<template>
  <JourneyDialogComponent
    v-if="isOpenModal"
    @close="closeModal"
    :courseType="courseType"
    :active_month="active_month"
    :isOpenModal="isOpenModal"
  />

  <div class="learning-journey">
    <div class="learning-journey-header">
      <h1 class="learning-journey-title">
        {{ $t("parent-part.learning-journey.title") }}
      </h1>
      <!-- <button
        class="student-report-btn"
        @click="isOpenReport = !isOpenReport"
        v-if="roleInSpace === 'parent'"
      >
       {{ $t('parent-part.learning-journey.report-btn-text') }}
      </button> -->
      <StudentReportComponent v-if="roleInSpace === 'parent'" />
    </div>

    <div class="learning-journey-body">
      <button class="open-modal-btn" @click="isOpenModal = true"></button>
      <div
        class="learning-journey-course-wrapper"
        v-dragscroll.x
        ref="scrollContainer"
      >
        <div
          class="course-element"
          v-for="courseIndex in 21"
          :key="courseIndex"
        >
          <div
            class="month-circle"
            :class="getConditionalClass(courseIndex, 'img')"
          >
            <span> {{ courseIndex }}</span>
            <span class="month-circle-module">{{ $t("main.module") }}</span>
            <div
              v-if="
                getConditionalClass(courseIndex - 1, 'img') == 'continue-bg-img'
              "
              id="active-course"
            ></div>
            <div
              class="student-name-and-img"
              v-if="
                getConditionalClass(courseIndex, 'img') === 'continue-bg-img'
              "
            >
              <div class="student-name">
                <p>{{ studentInfo.first_name }}</p>
                <p>{{ studentInfo.last_name }}</p>
              </div>

              <img
                class="astronaunt-img"
                src="@/assets/astronaunt_for_journey.png"
                alt=""
              />
            </div>
          </div>
          <div
            class="course-line"
            :class="getConditionalClass(courseIndex, 'color')"
          >
            <div class="logo-box">
              <div
                class="logo-col"
                v-for="(logosIndex, i) in logos[courseIndex]"
                :key="logosIndex"
                :class="getConditionalClass(courseIndex, 'color')"
              >
                <img
                  :src="require('@/assets/logos/' + getImgSrc(courseIndex, i))"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import { ref, onBeforeMount, onMounted, toRefs } from "vue";
import { dragscroll } from "vue-dragscroll";

import JourneyDialogComponent from "./JourneyDialogComponent.vue";
import StudentReportComponent from "./StudentReportComponent.vue";

export default {
  components: {
    JourneyDialogComponent,
    StudentReportComponent,
  },
  directives: {
    dragscroll: dragscroll,
  },
  props: ["studentInfo"],

  setup(props) {
    const isTest = process.env.VUE_APP_MODAL_LOGIN || false;
    const isOpenModal = ref(false);
    const courseType = ref("");
    const groupNamesString = ref("");
    const active_month = ref(null);
    const isOpenReport = ref(false);
    const { studentInfo } = toRefs(props);
    const logos = {
      1: [
        {
          title: "Planner 5d",
          img: "planner_5d.png",
        },
        {
          title: "Google docs",
          img: "google-docs.png",
        },
        {
          title: "Google sheets",
          img: "google-sheets.png",
        },
        {
          title: "Google slides",
          img: "google-slides.png",
        },
        {
          title: "Google forms",
          img: "google-forms.png",
        },
      ],
      2: [
        {
          title: "Canva",
          img: "canva.png",
        },
        {
          title: "Tilda",
          img: "tilda.png",
        },
        {
          title: "Vectary",
          img: "vectary.png",
        },
        {
          title: "Animaker",
          img: "animaker.png",
        },
      ],
      3: [
        {
          title: "Scratch",
          img: "scratch.png",
        },
      ],
    };
    const programmingLogos = {
      4: [
        {
          title: "HTML",
          img: "html.png",
        },
        {
          title: "CSS",
          img: "css.png",
        },
      ],
      5: [
        {
          title: "Bootstrap",
          img: "bootstrap.png",
        },
      ],
      6: [
        {
          title: "Javascript",
          img: "javascript.png",
        },
      ],
      7: [
        {
          title: "Javascript",
          img: "javascript.png",
        },
      ],
      8: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      9: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      10: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      11: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      12: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      13: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      14: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      15: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      16: [
        {
          title: "Python",
          img: "python.png",
        },
      ],
      17: [
        {
          title: "Flutter",
          img: "flutter.jpg",
        },
      ],
      18: [
        {
          title: "Flutter",
          img: "flutter.jpg",
        },
      ],
      19: [
        {
          title: "Flutter",
          img: "flutter.jpg",
        },
      ],
      20: [
        {
          title: "Flutter",
          img: "flutter.jpg",
        },
      ],
      21: [
        {
          title: "Flutter",
          img: "flutter.jpg",
        },
      ],
    };
    const designLogos = {
      4: [
        {
          title: "Adobe illustrator",
          img: "adobe-illustrator.png",
        },
      ],
      5: [
        {
          title: "Adobe illustrator",
          img: "adobe-illustrator.png",
        },
      ],
      6: [
        {
          title: "Photoshop",
          img: "photoshop.png",
        },
      ],
      7: [
        {
          title: "Photoshop",
          img: "photoshop.png",
        },
      ],
      8: [
        {
          title: "Indesign",
          img: "indesign.png",
        },
      ],
      9: [
        {
          title: "Indesign",
          img: "indesign.png",
        },
      ],
      10: [
        {
          title: "Autocad",
          img: "autocad.png",
        },
      ],
      11: [
        {
          title: "Autocad",
          img: "autocad.png",
        },
        {
          title: "3dMax",
          img: "3dmax.png",
        },
      ],
      12: [
        {
          title: "3dMax",
          img: "3dmax.png",
        },
      ],
      13: [
        {
          title: "3dMax",
          img: "3dmax.png",
        },
        {
          title: "Corona render",
          img: "corona-render.png",
        },
      ],
      14: [
        {
          title: "3dMax",
          img: "3dmax.png",
        },
        {
          title: "Corona render",
          img: "corona-render.png",
        },
        {
          title: "Photoshop",
          img: "photoshop.png",
        },
      ],
      15: [
        {
          title: "3dMax",
          img: "3dmax.png",
        },
        {
          title: "Corona render",
          img: "corona-render.png",
        },
        {
          title: "Photoshop",
          img: "photoshop.png",
        },
      ],
      16: [{ title: "Unity", img: "unity.png" }],
      17: [{ title: "Unity", img: "unity.png" }],
      18: [{ title: "Unity", img: "unity.png" }],
      19: [{ title: "Unity", img: "unity.png" }],
      20: [{ title: "Unity", img: "unity.png" }],
      21: [{ title: "Unity", img: "unity.png" }],
    };

    const roleInSpace = localStorage.getItem("roleInSpace");

    onMounted(() => {
      const link = document.createElement("a");
      link.setAttribute("href", "#active-course");
      link.click();
      link.remove();
    });

    onBeforeMount(() => {
      studentInfo.value?.groups?.forEach((g) => {
        groupNamesString.value += g.name;
      });
      checkCourseType(groupNamesString.value.toLowerCase());
      checkActiveMonth();
    });

    const closeModal = () => {
      isOpenModal.value = false;
    };

    /* ------------------------ check course type method ------------------------ */

    const checkCourseType = (group_name) => {
      if (
        group_name.includes("back") ||
        group_name.includes("front") ||
        group_name.includes("mobile") ||
        group_name.includes("inpr")
      ) {
        courseType.value = "programming";
        Object.assign(logos, programmingLogos);
      } else if (
        group_name.includes("ds") ||
        group_name.includes("3d") ||
        group_name.includes("unity")
      ) {
        courseType.value = "design";
        Object.assign(logos, designLogos);
      } else {
        courseType.value = "starter";
      }
    };

    /* --------------------------- check active month method --------------------------- */

    const checkActiveMonth = () => {
      const studentGroup = studentInfo.value?.groups.find((g) => g.status == 5);
      const group_started = studentGroup?.date_started;
      active_month.value = Math.ceil(
        (DateTime.now() - DateTime.fromISO(group_started.slice(0, 10))) /
          (24 * 3600 * 1000) /
          30
      );
    };

    /* ---------------------- get class for circle,line,col --------------------- */

    const getConditionalClass = (monthIndex, type) => {
      if (courseType.value != "starter") {
        if (type === "img") {
          if (monthIndex < active_month.value + 3) return "done-bg-img";
          else if (monthIndex === active_month.value + 3)
            return "continue-bg-img";
          else if (monthIndex > active_month.value + 3) return "soon-bg-img";
        } else if (type === "color") {
          if (monthIndex < active_month.value + 3) return "done-bg-color";
          else if (monthIndex === active_month.value + 3)
            return "continue-bg-color";
          else if (monthIndex > active_month.value + 3) return "soon-bg-color";
        }
      } else if (courseType.value === "starter") {
        if (type === "img") {
          if (monthIndex < active_month.value) return "done-bg-img";
          else if (monthIndex === active_month.value) return "continue-bg-img";
          else if (monthIndex > active_month.value) return "soon-bg-img";
        } else if (type === "color") {
          if (monthIndex < active_month.value) return "done-bg-color";
          else if (monthIndex === active_month.value)
            return "continue-bg-color";
          else if (monthIndex > active_month.value) return "soon-bg-color";
        }
      }
    };

    /* ------------------------- get image source method ------------------------ */

    const getImgSrc = (indexInLogos, indexInLogosElement) => {
      return logos[indexInLogos][indexInLogosElement]?.img || logos[1][0].img;
    };

    return {
      isOpenModal,
      closeModal,
      logos,
      courseType,
      active_month,
      getConditionalClass,
      getImgSrc,
      isOpenReport,
      roleInSpace,
      isTest,
    };
  },
};
</script>
<style lang="scss" scoped>
.learning-journey {
  * {
    box-sizing: border-box;
  }
  .done-bg-color {
    background-color: #4ade80;
  }
  .continue-bg-color {
    background-color: #ef400f;
  }
  .soon-bg-color {
    background-color: #e0e0e0;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-title {
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    color: #0e0d5d;
    position: relative;
    padding-left: 50px;
    font-size: 32px;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0;
      width: 40px;
      height: 40px;
      background-image: url(@/assets/saturn-icon.png);
      background-size: contain;
    }
  }
  &-body {
    width: 100%;
    height: 250px;
    background: url(@/assets/journey-bg.png);
    background-size: cover;
    box-shadow: 0px 20px 100px rgba(15, 6, 4, 0.08);
    border-radius: 25px;
    background-repeat: no-repeat;
    margin: 20px 0;
    background-position: bottom left;
    position: relative;
    .open-modal-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 25px;
      height: 25px;
      background-image: url(@/assets/full-screen-icon.png);
      background-repeat: no-repeat;
      background-size: cover;
      border: none;
      outline: none;
      cursor: pointer;
      background-color: transparent;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .learning-journey-course-wrapper {
      width: 100%;
      height: 250px;
      overflow: hidden;
      display: flex;
      padding: 80px 60px 0px;
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
      .course-element {
        display: flex;
        align-items: center;
        .month-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          margin-right: -10px;
          span {
            font-weight: 700;
            font-size: 31px;
            color: #ffffff;
            margin: 0;
            padding: 0;
            line-height: 20px;
            &:nth-child(2) {
              font-size: 14px;
            }
          }

          z-index: 10;
          position: relative;
          &.done-bg-img {
            background-image: url(@/assets/circle-bg-done.png);
          }
          &.continue-bg-img {
            background-image: url(@/assets/circle-bg-continue.png);
          }
          &.soon-bg-img {
            background-image: url(@/assets/circle-bg-soon.png);
          }
          .student-name-and-img {
            position: absolute;
            top: -110px;
            margin-left: 5px;
            .astronaunt-img {
              width: 55px;
              height: 80px;
              object-fit: cover;
            }
            .student-name {
              background-color: #fff;
              text-align: center;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              min-width: 160px;
              padding: 5px;
              gap: 5px;
              margin-bottom: 5px;
              p {
                font-weight: 700;
                font-size: 15px;
                color: #212121;
              }
            }
          }
        }
        .course-line {
          width: 250px;
          height: 6px;
          margin-right: -5px;
          .logo-box {
            display: flex;
            justify-content: space-around;
            margin-top: -10px;
            .logo-col {
              width: 5px;
              height: 10px;
              position: relative;
              img {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                object-fit: cover;
                position: absolute;
                top: -30px;
                left: -11px;
                border: 2px solid #fff;
                background-color: #212121;
              }
            }
          }
        }
      }
    }
  }
}
</style>
