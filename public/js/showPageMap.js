  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: campground.geometry.coordinates,
  zoom: 10,
  maxZoom: 20,
  minZoom: 0.4
  });
  
map.addControl(new mapboxgl.NavigationControl())

  new mapboxgl.Marker()
   .setLngLat(campground.geometry.coordinates)
   .setPopup(
       new mapboxgl.Popup({offset: 25})
       .setHTML(
           `<h5>${campground.title}</h5><p>${campground.location}</p>`
       )
   )
   .addTo(map)