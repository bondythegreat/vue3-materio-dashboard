<script setup>
import BalanceCard from '@/views/dashboard/BalanceCard.vue';
import EarningsChart from '@/views/dashboard/EarningsChart.vue';
import MapCard from '@/views/dashboard/MapCard.vue';
import WeatherCard from '@/views/dashboard/WeatherCard.vue';
import WithdrawCard from '@/views/dashboard/WithdrawCard.vue';
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="4"
    >
      <WeatherCard />
    </VCol>
    <VCol
      cols="12"
      md="8"
    >
      <VRow class="match-height">
        <VCol cols="12">
          <EarningsChart />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <BalanceCard />
        </VCol>
        <VCol
          cols="12"
          md="6"
        >
          <WithdrawCard />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
  <VRow class="match-height">
    <VCol cols="12">
      <MapCard />
    </VCol>
  </VRow>
</template>
