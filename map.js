const localmap = new ol.Map({
  layers: [
      new ol.layer.Tile({
          source: new ol.source.OSM()
      })
  ],
  source: vectorSource,
  target: 'map',
  view: new ol.View({
      center: [-658587.715260747, 7283495.399471995],
      zoom: 9
  })
});


var vectorSource = new ol.source.Vector({
});
var vectorLayer = new ol.layer.Vector({
source: vectorSource
});
localmap.addLayer(vectorLayer);

localmap.on('singleclick', function (evt) {
console.log(evt.coordinate);

// convert coordinate to EPSG-4326
var coOrdinatesClicked = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
var longitude = coOrdinatesClicked[0]
var latitude = coOrdinatesClicked[1]
// console.log(coOrdinatesClicked[0]);

console.log('longitude: ', longitude);
console.log('latitude: ', latitude);

fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=ebdc14c87675ea153841603a14fe75e3&units=metric')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
    populateData(myJson)
  });

});


