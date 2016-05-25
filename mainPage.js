// Code for the main app page (locations list).
var forecastIOKey = "d5ad10dfaecc9029172149631f0f9725";
var forecastIOUrl = "https://api.forecast.io/forecast/";

 simpleDateString = function(date) {
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
    forecastDateString = function(date) {
        return simpleDateString(date) + "T12:00:00";
    }

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationIndex)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationIndex);
    // And load the view location page.
    location.href = 'viewlocation.html';
}

//Callback function to display the retrieved results
function displayForecast( response , index )
{
    var listRef = document.getElementById("locationList");
    var listHTML = "";
    //listRef.innerHTML = listHTML;
    
    console.log("Third function");
    console.log( response );
    var displayItems = ["summary", "icon", "temperatureMax", "temperatureMin"];
    for (var index in displayItems)
    {
        var refString = "response.daily.data[0]."+displayItems[index]; 
        refString = eval(refString);
        console.log(refString);
    }
}

function jsonpRequestDay(url, key, date, latitude, longitude, callback)
{
    // Build URL parameters from data object.
    var formattedDate = forecastDateString(date);
    console.log(formattedDate);
	var latitude = latitude;
    forecastRef = latitude.toString()+","+longitude.toString()+","+formattedDate;

    var script = document.createElement('script');
    script.src = url + key + "/" + forecastRef+"?units=si&exclude=currently,minutely,hourly&callback=" + callback;
    document.body.appendChild(script);
    console.log( script.src );

}


//Code to load the main page list from the cache
//Screw this, I'm gonna do a callback for currently
function createLocationListDisplay()
{
    var listRef = document.getElementById("locationList");
    var listHTML = "";
    listRef.innerHTML = listHTML;
    //call code in locationWeatherCache.js to load the locations from cache
    //loadLocations();
    var locationWCActiveInstance = [{nickname: "west-coast",
                                     latitude: 0,
                                     longitude: 0,
                                     forecasts: {}}];
    for (var index=0; index< locationWCActiveInstance.length; index++)
    {
        var location = locationWCActiveInstance[index];
        var nickname = location.nickname;
        listHTML+= "<li class='mdl-list__item mdl-list__item--two-line' onclick='viewLocation'("+ index +");'><span class='mdl-list__item-primary-content' id='lat-"+location.latitude+"-lng-"+location.longitude+"'><img class='mdl-list__item-icon' id='icon'" + index + " src='images/loading.png' class='list-avatar' /><span>" + nickname + "</span><span id='weather'" + index +" class='mdl-list__item-sub-title'>Weather Summary Loading</span></span></li>"
        listRef.innerHTML = listHTML;

        console.log(JSON.stringify(location));
        var newDate = new Date();
        console.log("First function");
        jsonpRequestDay(forecastIOUrl, forecastIOKey, newDate , location.latitude, location.longitude, "displayForecast");

    }
}
createLocationListDisplay();