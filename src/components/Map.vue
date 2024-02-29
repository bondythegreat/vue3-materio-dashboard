
<script setup>
import { useAttackMapStore } from '@/stores/attacksMap';
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import { animateLine } from '@/@core/utils/mapUtils';
import { markRaw, onMounted, onUnmounted, shallowRef } from 'vue';

const store = useAttackMapStore()

const { getFinalAttackList } = store;

const attackList = ref(computed(()=>getFinalAttackList()))

const mapContainer = shallowRef(null)
const state = reactive({ map: null })

onMounted(() => {
  config.apiKey = import.meta.env.VITE_MAPTILES_KEY

  const initialState = { lng: 109.829034, lat: -1.367668, zoom: 4 }

  state.map = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS.DARK,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom,
  }))
  
  state.map.on('load', function () {
    // get all the attackList from getAttackList() and js.map to drawArc
    attackList.value.map((attackItem, idx) => {
      animateLine(`arc${idx}`, attackItem.from.lngLat, attackItem.to.lngLat, state.map);
    })
  })
})

onUnmounted(() => {
  state.map?.remove()
})
</script>

<template>
  <div class="map-wrap">
    <div
      ref="mapContainer"
      class="map"
    />
  </div>
</template>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 500px; /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
