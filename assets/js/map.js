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
      error_container,
      api_key,
      markers = [],
      directionsService,
      directionsDisplay;
  
  function loadMapScript() {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + api_key + "&callback=MODULE.initMap";
    document.body.appendChild(script);
  }

  function getMyPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=" + api_key)
        .then(handleErrors).then(parseJSON).then(function(response) {
          if(response.status === "OK") {
            startLocation.value = response.results[0].formatted_address;
            error_container.textContent = "";
          }
        }).catch(function(error) {
          throw new Error("Request failed: " + error);
        });
      }, showError);
    } else {
      error_container.textContent = "Geolocation is not supported by this browser.";
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  function handleErrors(response) {
    if(!response.ok) {
      error_container.textContent = "Request failed: " + response.statusText;
      throw new Error("Request failed: " + response.statusText);
    }
    return response;
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        error_container.textContent = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        error_container.textContent = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        error_container.textContent = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        error_container.textContent = "An unknown error occurred.";
        break;
    }
  }

  function search() {
      var start = startLocation.value.trim().split(' ').join('+'); 
      var end = destinationLocation.value.trim().split(' ').join('+');

      if(start !== "" && end !== "") {
        fetchData(start, 0);
        fetchData(end, 1);

        setPath(start, end);

        error_container.textContent = "";
      } else {
        error_container.textContent = "You must get start and destination location.";
      }
  }

  function fetchData(location, markerIndex) {
    var position = {};
    var address;
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&api_key=" + api_key)
      .then(handleErrors).then(parseJSON).then(function(response) {
        if(response.status === "OK") {
          position.lat = response.results[0].geometry.location.lat;
          position.lng = response.results[0].geometry.location.lng;
          address = response.results[0].formatted_address;
          setMarker(markerIndex, position, address);
        }
      }).catch(function(error) {
        throw new Error("Request failed: " + error);
    });
  }

  function setPath(start, end) {
    if(directionsDisplay) {
      directionsDisplay.setMap(null);
    }
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({map: map});

    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
        if(status === "OK") {
          directionsDisplay.setDirections(response);
      }
    });
  }

  function setMarker(index, pos, title) {
    if(markers[index]) {
      markers[index].setMap(null);
    }
    markers[index] = new google.maps.Marker({
      position: pos,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP
    });
  }

  function initMap() {
    map = new google.maps.Map(map_container, map_options);
  }

  function initModule(container, input1, input2, btn1, btn2, error, center, zoom, key) {
    if(arguments.length === 9) {

      map_container = container;
      startLocation = input1;
      destinationLocation = input2;
      myCurrentLocation = btn1;
      send = btn2;
      error_container = error;

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
      search();
    })
  }

  return {
    initMap: initMap,
    initModule: initModule
  };
})();


MODULE.initModule(document.getElementById('map'), document.getElementById("start-location"), 
  document.getElementById("destination-location"), document.getElementById("my-current-location"), 
  document.getElementById("send"), document.getElementById("error"), {lat: 52.22967560, lng: 21.01222870}, 6, "YOUR API KEY HERE");



