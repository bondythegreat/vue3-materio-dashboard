<script setup>
import AnalyticsAward from '@/views/dashboard/AnalyticsAward.vue';
import BalanceCard from '@/views/dashboard/BalanceCard.vue';
import EarningsChart from '@/views/dashboard/EarningsChart.vue';
import WeatherCard from '@/views/dashboard/WeatherCard.vue';
import WithdrawCard from '@/views/dashboard/WithdrawCard.vue';

const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'ri-pie-chart-2-line',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project',
}

const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'ri-file-word-2-line',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project',
}
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
        <VCol
          cols="12"
        >
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
    <VCol
      cols="12"
    >
      <AnalyticsAward />
    </VCol>
  </VRow>
</template>
