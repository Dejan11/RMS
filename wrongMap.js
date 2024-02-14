
routeRequestParams = {
  routingMode: 'fast',
  transportMode: 'truck',
  origin: '44.75721,19.69456', // Zorka, Sabac 
  destination: '45.33021,19.43484', // Nova Gajdobra
  return: 'polyline,travelSummary',
  units: 'imperial',
  spans: 'truckAttributes'
};
let routes1 = new H.map.Group();

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform1 = new H.service.Platform({
  apikey: "jjqSV5FGqOyLjCFD83NzybduQCqDl4jtoEc9BQRjXUU"
});

let defaultLayers1 = platform1.createDefaultLayers();


// set up containers for the map  + panel
var mapContainer1 = document.getElementById('map1');


// Step 2: initialize a map - this map is centered over Berlin
var map1 = new H.Map(mapContainer1,
// Set truck restriction layer as a base map
  defaultLayers1.vector.normal.truck,{
  center: {lat: 45.23280952713936, lng: 19.401741596600672}, 
  zoom: 10,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map1.getViewPort().resize());

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
new H.mapevents.Behavior(new H.mapevents.MapEvents(map1));
// create default UI with layers provided by the platform
let ui1 = H.ui.UI.createDefault(map1, defaultLayers1);
map1.addObject(routes1);

// Now use the map as required...
calculateRoutes (platform1,map1,routeRequestParams,routes1);
