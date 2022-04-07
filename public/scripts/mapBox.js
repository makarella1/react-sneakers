mapboxgl.accessToken = mapBoxToken;
campground = JSON.parse(campground);

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: campground.geometry.coordinates,
  zoom: 9,
});

const popup = new mapboxgl.Popup({ offset: 30 }).setHTML(
  `<h3>${campground.title}</h3>`
);

const marker1 = new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);
