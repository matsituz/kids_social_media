<template>
  <main>
    <div class="coins view-container">
      <div class="coins-header">
        <h1 class="coins-heading">История Coins</h1>
        <el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in coinsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="coins-body">
        <ul class="coins-body__list">
          <list-component
            v-for="(item, i) in fakeData"
            :key="item"
            :order="i + 1"
            :title="item.title"
            :date="item.date"
            :coins_value="item.coins_value"
          />
        </ul>
      </div>
      <div class="coins-pagination">
        <pagination-component
          :current="currentPage"
          :total="totalPages"
          @paginationClick="paginationClick"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ListComponent from "./components/ListComponent.vue";
import PaginationComponent from "./components/PaginationComponent.vue";

export default {
  components: {
    ListComponent,
    PaginationComponent,
  },
  beforeMount() {
    // console.log(this.fakeData.splice(0,7));
  },
  data() {
    return {
      coinsOptions: [
        { value: "week", label: "7 дней" },
        { value: "half-month", label: "15 дней" },
        { value: "month", label: "30 дней" },
      ],
      value: "week",
      fakeData: [
        {
          id: 1,
          title: "some title",
          date: "23.03.2023",
          coins_value: "+15",
        },
        {
          id: 2,
          title: "some title",
          date: "23.03.2023",
          coins_value: "+10",
        },
        {
          id: 3,
          title: "some title",
          date: "23.03.2023",
          coins_value: "-15",
        },
        {
          id: 4,
          title: "some title",
          date: "23.03.2023",
          coins_value: "+15",
        },
        {
          id: 5,
          title: "some title",
          date: "23.03.2023",
          coins_value: "-8",
        },
        {
          id: 6,
          title: "some title",
          date: "23.03.2023",
          coins_value: "+5",
        },
        {
          id: 7,
          title: "some title",
          date: "23.03.2023",
          coins_value: "-5",
        },
        {
          id: 8,
          title: "some title",
          date: "23.03.2023",
          coins_value: "-20",
        },
        {
          id: 9,
          title: "some title",
          date: "23.03.2023",
          coins_value: "+1",
        },
        {
          id: 10,
          title: "some title",
          date: "23.03.2023",
          coins_value: "+3",
        },
      ],
      showItem: 7,
      currentPage: 1,
    };
  },
  methods: {
    // handlePagination() {
    //   let start = 0;
    //   let end = this.showItem;
    //   this.fakeData.splice(start, end);
    // },
    paginationClick(val) {
      console.log(val);
      // let start = 7;
      // let end = 7;
      // val === "next" ? (end += 7) : (end -= 7);
      this.fakeData.splice(7, 14);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.fakeData.length / this.showItem);
    },
  },
};
</script>

<style lang="scss">
.coins {
  margin-top: 24px;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-select {
      &:hover {
        border: none;
        box-shadow: none;
      }
      .el-input {
        background: #f5f5f5;
        &__wrapper {
          position: relative;
          border: none;
          box-shadow: none;
          width: 175px;
          height: 24px;
          padding: 16px 20px;
          border-radius: 12px;
          &.is-focus {
            box-shadow: none !important;
          }
          &::before {
            position: absolute;
            content: "";
            width: 20px;
            height: 20px;
            background-image: url("@/assets/day-select-icon.svg");
            left: 20px;
            background-repeat: no-repeat;
          }
        }
        &__inner {
          padding-left: 32px;
        }
        &.is-focus .el-input__wrapper {
          box-shadow: none !important;
        }
      }
    }
    .el-select .el-input .el-select__caret {
      position: relative;
      &::after {
        content: "";
        background-image: url("@/assets/select-arrow.svg");
        background-repeat: no-repeat;
        position: absolute;
        width: 20px;
        height: 20px;
      }
      svg {
        display: none;
      }
    }
  }
  &-heading {
    font-weight: 700;
    font-size: 32px;
    color: #0e0d5d;
  }
  &-body {
    margin-top: 24px;
    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 14px;
    }
  }
}
</style>
