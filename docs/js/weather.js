if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $(document).ready(function() {
      const apiKey = "3abee957470744b8ac851416172306"

      let locWeatherUrl = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=` + position.coords.latitude + "," +
      position.coords.longitude
      console.log(locWeatherUrl);
      var local = fetch(locWeatherUrl).then((res) => res.json())
        .then(function(json) {
          console.log(json);
          // inserts location
          document.querySelector(".location").innerHTML = json.location.name + ", " + json.location.region
          // inserts currentweather icon and description
          document.querySelector(".current-condition-icon").src = json.current.condition.icon.replace(/\/\//g, '');
          document.querySelector(".current-condition-text").innerHTML = json.current.condition.text;

          // inserts current temperature
          let currentTemp = json.current.temp_f;
          document.querySelector(".current__temp-text").innerHTML = currentTemp + "°F";

          //change background image based on condition code
          // console.log(conditionImage[json.current.condition.code].photo);
          document.body.style.backgroundImage = "url(" + conditionImage[json.current.condition.code].photo + ")";

          //returns object for Promise.all()
          return {
            currentTemp: currentTemp,
          }
        })
      // url for local weather based on response of your geolocation needs location code
      let weatherForecastUrl = `https://api.apixu.com/v1/forecast.json?key=${apiKey}&q=` + position.coords.latitude + "," + position.coords.longitude + `&days=9`
      // console.log(weatherForecastUrl);
      var forecast = fetch(weatherForecastUrl).then((res) => res.json())
        .then(function(json) {
          console.log(json);

          // inserts todays high and lows
          let highTemp = json.forecast.forecastday[0].day.maxtemp_f
          let lowTemp = json.forecast.forecastday[0].day.mintemp_f

          document.querySelector(".current__temp-value-high").innerHTML = highTemp + "°F";
          document.querySelector(".current__temp-value-low").innerHTML = lowTemp + "°F";

          // insert chance of percip and humidity
          document.querySelector(".current-percip").innerHTML = json.current.precip_in + " in.";
          document.querySelector(".current-humidity").innerHTML = json.current.humidity + "%";

          // creating the div for the forecast
          let forecastDiv = document.querySelector(".forecastDiv")
          for (let i = 2; i <= 8; i++) {

            //create a date format from epoch number
            var utcSeconds = json.forecast.forecastday[i].date_epoch;
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(utcSeconds)
            //  console.log(d);

            let forecastDate = d.toString().split(" ")[0] + " " + d.toString().split(" ")[1] + " " + d.toString().split(" ")[2]

            forecastDiv.innerHTML += '<div class="forecast col-forecast7-md col-3-sm"><div><span class="forecast-date">' + forecastDate + '</span></div><div class="forecast-hl"><span class="forecast-h">' + json.forecast.forecastday[i].day.maxtemp_f + '</span><span>' + ' | ' + '<span class="forecast-l">' + json.forecast.forecastday[i].day.mintemp_f + '</span></div><div><img class="forecast-icon" src=' + json.forecast.forecastday[i].day.condition.icon.replace(/\/\//g, '') +
              '></div><div><span class="forecast-conditions">' + json.forecast.forecastday[i].day.condition.text + '</span></div><div><span class="forecast-pop">' + "☂ " + json.forecast.forecastday[i].day.totalprecip_in + " in." + '</span></div></div>'
          }
          //returns object for Promise.all()
          return {
            highTemp: highTemp,
            lowTemp: lowTemp
          }
        })

      Promise.all([local, forecast])
        .then(values => {
          let currentTemp = values[0].currentTemp
          let highTemp = values[1].highTemp
          let lowTemp = values[1].lowTemp
          //sets high temp to current temp if it is currently higher
          if (currentTemp > highTemp) {
            document.querySelector(".current__temp-value-high").innerHTML = currentTemp + "°F";
          }
          //sets low temp to current temp if it is currently lower
          if (currentTemp < lowTemp) {
            document.querySelector(".current__temp-value-low").innerHTML = currentTemp + "°F";
          }
        });
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

//-------------------------------------------------//
//obj for background images
var conditionImage = {
  "1000": {
    "day": "Sunny",
    "photo": "photos/sunny.jpg"
  },
  "1003": {
    "day": "Partly Cloudy",
    "photo": "photos/cloudy.jpg"
  },
  "1006": {
    "day": "Cloudy",
    "photo": "photos/cloudy.jpg"
  },
  "1009": {
    "day": "Overcast",
    "photo": "photos/overcast.jpg"
  },
  "1030": {
    "day": "Mist",
    "photo": "photos/mist.jpg"
  },
  "1063": {
    "day": "Patchy rain nearby",
    "photo": "photos/patchy_rain.jpg"
  },
  "1066": {
    "day": "Patchy snow nearby",
    "photo": "photos/snow.jpg"
  },
  "1069": {
    "day": "Patchy sleet nearby",
    "photo": "photos/snow.jpg"
  },
  "1072": {
    "day": "Patchy freezing drizzle nearby",
    "photo": "photos/snow.jpg"
  },
  "1087": {
    "day": "Thundery outbreaks in nearby",
    "photo": "photos/thunder.jpg"
  },
  "1114": {
    "day": "Blowing snow",
    "photo": "photos/snow.jpg"
  },
  "1117": {
    "day": "Blizzard",
    "photo": "photos/snow.jpg"
  },
  "1135": {
    "day": "Fog",
    "photo": "photos/fog.jpg"
  },
  "1147": {
    "day": "Freezing fog",
    "photo": "photos/fog.jpg"
  },
  "1150": {
    "day": "Patchy light drizzle",
    "photo": "photos/patchy_rain.jpg"
  },
  "1153": {
    "day": "Light drizzle",
    "photo": "photos/patchy_rain.jpg"
  },
  "1168": {
    "day": "Freezing drizzle",
    "photo": "photos/snow.jpg"
  },
  "1171": {
    "day": "Heavy freezing drizzle",
    "photo": "photos/snow.jpg"
  },
  "1180": {
    "day": "Patchy light rain",
    "photo": "photos/rain.jpg"
  },
  "1183": {
    "day": "Light rain",
    "photo": "photos/rain.jpg"
  },
  "1186": {
    "day": "Moderate rain at times",
    "photo": "photos/rain.jpg"
  },
  "1189": {
    "day": "Moderate rain",
    "photo": "photos/rain.jpg"
  },
  "1192": {
    "day": "Heavy rain at times",
    "photo": "photos/rain.jpg"
  },
  "1195": {
    "day": "Heavy rain",
    "photo": "photos/rain.jpg"
  },
  "1198": {
    "day": "Light freezing rain",
    "photo": "photos/snow.jpg"
  },
  "1201": {
    "day": "Moderate or heavy freezing rain",
    "photo": "photos/snow.jpg"
  },
  "1204": {
    "day": "Light sleet",
    "photo": "photos/snow.jpg"
  },
  "1207": {
    "day": "Moderate or heavy sleet",
    "photo": "photos/snow.jpg"
  },
  "1210": {
    "day": "Patchy light snow",
    "photo": "photos/snow.jpg"
  },
  "1213": {
    "day": "Light snow",
    "photo": "photos/snow.jpg"
  },
  "1216": {
    "day": "Patchy moderate snow",
    "photo": "photos/snow.jpg"
  },
  "1219": {
    "day": "Moderate snow",
    "photo": "photos/snow.jpg"
  },
  "1222": {
    "day": "Patchy heavy snow",
    "photo": "photos/snow.jpg"
  },
  "1225": {
    "day": "Heavy snow",
    "photo": "photos/snow.jpg"
  },
  "1237": {
    "day": "Ice pellets",
    "photo": "photos/snow.jpg"
  },
  "1240": {
    "day": "Light rain shower",
    "photo": "photos/rain.jpg"
  },
  "1243": {
    "day": "Moderate or heavy rain shower",
    "photo": "photos/rain.jpg"
  },
  "1246": {
    "day": "Torrential rain shower",
    "photo": "photos/rain.jpg"
  },
  "1249": {
    "day": "Light sleet showers",
    "photo": "photos/snow.jpg"
  },
  "1252": {
    "day": "Moderate or heavy sleet showers",
    "photo": "photos/snow.jpg"
  },
  "1255": {
    "day": "Light snow showers",
    "photo": "photos/snow.jpg"
  },
  "1258": {
    "day": "Moderate or heavy snow showers",
    "photo": "photos/snow.jpg"
  },
  "1261": {
    "day": "Light showers of ice pellets",
    "photo": "photos/snow.jpg"
  },
  "1264": {
    "day": "Moderate or heavy showers of ice pellets",
    "photo": "photos/snow.jpg"
  },
  "1273": {
    "day": "Patchy light rain in area with thunder",
    "photo": "photos/rain.jpg"
  },
  "1276": {
    "day": "Moderate or heavy rain in area with thunder",
    "photo": "photos/rain.jpg"
  },
  "1279": {
    "day": "Patchy light snow in area with thunder",
    "photo": "photos/snow.jpg"
  },
  "1282": {
    "day": "Moderate or heavy snow in area with thunder",
    "photo": "photos/snow.jpg"
  }
}
//-------------------------------------------------//
