import * as turf from '@turf/turf';

// draw arc function
export const drawArc = (id, origin, destination, mapObj) => {
  let route = {
    type: 'LineString',
    coordinates: [
      origin,
      destination,
    ],
  };
  const lineD = turf.lineDistance(route, { units: 'kilometers' });

  const mp = turf.midpoint(destination, origin);

  const center = turf.destination(
    mp,
    lineD,
    turf.bearing(destination, origin) - 90,
  );

  const lA = turf.lineArc(
    center,
    turf.distance(center, destination),
    turf.bearing(center, origin),
    turf.bearing(center, destination),
  );

  var newRouteData = {
    'type': 'FeatureCollection',
    'features': [],
  };
  newRouteData.features.push(lA);

  mapObj?.addLayer(
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

let then = performance.now();

export const animateLine = (id, origin, destination, mapObj) => {
  console.log(id)

  // calculate and create the coordinates array
  let route = {
    type: 'LineString',
    coordinates: [
      origin,
      destination,
    ],
  };
  const lineD = turf.lineDistance(route, { units: 'kilometers' });

  const mp = turf.midpoint(destination, origin);

  const center = turf.destination(
    mp,
    lineD,
    turf.bearing(destination, origin) - 90,
  );

  const lA = turf.lineArc(
    center,
    turf.distance(center, destination),
    turf.bearing(center, origin),
    turf.bearing(center, destination),
  );
  
  const coordinates = lA.geometry.coordinates;
  
  const masterRouteData = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [origin], // starting point
        },
      },
    ],
  };

  let newRouteData = { ...masterRouteData };

  // prepare the default source and layer
  mapObj.addSource(id, {
    'type': 'geojson',
    'data': newRouteData,
  });
  console.log(mapObj)
  mapObj.addLayer({
    'id': `line-animation-${id}`,
    'type': 'line',
    'source': id,
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


  // PREPARE ANIMATION
  const fps = 10;
  const fpsInterval = 1000 / fps;

  const steps = coordinates.length;
  let i = 0;
  let now;
  let then = performance.now();
  let elapsed;

  const doAnimate = timestamp => {
    // control fps
    now = performance.now();
    
    elapsed = now - then;
    
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      // codes
      if (i >= steps) {
        //reset..empty the map routeData coordinate
        i = 0;
        newRouteData.features[0].geometry.coordinates.length = 0;
      }

      newRouteData.features[0].geometry.coordinates.push(coordinates[i]);
      mapObj.getSource(id).setData(newRouteData);
      
      i++;
    }
    requestAnimationFrame(doAnimate);
  }

  requestAnimationFrame(doAnimate);
}
