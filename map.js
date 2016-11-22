var MODULE = (function() {

  var map,
      map_options = {
        center: {
            lat: 52.22967560, 
            lng: 21.01222870
        },
        zoom: 6
      },
      map_container,
      startLocation, 
      destinationLocation,
      myCurrentLocation,
      send,
      api_key,
      my_position = {};
  
  function loadMapScript() {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + api_key + "&callback=MODULE.initMap";
    document.body.appendChild(script);
  }

  function getMyPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        my_position.lat = position.coords.latitude;
        my_position.lng = position.coords.longitude;
      });
    }
  }

  function showError() {

  }

  function getPosition() {

  }

  function draw() {
    
  }

  function setMarker(map, marker, pos) {
      marker = new google.maps.Marker({
        position: pos,
        map: map
      });
      return marker;
  }

  function initMap() {
    map = new google.maps.Map(map_container, map_options);
  }

  function initModule(container, input1, input2, btn1, btn2, center, zoom, key) {
    if(arguments.length === 8) {

      map_container = container;
      startLocation = input1;
      destinationLocation = input2;
      myCurrentLocation = btn1;
      send = btn2;

      map_options.center = center;
      map_options.zoom = zoom;

      api_key = key;

      bindEvents();
      loadMapScript();
    }
  }

  function bindEvents() {

  }

  return {
    initMap: initMap,
    initModule: initModule
  };
})();


MODULE.initModule(document.getElementById('map'), document.getElementById("start-location"), 
  document.getElementById("destination-location"), document.getElementById("my-current-location"), 
  document.getElementById("send"), {lat: 52.22967560, lng: 21.01222870}, 6, "AIzaSyAo7WxKN7803rymBYr9w-E0FyJeXPHmpE4");



