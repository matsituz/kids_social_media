<template>
  <tr class="coin-history" v-for="coin in data" :key="coin.id">
    <td class="name">
      {{ coin.first_name && coin.last_name ? coin.first_name + " " + coin.last_name : null }}
      <p v-if="coin.is_fake" class="not-active">
        <span>*</span> {{ $t("coins-history.fake") }}
      </p>
    </td>
    <td>{{ coin.name ? coin.name : coin.task}}</td>
    <td>{{ for_date }}</td>
    <td :class="['minus', 'coin', { 'no-credit': !coin.total_credit }]">
      - {{ coin.total_credit ? coin.total_credit : null }}
    </td>
    <td :class="['coin', { 'is-fake': coin.is_fake }]">
      +{{ coin.total_debit }}
    </td>
  </tr>
</template>
<script setup>
import { defineProps } from "vue";
import "./style/coin-history.css";

defineProps(["for_date", "data"]);
</script>