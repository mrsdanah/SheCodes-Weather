// Date & Time
let now = new Date();

// Current Date

let date = now.getDate();

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
  "December",
];
let month = months[now.getMonth()];

let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

function formatDate() {
  return `${day}, ${month} ${date}`;
  console.log(now.getDate());
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = formatDate();

// Current Time

let hour = now.getHours();
let minutes = now.getMinutes();

function formatTime() {
  return `${hour}:${minutes}`;
}

function formatOtherTime() {
  return `${hour}:0${minutes}`;
}

let currentTime = document.querySelector(".time");

if (minutes < 10) {
  currentTime.innerHTML = formatOtherTime();
} else {
  currentTime.innerHTML = formatTime();
}

// Location Search

let apiKey = "2f8b68a6537c0c66560a05003759942d";

function defaultSearch() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function searchLocale(event) {
  event.preventDefault();
  let location = document.querySelector("#location");
  let city = `${location.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  let mainIcon = document.querySelector(".main-icon");
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].main;
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;
  let highTemp = document.querySelector(".max-temp");
  highTemp.innerHTML = Math.round(response.data.main.temp_max);
  let lowTemp = document.querySelector(".min-temp");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);

  getForecast(response.data.coord);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myPosition);
}

function myPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#location-search");
form.addEventListener("submit", searchLocale);

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", findPosition);

defaultSearch();

// Five Day //

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let fiveDay = document.querySelector(".five-day");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class='row'>
    <div class="col-3 days">
              <p>${formatDay(forecastDay.dt)}</p>
            </div>
            <div class="col-4 temps">
              <p>
                <strong>${Math.round(
                  forecastDay.temp.max
                )}°</strong> / ${Math.round(forecastDay.temp.min)}°
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" />
              </p>
            </div>
            <div class="col-2 dew-point">
              <p><i class="fa-solid fa-droplet"></i> ${Math.round(
                forecastDay.dew_point
              )}%</p>
            </div>
            <div class="col-3 wind">
              <p><i class="fa-solid fa-wind"></i> ${Math.round(
                forecastDay.wind_speed
              )} MPH</p>
            </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  fiveDay.innerHTML = forecastHTML;
}

showForecast();
