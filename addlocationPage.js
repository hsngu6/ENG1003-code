// Code for the Add Location page.
//code to get nickname, longitude, latitude for addLocation method in locationWeatherCache.js
//This function is called inside initiMap as it needs the local address object
var addLocationRef = document.getElementById("add-location-button");
var nicknameRef = document.getElementById("nickname-input");
function newLocation() {
    var placeObject = place;
    if (placeObject !== null){
        var newLocationLatitude = placeObject.geometry.location.lat();
        var newLocationLongitide = placeObject.geometry.location.lng();
        
        if (nicknameRef.value.trim() !== "") {
            var newLocationNickname = nicknameRef.value;
        }
        else{
            var newLocationNickname = placeObject.formatted_address;
        }
    }
    //addLocation( newLocationLatitude, newLocationLongitide, newLocationNickname);
    /*add all the code to save and undate to cache */
    window.location.href = "index.html";
}

//a variable to refernce the getPlaceResult object which contains location info
var place = null;
addLocationRef.addEventListener('click', newLocation);

//code to set up the map and autocomplete
var script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPrYvyNY9m97XwlG_WWm1VyH0s188w_ds&libraries=places&callback=initMap";
script.async = true;
script.defer = true;
document.body.appendChild(script);

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: 0, lng: 180},
        //bounds: ((0,-180),(0,180))
    });


    var inputRef = document.getElementById( 'location-input' );

    var mapOptions = {};
    //the autocomplete object
    var address = new google.maps.places.Autocomplete( inputRef , mapOptions);
    address.bindTo('bounds', map);
    //map marker
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    }); 
    //map window to diaply address
    var infoWindow = new google.maps.InfoWindow();
    
    address.addListener('place_changed', function() {
        marker.setVisible(false);
        place = address.getPlace();

          // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        
        marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
        }));
        
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        infoWindow.setContent(place.formatted_address);
        infoWindow.open(map, marker);

        });

}	
		