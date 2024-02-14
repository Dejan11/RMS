/**
 * A full list of available request parameters can be found in the Routing API documentation.
 * see:  http://developer.here.com/rest-apis/documentation/routing/topics/resource-calculate-route.html
 */
var routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '40.7249546323,-74.0110042', // Manhattan
      destination: '40.7324386599,-74.0341396', // Newport
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };

function calculateRoutes(platform, map,routeRequestParams,routes) {
  var router = platform.getRoutingService(null, 8);

  // The blue route showing a simple truck route
  calculateRoute(router, routeRequestParams, {
    strokeColor: 'rgba(0, 128, 255, 0.7)',
    lineWidth: 10
  },map,routes);

  // The green route showing a truck route with a trailer
  calculateRoute(router, Object.assign(routeRequestParams, {
    'truck[axleCount]': 4,
  }), {
    strokeColor: 'rgba(25, 150, 10, 0.7)',
    lineWidth: 7
  },map,routes);

  // The violet route showing a truck route with a trailer
  calculateRoute(router, Object.assign(routeRequestParams, {
    'truck[axleCount]': 5,
    'truck[shippedHazardousGoods]': 'flammable'
  }), {
    strokeColor: 'rgba(255, 0, 255, 0.7)',
    lineWidth: 5
  },map,routes);
}

/**
 * Calculates and displays a route.
 * @param {Object} params The Routing API request parameters
 * @param {H.service.RoutingService} router The service stub for requesting the Routing API
 * @param {mapsjs.map.SpatialStyle.Options} style The style of the route to display on the map
 */
function calculateRoute (router, params, style,map,routes) {
  router.calculateRoute(params, function(result) {
    addRouteShapeToMap(style, result.routes[0],map,routes);
  }, console.error);
}

/**
 * Boilerplate map initialization code starts below:
 */


/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
function addRouteShapeToMap(style, route, map,routes){
  route.sections.forEach((section) => {
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: style
    });

    // Add the polyline to the map
    routes.addObject(polyline);
    // And zoom to its bounding rectangle
    map.getViewModel().setLookAtData({
      bounds: routes.getBoundingBox()
    });
  });
}

