let city = ""

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $(document).ready(function() {
      // url for api request to find location
      let locReqUrl = "https://api.wunderground.com/api/f683dd612ad90419/geolookup/q/" + position.coords.latitude + "," + position.coords.longitude + ".json"
      // url for local weather based on response of your geolocation needs state and city
      let locWeatherUrl = "https://api.wunderground.com/api/f683dd612ad90419/conditions/q/"
      let locWeatherUrlComp = ""

      // url for local weather based on response of your geolocation needs state and city
      let weatherForecastUrl = "https://api.wunderground.com/api/f683dd612ad90419/forecast10day/q/"
      let weatherForecastUrlComp = ""

      //fetch data from api return json
      fetch(locReqUrl).then((res) => res.json())
        .then(function(json) {
          console.log(json.location);
          locWeatherUrlComp = locWeatherUrl + json.location.state + "/" + json.location.city.replace(/ /g, "_") + ".json"

          fetch(locWeatherUrlComp).then((res) => res.json())
            .then(function(json) {
              let currentWeather = json.current_observation;
              console.log(currentWeather);
              //inserts location
              document.querySelector(".location").innerHTML = currentWeather.display_location.full + " "
              //inserts currentweather icon and description
              document.querySelector(".current-condition-icon").src = currentWeather.icon_url;
              document.querySelector(".current-condition-text").innerHTML = currentWeather.weather
              //inserts current temperature
              document.querySelector(".current__temp-text").innerHTML = currentWeather.temp_f + "°F";
            })

          weatherForecastUrlComp = weatherForecastUrl + json.location.state + "/" + json.location.city.replace(/ /g, "_") + ".json"
          console.log(weatherForecastUrlComp);
          fetch(weatherForecastUrlComp).then((res) => res.json())
            .then(function(json) {
              console.log(json.forecast);
              let forecast = json.forecast.simpleforecast.forecastday;
              //inserts todays high and lows
              document.querySelector(".current__temp-value-high").innerHTML = forecast[0].high.fahrenheit + "°F";
              document.querySelector(".current__temp-value-low").innerHTML = forecast[0].low.fahrenheit + "°F";

              //insert chance of percip and humidity
              document.querySelector(".current-percip").innerHTML = forecast[0].pop + "%"
              document.querySelector(".current-humidity").innerHTML = forecast[0].avehumidity + "%"

              //creating the div for the forecast
              let forecastDiv = document.querySelector(".forecastDiv")
              for (let i = 1; i <= 7; i++) {

                forecastDiv.innerHTML +=
                '<div class="forecast col-forecast7-md col-3-sm"><div><span class="forecast-date">' +forecast[i].date.weekday + " " + forecast[i].date.month+"/"+forecast[i].date.day+'</span></div><div class="forecast-hl"><span class="forecast-h">'+ forecast[i].high.fahrenheit+'</span><span>'+' | '+'<span class="forecast-l">'+forecast[i].low.fahrenheit+'</span></div><div><img class="forecast-icon" src='+ forecast[i].icon_url +'></div><div><span class="forecast-conditions">'+forecast[i].conditions+'</span></div><div><span class="forecast-pop">'+"☂ "+forecast[i].pop+"%"+'</span></div></div>'
              }
            })



        })
    })
  })
}

function myMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    })
  }
}

(function getTime() {
  var today = new Date();
  var day = today.getDay();
  var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
  hours = today.getHours(),
  minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var suffix = " AM";
  if (hours >= 12) {
    suffix = " PM";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  document.querySelector(".current__time-text").innerHTML = daylist[day] + " " + hours + ":" + minutes + suffix;
})();
