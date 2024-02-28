<script setup>
import moment from 'moment';
import WeatherItemCard from './WeatherItemCard.vue';

const today = moment().format('ddd DD.MM.YYYY')

const weather = ref('29')
const degreesProgres = [17, 23, 27, 32, 36]
const barValue = (weather.value - degreesProgres[0]) / (degreesProgres[degreesProgres.length - 1] - degreesProgres[0]) * 100; // percentage to show the 27

const weatherItems = [
  { icon: 'ri-contrast-drop-line', label: 'HUMIDITY', value: '15%' },
  { icon: 'ri-windy-line', label: 'WIND', value: '5 KM/H' },
  { icon: 'ri-temp-hot-line', label: 'FEELS LIKE', value: '23&deg; C' },
  { icon: 'ri-haze-fill', label: 'VISIBILITY', value: 'N/A' },
  { icon: 'ri-router-fill', label: 'PRESSURE', value: '24.25 ln' },
  { icon: 'ri-record-circle-line', label: 'DREW POINT', value: '11&deg;' },
]
</script>

<template>
  <VCard class="weather-card">
    <VCardItem>
      <VCardTitle>Weather</VCardTitle>
      <small class="text-uppercase">{{ today }}</small>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-end mb-7">
        <div class="d-flex gap-3 align-end pb-1">
          <VIcon icon="ri-shining-fill"
size="14" />
          <VIcon icon="ri-sun-line"
size="14" />
          <VIcon icon="ri-cloud-line"
size="14" />
          <VIcon icon="ri-moon-fill"
size="14" />
        </div>
        <div class="flex-fill text-right align-end">
          <h4 class="text-h3 hotness">
{{ weather }} <span class="text-h6">&deg;C</span>
</h4>
        </div>
      </div>
      <div class="mb-8">
        <div class="d-flex justify-space-between my-3 degrees">
          <div v-for="degree in degreesProgres">
{{ degree }}&deg;C
</div>
        </div>
        <VProgressLinear
          v-model="barValue"
          height="4"
        ></VProgressLinear>
      </div>

      <small class="d-block mb-3">DETAILS</small>
      <VRow class="match-height">
        <VCol cols="12"
sm="4" xs="6" v-for="item in weatherItems" class="pa-1">
          <WeatherItemCard :item="item" />
        </VCol>
      </VRow>
</VCardText>
  </VCard>
</template>

<style lang="scss">
.hotness {
  line-height: 0.9em;
  span {
    position: relative;
    bottom: 5px;
  }
}
.weather-card .v-progress-linear {
  background: white;
  border-radius: 2px;
}
.degrees {
  font-size: 0.8em;
}
</style>