document.getElementById("select").addEventListener("change", function(event) {
  map1.removeObject(routes1);
  map2.removeObject(routes2);
  routes1 = new H.map.Group();
  routes2 = new H.map.Group();

  if(event.target.value==="2"){
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '45.26318,20.09165', 
      destination: '45.11793,20.61051', 
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform1,map1,routeRequestParams,routes1);
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '45.26318,20.09165', 
      destination: '45.11793,20.61051', 
      via: '45.37992,20.34261', 
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform2,map2,routeRequestParams,routes2);

    addInfoBubble(map2,ui2, {lat: 45.26318, lng: 20.09165},'<div style="width:150px"><a href="#">Šajkaš</a></div>');

    addInfoBubble(map2,ui2, {lat: 45.37992, lng: 20.34261},
      '<div style="width:150px"><a href="#">Vrbas</a></div>' +
      '<div style="width:150px">Najkraći mogući prelaz preko Zrenjanina za teretni transport<br>' +
      'The shortest legal crossing via Zrenjanin for freight transport</div>');
  
    addInfoBubble(map2,ui2, {lat: 45.11793, lng: 20.61051},'<div style="width:150px"><a href="#">Kovačica</a></div>');

    document.getElementById("text2change1").innerHTML = "Initially, you get a distance of 56.3 km, which according to the scale of the price list is 726 rsd/t.<br> 24t x 726rsd/t=17.424rsd is not correct price";
    document.getElementById("text2change2").innerHTML = "However, a maximum 12t vehicle is allowed to cross the bridge near Titel, which means that a 24t trailer is absolutely not allowed. The only possible route is through Zrenjanin, where the distance is 84.5 km or 946 rsd/t.<br>24t x 946rsd/t=22.704rsd is correct price"

  }else if(event.target.value==="3"){
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '45.39816,19.45093',
      destination: '45.50183,19.26488', 
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform1,map1,routeRequestParams,routes1);
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '45.39816,19.45093',
      destination: '45.50183,19.26488', 
      via: '45.42194,19.23609', 
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform2,map2,routeRequestParams,routes2);

    addInfoBubble(map2,ui2, {lat: 45.39816, lng: 19.45093},'<div style="width:150px"><a href="#">Silbaš</a></div>');

    addInfoBubble(map2,ui2, {lat: 45.42194, lng: 19.23609},
      '<div style="width:150px"><a href="#">Vrbas</a></div>' +
      '<div style="width:150px">Najkraći mogući prelaz preko Bača i Deronja za teretni transport<br>' +
      'The shortest legal crossing via Bač and Deronje for freight transport</div>');
  
    addInfoBubble(map2,ui2, {lat: 45.50183, lng: 19.26488},'<div style="width:150px"><a href="#">Odžaci</a></div>');

    document.getElementById("text2change1").innerHTML = "Initially, 22 km or the price according to the price list 495 rsd/t. <br>24t x 495rsd/t=11,880rsd is not a correct price";
    document.getElementById("text2change2").innerHTML = "Part of Ratkovo - Odzaci is a ban on passage for vehicles weighing more than 12t, so a 24t trailer must take the following route. 37.5 km or the price according to the price list 568 rsd/t.<br> 24t x 568rsd/t=13,632rsd is correct price ";


  }else if(event.target.value==="4"){
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '45.62763,20.02340',
      destination: '45.80476,19.64742', 
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform1,map1,routeRequestParams,routes1);
    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '45.62763,20.02340',
      destination: '45.80476,19.64742', 
      via: '45.58581,19.60725',
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform2,map2,routeRequestParams,routes2);

    addInfoBubble(map2,ui2, {lat: 45.62763, lng: 20.02340},'<div style="width:150px"><a href="#">Bečej</a></div>');

    addInfoBubble(map2,ui2, {lat: 45.58581, lng: 19.60725},
      '<div style="width:150px"><a href="#">Vrbas</a></div>' +
      '<div style="width:150px">Najkraći mogući prelaz preko Vrbasa za teretni transport<br>' +
      'The shortest legal crossing via Vrbas for freight transport</div>');
  
    addInfoBubble(map2,ui2, {lat: 45.80476, lng: 19.64742},'<div style="width:150px"><a href="#">Bačka Topola</a></div>');

    document.getElementById("text2change1").innerHTML = "41.2 km or the price according to the price list 670 rsd/t.<br> 24t x 670sd/t=16.080rsd is wrong price";
    document.getElementById("text2change2").innerHTML = "The section from Becej to Backa Topola is prohibited for vehicles weighing more than 12t, so a 24t trailer must follow the following route.71.6 km or the price according to the price list 855 rsd/t. <br>24t x 855rsd/t=20.520rsd is correct price";

  }else{

    routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'truck',
      origin: '44.75721,19.69456', // Zorka, Sabac 
      destination: '45.33021,19.43484', // Nova Gajdobra
      return: 'polyline,travelSummary',
      units: 'imperial',
      spans: 'truckAttributes'
    };
    calculateRoutes (platform1,map1,routeRequestParams,routes1);
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
    calculateRoutes (platform2,map2,routeRequestParams,routes2);

  
    addInfoBubble(map2,ui2, {lat: 44.75721, lng: 19.69456},'<div style="width:150px"><a href="#">Šabac</a></div>');

    addInfoBubble(map2,ui2, {lat: 45.26200105216257, lng: 19.860023178174792},
      '<div style="width:150px"><a href="#">Žeželjev Most</a></div>' +
      '<div style="width:150px">Najkraći mogući prelaz preko Dunava za teretni transport<br>' +
      'The shortest legal crossing via the Danube river for freight transport</div>');
        
    addInfoBubble(map2,ui2, {lat: 45.33021, lng: 19.43484},'<div style="width:150px"><a href="#">Nova Gajdobra</a></div>');

    document.getElementById("text2change1").innerHTML = "Initially, 105 km or the price according to the price list 670 rsd/t. <br>24t x 670rsd/t=16,080rsd is not a correct price";
    document.getElementById("text2change2").innerHTML = "24t trailer must take the following route via Novi Sad. 113.5 km or the price according to the price list 855 rsd/t.<br> 24t x 855rsd/t=20,520rsd is correct price ";

  }
  map1.addObject(routes1);
  map2.addObject(routes2);
});