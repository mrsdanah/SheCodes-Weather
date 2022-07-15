//get current date
function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();
  return `Today is ${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;
}
let now = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(now);
console.log(dateElement);

//add city name
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("h2");
  let cityInput = document.querySelector("#input-text");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "8799882eec11a6cae9364a17c61e256e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-text-input");
searchForm.addEventListener("submit", search);

//convert degrees
function convertToFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let cityInput = document.querySelector("#input-text");
searchCity(cityInput.value);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
       <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      
       <img
        src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°
                  </span>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°
                  </span>
        </div>
      </div> 
    
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2f8b68a6537c0c66560a05003759942d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let degreeElement = document.querySelector("#degrees");
  degreeElement.innerHTML = temperature;
  let city = response.data.name;
  let message = `${city}`;
  let iconElement = document.querySelector("#icon-1");
  let h2 = document.querySelector("h2");
  h2.innerHTML = message;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#atmosphere");
  description.innerHTML = response.data.weather[0].description;
  getForecast(response.data.coord);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2f8b68a6537c0c66560a05003759942d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function retrievePosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getPosition);
}

let buttonClick = document.querySelector("button");
buttonClick.addEventListener("click", retrievePosition);

let celsiusTemperature = null;

