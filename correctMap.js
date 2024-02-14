routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '44.75721,19.69456', // Zorka, Sabac 
      destination: '45.33021,19.43484', // Nova Gajdobra
      via: '45.26200105216257,19.860023178174792', //  Novi Sad
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
let routes2 = new H.map.Group();

// set up containers for the map  + panel
var mapContainer2 = document.getElementById('map2');

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform2 = new H.service.Platform({
  apikey: "jjqSV5FGqOyLjCFD83NzybduQCqDl4jtoEc9BQRjXUU"
});

let defaultLayers2 = platform2.createDefaultLayers();


// Step 2: initialize a map - this map is centered over Berlin
var map2 = new H.Map(mapContainer2,
  // Set truck restriction layer as a base map
  defaultLayers2.vector.normal.truck,{
  center: {lat: 45.23280952713936, lng: 19.401741596600672}, 
  zoom: 9,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map2.getViewPort().resize());

// Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
new H.mapevents.Behavior(new H.mapevents.MapEvents(map2));
// create default UI with layers provided by the platform
let ui2 = H.ui.UI.createDefault(map2, defaultLayers2);
map2.addObject(routes2);

// Now use the map as required...
calculateRoutes (platform2,map2,routeRequestParams,routes2);
  
addInfoBubble(map2,ui2, {lat: 44.75721, lng: 19.69456},'<div style="width:150px"><a href="#">Šabac</a></div>');

addInfoBubble(map2,ui2, {lat: 45.26200105216257, lng: 19.860023178174792},
  '<div style="width:150px"><a href="#">Žeželjev Most</a></div>' +
  '<div style="width:150px">Najkraći mogući prelaz preko Dunava za teretni transport<br>' +
  'The shortest legal crossing via the Danube river for freight transport</div>');
    
addInfoBubble(map2,ui2, {lat: 45.33021, lng: 19.43484},'<div style="width:150px"><a href="#">Nova Gajdobra</a></div>');

