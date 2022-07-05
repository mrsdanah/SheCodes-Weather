//Display weather description//
function displayWeatherCondition(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// Search city //
function searchCity(city) {
  let apiKey = `6a0b4c54d0ac0f8372ec53375213a3c8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `6a0b4c54d0ac0f8372ec53375213a3c8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Change Celsius temperature current location//
function convertToCelsius(response) {
  let temperature = Math.round(response.data.main.temp);
  let heading = document.querySelector("#main-temperature");
  heading.innerHTML = `${temperature}`;
}

function retrievePosition(position) {
  console.log(position.coords.latitude);
  ("");
  let apiKey = `6a0b4c54d0ac0f8372ec53375213a3c8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(convertToCelsius);
}

//change temperature//
function convertToFahren(event) {
  event.preventDefault();
  let fahrenTemperature = document.querySelector("#main-temperature");
  let fahrenTemperatureConvert = Math.round((19 * 9) / 5 + 32);
  fahrenTemperature.innerHTML = `${fahrenTemperatureConvert}`;
}

navigator.geolocation.getCurrentPosition(retrievePosition);

//let time//
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
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

// querySelector time //

let time = document.querySelector(".time");
time.innerHTML = `${hour}:${minute}`;

//querySelector day of week//

let dayOfWeek = document.querySelector(".dayOfWeek");
dayOfWeek.innerHTML = `${day}`;

// querySelector city //

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
