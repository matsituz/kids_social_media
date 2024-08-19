<template>
  <div class="attendance-wrapper">
    <div class="attendance">
      <div class="attendance__calendar">
        <div class="attendance__calendar-main">
          <p class="attendance__title-heading">
            {{ $t("attendance.heading") }}
          </p>
          <FullCalendar
            ref="calendar"
            v-if="showCalendar"
            :options="calendarOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStudentAttendance } from "@/service/get-student-attendance";
import { DateTime } from "luxon";
import { onBeforeMount, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useI18n } from "vue-i18n";

export default {
  components: {
    FullCalendar,
  },
  setup() {
    const date = DateTime;
    const attendanceDays = ref(null);
    const showCalendar = ref(false);
    const calendar = ref(null);
    const attributes = ref([]);

    const { t } = useI18n();

    const from = ref(date.now().startOf("month").toFormat("yyyy-MM-dd"));
    const till = ref(date.now().endOf("month").toFormat("yyyy-MM-dd"));

    const getDate = async () => {
      attendanceDays.value = await getStudentAttendance(from.value, till.value);
    };

    onBeforeMount(async () => {
      await getDate().finally(() => {
        setAttributes();
      });

      setTimeout(() => {
        showCalendar.value = true;
      }, 50);
    });

    const setAttributes = () => {
      attendanceDays?.value?.map((day) => {
        if (day.attendance_type === 1) {
          attributes.value.push({
            title: t("attendance.attended"),
            date: day.attend_date,
            color: "#00bcd414",
            textColor: "#00bcd3",
            className: "attended-event",
          });
        } else if (day.attendance_type === 0) {
          attributes.value.push({
            title: t("attendance.absent"),
            date: day.attend_date,
            color: "#f7555514",
            textColor: "#ea1e61",
            className: "absent-event",
          });
        }
      });
    };

    const monthChange = async (info) => {
      attributes.value = [];
      from.value = date.fromISO(info.startStr).toFormat("yyyy-MM-dd");
      till.value = date.fromISO(info.endStr).toFormat("yyyy-MM-dd");
      await getDate().then(() => {
        setAttributes();
      });
    };

    const calendarOptions = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev",
        center: "title",
        right: "next",
      },
      contentHeight: "450px",
      titleFormat: { month: "long" },
      firstDay: 1,
      events: async (info, successCallback) => {
        await monthChange(info);
        successCallback(attributes.value);
      },
      datesSet: monthChange,
      dayCellDidMount: (arg) => {
        if (arg.date.getDay() === 0) {
          // 0 is Sunday
          arg.el.style.background =
            "linear-gradient(90deg, white 60%, #F7555514 40%)";
          const dayNumberEl = arg.el.querySelector(".fc-daygrid-day-number");
          if (dayNumberEl) {
            dayNumberEl.style.color = "#EA1E61";
          }
        }
      },
    });

    return {
      attributes,
      setAttributes,
      monthChange,
      calendar,
      calendarOptions,
      showCalendar,
    };
  },
};
</script>

