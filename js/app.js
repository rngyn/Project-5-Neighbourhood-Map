import { api } from "./api/constants"

var map;
var infoWindow;
// Create a new blank array for all the listing markers.
var markers = [];

// Error handling for Google Maps.
function googleError() {
  alert('Error occured when loading Google Maps.');
}


function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.048615, lng: -114.070846},
    zoom: 14,
    styles: styles,
    disableDefaultUI: true
  });

  infoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // Function to call Foursquare API and populate infowindow.
  function getMarkerInfo(marker) {
    (function() {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;

      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });

      viewModel.locationList()[i].marker = marker;

      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, infoWindow);
        infoWindow.setContent(infoWindowContent);
        map.panTo(this.getPosition());
        bounce(this);
      });

      var venue, street, city, phone, infoWindowContent;

      // Call Foursquare API.
      $.ajax({
        method: 'GET',
        url: api.foursquareURL,
        dataType: 'json',
        data: {
          client_id: api.client_id,
          client_secret: api.client_secret,
          query: marker.title,
          ll: '51.048615,-114.070846',
          v: '20170801'
        },
      })
        // Populate variables for infowindow with Foursquare API reponse.
        .done(function(data) {
          venue = data.response.venues[0];
          street = venue.location.formattedAddress[0] || 'No street address available from Foursquare.';
          city = venue.location.formattedAddress[1] || 'No city available from Foursquare.';
          phone = venue.contact.formattedPhone || 'No phone number available from Foursquare.';
          infoWindowContent = "<div class='siimple-h6'>" + title + "</div>" + street + "<br>" + city + "<br>" + phone;
        })
        // Error handling for Foursquare API.
        .fail(function() {
          infoWindowContent = 'Error occured when loading Foursquare.';
        });
      bounds.extend(marker.position);
    })(i);
  }

  // Call getMarkerInfo function for each location in the array.
  for (var i = 0; i < locations.length; i++) {
    getMarkerInfo(i);
  }
  // Extend the boundaries of the map for each marker.
  map.fitBounds(bounds);
}

//Animation for selected marker.
function bounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function() {
    marker.setAnimation(null);
  }, 1500);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infoWindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infoWindow.marker != marker) {
    infoWindow.marker = marker;
    infoWindow.setContent(marker.infoWindowContent);
    infoWindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infoWindow.addListener('closeclick',function(){
      infoWindow.setMarker = null;
    });
  }
}

var Location = function(data) {
  this.title = data.title;
  this.location = data.location;
};

var ViewModel = function () {
  var self = this;

  this.locationList = ko.observableArray([]);
  locations.forEach(function(locationItem){
    self.locationList.push(new Location(locationItem));
  });

  this.filter = ko.observable('');
  // Filter locations on list.
  this.filteredLocations = ko.computed(function() {
    var filter = self.filter().toLowerCase();
    if (!filter) {
          for (var i = 0; i < self.locationList().length; i++) {
            if (self.locationList()[i].marker) {
              self.locationList()[i].marker.setVisible(true);
            }
          }
          return self.locationList();
        } else {
          return ko.utils.arrayFilter(self.locationList(), function(location) {
            var  result = location.title.toLowerCase().indexOf(filter) >= 0;
            if (location.marker) {
              location.marker.setVisible(result);
            }
            return result;
          });
        }
    }, this);

    this.currentLocation = ko.observable(this.locationList()[0]);

    this.setLocation = function(clickedLocation) {
        google.maps.event.trigger(clickedLocation.marker, 'click');
    };
};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
