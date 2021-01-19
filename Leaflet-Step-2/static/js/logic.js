// USGS url
var usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Plates url
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// JSON request
d3.json(usgsUrl, function(data) {
  var earthquakeData = data.features
  d3.json(platesUrl, function(data){
    var platesData = data.features

    createMap(earthquakeData,platesData)
  })
});


function createMap(earthquakeData, platesData) {
  var EarthquakeMarkers = earthquakeData.map((feature) =>
    L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
        radius: magCheck(feature.properties.mag),
        stroke: true,
        color: 'black',
        opacity: 1,
        weight: 0.5,
        fill: true,
        fillColor: magColor(feature.properties.mag),
        fillOpacity: magOpacity(feature.geometry.coordinates[2])   
      })
      .bindPopup("<center><h1> Magnitude : " + feature.properties.mag +
      "</h1><h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + 
      "</p><p> Depth : " + feature.geometry.coordinates[2] + "</center></p>")
    )

  // Add the earthquakes layer to a marker cluster group.
  var earthquakes = L.layerGroup(EarthquakeMarkers);

  function makePolyline(feature, layer){
    L.polyline(feature.geometry.coordinates);
  }

  var plates = L.geoJSON(platesData, {
    onEachFeature: makePolyline,
      style: {
        color: "red",
        opacity: 0.9
      }
})

// Adding tile layer to the map (streetlayer)
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Darkmap 
var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});

// Satellite
var Satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});

//Outdoors
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

//Define basemap
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap,
  "Satellite": Satellite,
  "Outdoor Maps": outdoors
};

//create overlay
var overlayMaps = {
  Earthquakes: earthquakes,
  Plates : plates
};

// Create Map
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3,
  layers: [streetmap, earthquakes]
});

//Legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var div = L.DomUtil.create("div", "info legend");
  var grades = [0, 1, 2, 3, 4, 5];
  var colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
  var labels = [];

// Add min & max
  var legendInfo = "<h3><center>  Magnitude Level</center></h3>" +
    "<div class=\"labels\">" + "</div>";

  div.innerHTML = legendInfo;

  grades.forEach(function(grades, index) {
    if (index === 0){
      labels.push("<li style=\"background-color: " + colors[index] + "\">" + "  Less than " + [index +1 ]+ 
      "  </li>");
    }
    else if (index === 5){
      labels.push("<li style=\"background-color: " + colors[index] + "\">" + "  " + [index]+ 
      " and Greater" + "  </li>");
    }
    else{
      labels.push("<li style=\"background-color: " + colors[index] + "\">" + "  " + [index]+ 
      "&ndash;" + [index+1] + "  </li>");
    }

  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
  };

legend.addTo(myMap);

//baselayer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

//Magnitude Color
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

//Magnitude Depth
    function magOpacity(data) {
      var opacity = data / 5;

    return opacity;

};

// Radius
  function magCheck(mag) {
    if (mag <= 1) {
      return 6;
    }
    return mag * 4;
  }
