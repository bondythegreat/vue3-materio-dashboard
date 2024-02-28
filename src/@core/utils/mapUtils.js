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
