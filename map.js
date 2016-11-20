var MODULE = (function() {

  var map_options = {
      center: {
          lat: 52.22967560, 
          lng: 21.01222870
      },
      zoom: 6
    };

  function getMyPosition(map) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      });
    }
  }

  function getPosition() {

  }

  function draw() {
    
  }

  function setMarker(map, marker, pos) {
    if(marker) {
      marker.position = pos;
    } else {
      marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    }
  }

  function initMap(element, pos, zoom) {

    if(arguments.length === 3) {
      map_options.center = pos;
      map_options.zoom = zoom;
    }

    var map = new google.maps.Map(element, map_options);

    return map;
  }

  return {
    initMap: initMap
  };
})();

var api_key = "AIzaSyAo7WxKN7803rymBYr9w-E0FyJeXPHmpE4";

function init() {
  var map = MODULE.initMap(document.getElementById('map'), {lat: 52.22967560, lng: 21.01222870}, 6);
}