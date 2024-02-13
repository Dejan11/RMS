/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

/**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param {H.Map} map A HERE Map instance within the application
 */
function addInfoBubble(map,ui) {
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);


  addMarkerToGroup(group, {lat: 45.26200105216257, lng: 19.860023178174792},
    '<div style="width:150px"><a href="#">Žeželjev Most</a></div>' +
    '<div style="width:150px">Najkraći mogući prelaz preko Dunava za teretni transport<br>' +
    'The shortest legal crossing over the Danube for freight transport</div>');

    addMarkerToGroup(group, {lat: 44.75721, lng: 19.69456},'');
      
    addMarkerToGroup(group, {lat: 45.33021, lng: 19.43484},'');

}

// Now use the map as required...
map1 && map1.getLayers!=undefined?addInfoBubble(map1,ui1):null;
map2 && map2.getLayers!=undefined?addInfoBubble(map2,ui2):null;