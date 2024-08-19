<template>
  <div class="coins-history">
    <div class="coins-history__header">
      <h1>{{ $t("coins-history.heading") }}</h1>
      <button>
        <img src="@/assets/times-icon.png" alt="close" @click="close" />
      </button>
    </div>
    <div class="coins-history__body">
      <div class="coins-history__body-top">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
        <div class="coins-history__body-total">
          <p class="coin">{{ studentInfo.coins }}</p>
          <img src="@/assets/Coin.svg" alt="coin" />
        </div>
      </div>
      <table class="coins-history__body-list">
        <tbody v-if="coinsHistory && !allDataEmpty">
          <coin-history
            v-for="coin in coinsHistory"
            :key="coin?.id"
            :for_date="coin?.for_date"
            :data="coin.data"
          />
        </tbody>
        <tbody v-else>
         <tr>
          <td class="no-coin">{{ $t("coins-history.no-coin") }}</td>
         </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import CoinHistory from "@/entities/CoinHistory/CoinHistory.vue";
import { defineComponent, onBeforeMount, ref, computed, watch, defineEmits } from "vue";
import "./style/coins-history.css";
import { getCoinsHistory } from "./api/get-coins-history";
import { DateTime } from "luxon";
import { useStore } from "vuex";

defineComponent(["CoinHistory"]);
const emit = defineEmits(["close"])
const store = useStore();

const coinsHistory = ref(null);
const today = DateTime.now();
const tenDaysAgo = today.minus({ days: 10 });
const date = ref([tenDaysAgo.toJSDate(), today.toJSDate()]);
const studentInfo = store.state.student.studentInfo;

watch(() => store.state.student.studentInfo, (newValue) => {
      studentInfo.value = newValue;
    });

const getCoinHistory = async () => {
  coinsHistory.value = await getCoinsHistory(dateFormatted.value[0], dateFormatted.value[1]).then((res) => res.data);
};

watch(date, () => {
  getCoinHistory();
})

onBeforeMount(() => {
  getCoinHistory();
});

const dateFormatted = computed(() => {
  if (!date.value) return [];
  return date.value.map(d => DateTime.fromJSDate(d).toFormat('yyyy-MM-dd'));
});

const allDataEmpty = computed(() => {
  if (!coinsHistory.value) return true;
  return coinsHistory.value.every(coin => !coin.data || coin.data.length === 0);
});

const close = () => {
  emit('close')
}
</script>