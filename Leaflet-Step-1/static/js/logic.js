// USGS url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// JSON request
d3.json(url, function(data) {
  createMap(data.features);
});

function createMap(earthquakeData) {
  EarthquakeMarkers = earthquakeData.map((feature) =>
    L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
        radius: magCheck(feature.properties.mag),
        stroke: false,
        color: 'black',
        opacity: 1,
        weight: 0.5,
        fill: true,
        fillColor: magColor(feature.properties.mag),
        fillOpacity: 0.9   
      })
      .bindPopup("<h1> Magnitude : " + feature.properties.mag +
      "</h1><hr><h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
    )

// Add the earthquakes layer to a marker cluster group.
var earthquakes = L.layerGroup(EarthquakeMarkers)

var mags = earthquakeData.map((d) => magCheck(+d.properties.mag));

   
// Adding tile layer to the map
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  // tileSize: 512,
  maxZoom: 18,
  // zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [37.09, -95.71],
  layers: [streetmap, earthquakes],
  zoom: 5
});

var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var div = L.DomUtil.create("div", "info legend");
  var grades = [0, 1, 2, 3, 4, 5];
  var colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
  var labels = [];

// Add min & max
  var legendInfo = "<h1>Earthquake Magnitude</h1>" +
    "<div class=\"labels\">" + "</div>";

  div.innerHTML = legendInfo;

  grades.forEach(function(grades, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\">" + "Magnitude" + [index]+ 
    "&ndash;" + [index+1] + "</li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
  };

legend.addTo(myMap);

     function magColor(mag) {
      var color = "";
      if (mag > 5) { color = "#ea2c2c"; }
      else if (mag > 4) {color = "#ea822c"; }
      else if (mag > 3) { color = "#ee9c00"; }
      else if (mag > 2) {color = "#eecc00"; }
      else if (mag > 1) {color = "#d4ee00"; }
      else { color = "#98ee00"; }
    
    return color;
    
    };

  // set radiuss from magnitude
  function magCheck(mag) {
    if (mag <= 1) {
      return 1;
    }
    return mag * 4;
  }}