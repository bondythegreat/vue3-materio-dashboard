<script setup>
import { pusher } from '@/plugins//pusher';
import { useEarningsStore } from '@/stores/earnings';
import { hexToRgb } from '@layouts/utils';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const store = useEarningsStore()

const { totalEarnings, data } = storeToRefs(store)
const { updateEarning } = store;

const series = [{
  data: data.value
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  
  return {
    chart: {
      toolbar: { show: false },
    },
    tooltip: { enabled: false },
    grid: {
      borderColor: `rgba(${ hexToRgb(String(variableTheme['border-color'])) },${ variableTheme['border-opacity'] })`,
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: {
        top: -10,
        left: -7,
        right: 5,
        bottom: 5,
      },
    },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    stroke: {
      width: 2,
      lineCap: 'butt',
      curve: 'smooth',
    },
    colors: [currentTheme.primary],
    markers: {
      size: 6,
      offsetY: 4,
      offsetX: -2,
      strokeWidth: 1,
      colors: ['transparent'],
      strokeColors: 'transparent',
      hover: { size: 7 },
    },
    xaxis: {
      type: "datetime",
      labels: { 
        show: true 
      },
      axisTicks: { show: true },
      axisBorder: { show: false },
    },
    yaxis: { 
      labels: { 
        show: true,
        formatter: function (value) {
          return `$ ${value}`;
        }
      },
    },
  }
})

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  // update data in pinia
  updateEarning(data)
});


</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Earnings</VCardTitle>
      <small>Earnings</small>
      <VRow>
        <VCol cols="12" sm="9">
          <VueApexCharts
            type="area"
            :options="chartOptions"
            :series="series"
            :height="230"
            class="my-1"
          />
        </VCol>
        <VCol  cols="12" sm="3">
          <div class="text-h3 text-right">${{totalEarnings}}</div>
          <div class="text-small text-right my-3"><span class="text-success">+42%</span> since last week</div>

          <div class="d-flex align-end gap-3 flex-column">
            <div class="text-center price-item">11800 ETH</div>
            <div class="text-center price-item">16800 SNT</div>
          </div>
        </VCol>
      </VRow>
      
  </VCardItem>
  </VCard>
</template>

<style lang="scss" scoped>
.text-small {
  font-size: 0.9em;
}
.price-item {
  background-color: rgba(255,255,255,0.05);
  padding: 14px 10px;
  width:130px;
  font-weight: 500;
}
</style>
