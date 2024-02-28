
<script setup>
import { Map, MapStyle, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import * as turf from '@turf/turf';
import { markRaw, onMounted, onUnmounted, shallowRef } from 'vue';

const mapContainer = shallowRef(null)
const state = reactive({ map: null })

onMounted(() => {
  config.apiKey = import.meta.env.VITE_MAPTILES_KEY

  const initialState = { lng: 118.130873, lat: -3.144973, zoom: 4 }

  state.map = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS.DARK,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom,
  }))

  var origins = [
    [106.886684, -6.203189], //jkt
    [112.625297, -7.337780], //sby
    [100.455900, -0.888183], //pdg

  ]

  var destinations = [
    [110.371832, -7.777483], //jog
    [119.897568, -8.604954], //lbj
    [116.831393, -1.234536], //bpp
  ]

  // A simple line from origin to destination.
  var routes = [];

  // setup all datas
  for (var i =0; i<origins.length;i++) {
    routes[i] = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',

            // 'coordinates': [origins[0], destinations[0]],
            coordinates: 
            [
              origins[i], destinations[i],
            ],
          },
        },
  
      ],
    };
  }

  // Calculate the distance in kilometers between route start/end point.
  var lineDistance = turf.lineDistance(routes[0].features[0], 'kilometers');
  var arc = []; // array or arc point
  var steps = 200;

  // draw arc function
  function drawArc(id, route) {
    const lineD = turf.lineDistance(route.features[0], { units: 'kilometers' });

    const mp = turf.midpoint(route.features[0].geometry.coordinates[0], route.features[0].geometry.coordinates[1]);

    const center = turf.destination(
      mp,
      lineD,
      turf.bearing(route.features[0].geometry.coordinates[0], route.features[0].geometry.coordinates[1]) - 100,
    );

    const lA = turf.lineArc(
      center,
      turf.distance(center, route.features[0].geometry.coordinates[0]),
      turf.bearing(center, route.features[0].geometry.coordinates[1]),
      turf.bearing(center, route.features[0].geometry.coordinates[0]),
    );


    const newRouteData = route;

    newRouteData.features[0] = lA;

    state.map?.addLayer(
      {
        id,
        type: 'line',
        source: {
          type: 'geojson',
          data: newRouteData,
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#8c57ff',
          'line-width': 2,
          'line-opacity': 0.8,
        },
      },
    );
  }
  
  var speedFactor = 15; // number of frames per longitude degree
  var animation; // to store and cancel the animation
  var startTime = 0;
  var progress = 0; // progress = timestamp - startTime
  var resetTime = false; // indicator of whether time reset is needed for the animation
  // var pauseButton = document.getElementById('pause');

  state.map.on('load', function () {
    drawArc('arc0', routes[0]);
    drawArc('arc1', routes[1]);
    drawArc('arc2', routes[2]);

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
    
    var steps = arc.length;
    var counter = 0;
    function animateLine() {
      // then update the map
      routes[0].features[0].geometry.coordinates.push(arc[counter]);
      state.map?.getSource('line').setData(routes[0]);
      animation = requestAnimationFrame(animateLine);
      
      if (counter < steps) {
        requestAnimationFrame(animateLine);
      } else {
        // loop
        counter = 0;
      }
      counter++;
      
    }

    // animated in a circle as a sine wave along the state.map.
    /*
    function animateLine2(timestamp) {
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
    */
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
