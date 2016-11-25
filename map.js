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
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + my_position.lat + "," + my_position.lng + "&key=" + api_key)
      .then(handleErrors).then(parseJSON).then(function(response) {
        if(response.status === "OK") {
          startLocation.value = response.results[0].formatted_address;
        }
      }).catch(function(error) {
        throw new Error("Request failed: " + error);
      });
      });
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  function handleErrors(response) {
    if(!response.ok) {
      throw new Error("Request failed: " + response.statusText);
    }
    return response;
  }

  function showError() {

  }

//do wywalenia
  function setPosition() {
    getMyPosition();
    console.log(my_position.lat + " " + my_position.lng);
    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + my_position.lat + "," + my_position.lng + "&key=" + api_key)
      .then(handleErrors).then(parseJSON).then(function(response) {
        if(response.status === "OK") {
          startLocation.value = response.results[0].formatted_address;
        }
      }).catch(function(error) {
        throw new Error("Request failed: " + error);
      });
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

      loadMapScript();
      bindEvents();
    }
  }

  function bindEvents() {
    myCurrentLocation.addEventListener("click", function(event) {
      event.preventDefault();
      getMyPosition();
    });
  }

  return {
    initMap: initMap,
    initModule: initModule
  };
})();


MODULE.initModule(document.getElementById('map'), document.getElementById("current-location"), 
  document.getElementById("destination-location"), document.getElementById("my-current-location"), 
  document.getElementById("send"), {lat: 52.22967560, lng: 21.01222870}, 6, "AIzaSyAo7WxKN7803rymBYr9w-E0FyJeXPHmpE4");



