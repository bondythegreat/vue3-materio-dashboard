
<script setup>
import { useAttackMapStore } from '@/stores/attacksMap';
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import { drawArc } from '@/@core/utils/mapUtils';
import { markRaw, onMounted, onUnmounted, shallowRef } from 'vue';

const store = useAttackMapStore()

const { locations } = storeToRefs(store)
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
  
  // animate line function
  var speedFactor = 15; // number of frames per longitude degree
  var animation; // to store and cancel the animation
  var startTime = 0;
  var progress = 0; // progress = timestamp - startTime
  var resetTime = false; // indicator of whether time reset is needed for the animation

  function animateLine(timestamp) {
    // restart if it finishes a loop
    if (progress > speedFactor * 360) {
      startTime = timestamp;

      // routes[0].features[0].geometry.coordinates = origins[0];
    } else {
      // append new coordinates to the lineString
      geojson.features[0].geometry.coordinates.push([x, y]);

      // then update the map
      state.map?.getSource('line').setData(routes[0]);
    }

    // Request the next frame of the animation.
    animation = requestAnimationFrame(animateLine);
  }
  
  state.map.on('load', function () {
    // get all the attackList from getAttackList() and map to drawArc
    attackList.value.map((attackItem, idx) => {
      drawArc(`arc${idx}`, attackItem.from.lngLat, attackItem.to.lngLat, state.map);
    })
    


    /*
    state.map.addSource('line', {
      'type': 'geojson',
      'data': routes[0],
    });

    // add the line which will be modified in the animation
    state.map?.addLayer({
      'id': 'line-animation',
      'type': 'line',
      'source': 'line',
      'layout': {
        'line-cap': 'round',
        'line-join': 'round',
      },
      'paint': {
        'line-color': '#8c57ff',
        'line-width': 2,
        'line-opacity': 0.8,
      },
    });
    */
  
    
    startTime = performance.now();

    // animateLine();

    document.addEventListener('visibilitychange', function () {
      resetTime = true;
    });
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
