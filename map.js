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
      my_position = {},
      my_destination = {},
      my_marker,
      desitnation_marker;
  
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
            //my_marker = setMarker(my_marker, my_position, response.results[0].formatted_address);
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
    //TODO pokaż błąd geolokacji
  }

  function draw() {
    //TODO rysuj ścieżkę
  }

  function fetchData() {
      var start = startLocation.value.trim().split(' ').join('+'); 
      var end = destinationLocation.value.trim().split(' ').join('+');
      
      fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + start + "&api_key=" + api_key)
        .then(handleErrors).then(parseJSON).then(function(response) {
          if(response.status === "OK") {
            my_position.lat = response.results[0].geometry.location.lat;
            my_position.lng = response.results[0].geometry.location.lng;
            my_marker = setMarker(my_marker, my_position, response.results[0].formatted_address);
          }
        }).catch(function(error) {
          throw new Error("Request failed: " + error);
        });

        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + end + "&api_key=" + api_key)
        .then(handleErrors).then(parseJSON).then(function(response) {
          if(response.status === "OK") {
            my_destination.lat = response.results[0].geometry.location.lat;
            my_destination.lng = response.results[0].geometry.location.lng;
            desitnation_marker = setMarker(desitnation_marker, my_destination, response.results[0].formatted_address);
          }
        }).catch(function(error) {
          throw new Error("Request failed: " + error);
        });
  }

  function setMarker(marker, pos, title) {
      marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP
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

    send.addEventListener("click", function(event) {
      event.preventDefault();
      fetchData();
    })
  }

  return {
    initMap: initMap,
    initModule: initModule
  };
})();


MODULE.initModule(document.getElementById('map'), document.getElementById("current-location"), 
  document.getElementById("destination-location"), document.getElementById("my-current-location"), 
  document.getElementById("send"), {lat: 52.22967560, lng: 21.01222870}, 6, "AIzaSyAo7WxKN7803rymBYr9w-E0FyJeXPHmpE4");



