
// Returns a date in the format "YYYY-MM-DD".
simpleDateString = function( date ) {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = date.getFullYear() + "-" + 
            pad(date.getMonth() + 1, 2) + '-' + 
            pad(date.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
forecastDateString = function( date ) {
    return simpleDateString( date ) + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";
var locationWCActiveInstance;

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    //The index of the currently 'accessed' item so we know which location to load. This is due to all the js files being unloaded while switching pages.
    var callbacks = {}; 

    // Public methods:

    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
        
        return location.length; 
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
   
    this.locationAtIndex = function(index) {
     
        try {
     return locations[index]; }
        
        catch(err) {
            console.log("Cannot find location due to: ");
        }        
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(addLocationLatitude, addLocationLongitude, addLocationNickname)
    {
        //Turns out a function wasn't needed, and the addLocation already constrains the created object.
        var location = 
        {
            nickname: addLocationNickname,
            latitiude: addLocationLatitude,
            longitude: addLocationLongitude,
            forecasts: {}
            
        }
        
        locations.push(location); 
        
        // this was a easier way to do it. 
        return locations.length-1;  
          
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        if (index > -1) {
        locations.splice(index, 1);
        }
        
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    /*Isn't as hard as we thought it was, as the locations list doesn't contain any functions.
     *Unlike the week6 Prac which required the master list's objects to be toJsoned first, this can simply be stringified
     */
    this.toJSON = function() {
        var locationsListPDO = [];
        for (var index in locations){// turns out this notation does work while iterating
            var locationPDO = JSON.stringify(locations[index]);
            locationsListPDO.push(locationPDO);
        }
        return {locations:locationsListPDO};
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        locations = locationWeatherCachePDO.locations;
        activeLocationIndex = locationWeatherCachePDO.activeIndex;
    };

    /*
    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    //Screw this I'm doing it my own way
    this.getWeatherAtIndexForDate = function(index, date, callback) {
        
        latitude = locations[index].latitude;
        longitude = locations[index].longitude;
        var formattedDate = forecastDateString(date);
        forecastRef = latitude.toString()+","+longitude.toString()+","+formattedDate;
        
        if( locations[index].forecasts.hasOwnProperty(formattedDate)){
            callback( locations[index].forecasts );
            //return locations[index].forecasts;
        }
        else{
            var script = document.createElement('script');
            script.src = url + forecastIOKey + "/" + forecastRef+"?units=si&callback="+callback;
            document.body.appendChild(script);
        }
        return;
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function weatherResponse(response) {
        forecastUpdate = response.daily.data[0];
        return( forecastUpdate );
    };
    */
    
    //Function to get the weather data for an index at a certain date, and to update the locations list if needed, then execute the function as a callback or just right-out;
    this.getWeatherAtIndex = function(index, date, callback) {
        
        var latitude = locations[index].latitude;
        var longitude = locations[index].longitude;
        var formattedDate = forecastDateString(date);
        var forecastRef = latitude.toString()+","+longitude.toString()+","+formattedDate;
        
        var locationsUpdate = function( response ) {
            
        }
        
        if (locations.forecasts.hasOwnProperty(forecastRef)) {
            var weatherData = locations.forecasts.forecastRef;
            callback(index, weatherData);
        }
        else {
            var script = document.createElement('script');
            script.src = url + forecastIOKey + "/" + forecastRef+"?units=si&callback=";
            document.body.appendChild(script);
        }
        return;
        
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
        for(var i=0; i<locations.length; i++) {
            
            if (item.latitude === latitude && item.longitude === longitude) {
                return i;
            }
        }
        
        return -1;
        
    }
    
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
    
}

