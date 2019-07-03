mapboxgl.accessToken =
  "pk.eyJ1IjoibWMxMDBzIiwiYSI6ImNqb2E2ZTF3ODBxa3czd2xldHp1Z2FxbGYifQ.U4oatm5RsTXXHQLz5w66dQ";

let map = new mapboxgl.Map({
  container: "map", // inject the map in the div with the id "map"
  style: "mapbox://styles/mc100s/cjxndri3f0aye1cmsi5gtz11l",
  center: [4.83392, 45.75978],
  zoom: 11
});

axios
  .get(
    "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=31914cb97e2074dd91b0b77c5e6e62d8ea0587f9"
  )
  .then(response => {
    let stations = response.data;
    for (let i = 0; i < stations.length; i++) {
      let { lng, lat } = stations[i].position;
      let { available_bikes, available_bike_stands } = stations[i];
      let color = "blue";
      if (available_bikes <= 3) {
        color = "red";
      } else if (available_bike_stands <= 3) {
        color = "green";
      }

      new mapboxgl.Marker({ color: color }).setLngLat([lng, lat]).addTo(map);
    }
  });