<style lang="scss">
$dark-blue: #0e0d5d;
$red: #f54336;
$green: #4aaf57;
$black: #181a20;
@import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap");
* {
  box-sizing: border-box;
}
.header-right__popover {
  .el-dialog {
    background-color: transparent;
    box-shadow: none;
  }
}
.attendance {
  overflow: hidden !important;
  background-color: #fff;
  margin: 0 auto;
  &__title {
    &-heading {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 120%;
      color: $dark-blue;
      position: absolute;
      bottom: 340px;
    }
  }
  &__calendar-main {
    padding: 20px;
    .fc .fc-toolbar {
      justify-content: end;
      gap: 8px;
    }
    .fc .fc-button,
    .fc-toolbar-title {
      background: #fafafa;
      color: #424242;
      border: 0;
      border-radius: 8px;
      .fc-icon {
        font-size: 1.5em;
      }
    }
    .fc-toolbar-title {
      padding: 7px 16px;
    }
    .fc .fc-toolbar-title {
      font-size: 1.25em;
    }
    .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
      min-height: 0;
    }
    .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
      position: absolute !important;
      bottom: 0;
      width: 100%;
    }
    .fc-theme-standard .fc-scrollgrid {
      border: 0;
    }
    .fc-theme-standard th {
      border: 0;
      padding: 12px 0;
      font-size: 18px;
      font-weight: 400;
      line-height: 25.2px;
      letter-spacing: 0.20000000298023224px;
      color: #0e0d5d;
    }
    .fc-theme-standard td {
      border: 0.6px solid #eeeeee;
    }
    .fc-daygrid-event {
      font-size: 0.5em;
    }
    .fc .fc-daygrid-day.fc-day-today {
      background: transparent;
    }
    .fc-daygrid-body tr:last-child {
      display: none;
    }
    .fc .fc-daygrid-day-top {
      padding: 5px 12px;
      font-size: 16px;
      font-weight: 500;
      line-height: 25.2px;
      letter-spacing: 0.20000000298023224px;
      color: #0e0d5d;
    }
    .fc-h-event.attended-event .fc-event-main::before,
    .fc-h-event.absent-event .fc-event-main::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 7px;
      transform: translateY(-50%);
    }
    .fc-h-event.attended-event .fc-event-main::before {
      background-color: #00bcd3;
    }
    .fc-h-event.absent-event .fc-event-main::before {
      background-color: #ea1e61;
    }
    .fc-h-event .fc-event-main {
      color: inherit;
    }
    .fc-h-event {
      border: 0;
    }
    .fc-direction-ltr .fc-daygrid-event.fc-event-end,
    .fc-direction-ltr .fc-daygrid-event.fc-event-start {
      margin-right: 0;
      margin-left: 0;
    }
    .fc-daygrid-block-event .fc-event-title {
      padding: 0px 16px;
    }
  }
}
.el-overlay {
  background: rgba(29, 26, 47, 0.5);
  //   display: block;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2000;
  font-family: "Urbanist", sans-serif;

  .attendance {
    position: absolute;
    width: 948px;
    left: 50%;
    top: 50%;
    overflow: hidden !important;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 16px;
    &__title {
      &-heading {
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 120%;
        color: $dark-blue;
        position: absolute;
        bottom: initial;
      }
    }
    &__calendar-main {
      width: 100%;
      .fc-icon {
        font-size: 2.5em !important;
      }
      .fc .fc-toolbar-title {
        font-size: 1.75em !important;
      }
      .fc-daygrid-event {
        font-size: 0.85em !important;
      }
      .fc-h-event.attended-event .fc-event-main::before,
      .fc-h-event.absent-event .fc-event-main::before {
        width: 6px !important;
        height: 6px !important;
      }
      .fc .fc-daygrid-day-top {
        font-size: 18px !important;
      }
      .fc-daygrid-block-event .fc-event-title {
        padding: 5px 16px !important;
      }
    }
  }
}
@media (max-width: 1110px) and (min-width: 700px) {
  .attendance {
    width: 700px !important;
  }
}

@media (max-width: 700px) {
  .attendance {
    width: 100% !important;
    &__title-heading {
      font-size: 24px;
    }
    .fc .fc-button .fc-icon {
      font-size: 1em;
    }
    .fc .fc-toolbar-title {
      font-size: 0.75em;
    }
    .fc .fc-daygrid-day-top {
      font-size: 14px;
      padding: 0;
    }
    .fc-daygrid-event {
      font-size: 0.4em;
    }
    .attendance__calendar-main .fc-daygrid-block-event .fc-event-title {
      padding: 2px 12px;
    }
    .fc-h-event.attended-event .fc-event-main::before,
    .fc-h-event.absent-event .fc-event-main::before {
      width: 3px;
      height: 3px;
    }
    .fc-theme-standard th {
      font-size: 14px;
      padding: 7px;
    }
    .attendance__title-heading {
      font-size: 24px;
      bottom: 500px;
    }
  }
}
</style>
