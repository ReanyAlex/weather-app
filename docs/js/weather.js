if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $(document).ready(function() {
      const apiKey = "3abee957470744b8ac851416172306"

      // url for api request to find location
      // let locReqUrl = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=Rt5TsWAZfnGjflbfxUjGuvw5iUVhMghS&q="+position.coords.latitude+"%2C" + position.coords.longitude;

      //fetch data from api return json
      // fetch(locReqUrl).then((res) => res.json())
      //   .then(function(json) {
      //     console.log(json);


          // url for local weather based on response of your geolocation needs state and city
          // let locWeatherUrl = "http://dataservice.accuweather.com/currentconditions/v1/" + json.Key + "?apikey=" + apiKey + "&language=en-us&details=true";
          let locWeatherUrl = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=`+position.coords.latitude+"," + position.coords.longitude
          console.log(locWeatherUrl);
          fetch(locWeatherUrl).then((res) => res.json())
            .then(function(json) {
              console.log(json);

              // inserts location
              document.querySelector(".location").innerHTML = json.location.name + ", " + json.location.region

              // // inserts currentweather icon and description
              document.querySelector(".current-condition-icon").src = json.current.condition.icon.replace(/\/\//g, '');
              document.querySelector(".current-condition-text").innerHTML = json.current.condition.text;

              // // inserts current temperature
              document.querySelector(".current__temp-text").innerHTML = json.current.temp_f + "°F";

            })
            // url for local weather based on response of your geolocation needs location code
            let weatherForecastUrl = `https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=`+position.coords.latitude+"," + position.coords.longitude + `&days=8`
            console.log(weatherForecastUrl);
          fetch(weatherForecastUrl).then((res) => res.json())
            .then(function(json) {
              console.log(json);

              // inserts todays high and lows
              document.querySelector(".current__temp-value-high").innerHTML = json.forecast.forecastday[0].day.maxtemp_f + "°F";
              document.querySelector(".current__temp-value-low").innerHTML = json.forecast.forecastday[0].day.mintemp_f + "°F";

              // insert chance of percip and humidity
               document.querySelector(".current-percip").innerHTML = json.current.precip_in+ " in.";
               document.querySelector(".current-humidity").innerHTML = json.current.humidity + "%";

               // //creating the div for the forecast
               let forecastDiv = document.querySelector(".forecastDiv")
               for (let i = 1; i <= 7; i++) {

               forecastDiv.innerHTML += '<div class="forecast col-forecast7-md col-6-sm"><div><span class="forecast-date">' +json.forecast.forecastday[i].date + '</span></div><div class="forecast-hl"><span class="forecast-h">' + json.forecast.forecastday[i].day.maxtemp_f+'</span><span>'+' | '+'<span class="forecast-l">' +json.forecast.forecastday[i].day.mintemp_f+'</span></div><div><img class="forecast-icon" src=' + json.forecast.forecastday[i].day.condition.icon.replace(/\/\//g, '')
               + '></div><div><span class="forecast-conditions">' +json.forecast.forecastday[i].day.condition.text+'</span></div><div><span class="forecast-pop">'+"☂ " + json.forecast.forecastday[i].day.totalprecip_in+" in."+'</span></div></div>'
             }

      })
    })
  })
}
//-------------------------------------------------//
//locatiions of dom elements











//-------------------------------------------------//

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
