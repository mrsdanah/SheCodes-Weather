function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="card week week1">
                <div class="card-body card-forecast">
                  <p class="day-week" id="day">Dec 23, ${formatDay(
                    forecastDay.dt
                  )}</p>
                  <div class="temp-week" id="temp">${Math.round(
                    forecastDay.temp.day
                  )}°</div>
                  <div class="emoji-week" id="emoji">  
                    <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt=""
                        width="50"
                      />           
                  </div>
                </div>
              </div>
            </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = `2f8b68a6537c0c66560a05003759942d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
  let tempDisplayed = document.querySelector(".main-temp");
  let cityDisplayed = document.querySelector("h2");
  let weatherDisc = document.querySelector(".weather-disc");
  let feelsLikeDisplayed = document.querySelector("#feels-like-temp");
  let humidityDisplayed = document.querySelector("#humidity");
  let windDisplayed = document.querySelector("#wind-speed");
  let timeDisplayed = document.querySelector(".time-main");
  let emojiDisplayed = document.querySelector("#emoji-main");

  celTempData = Math.round(response.data.main.temp);

  tempDisplayed.innerHTML = celTempData;
  cityDisplayed.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  weatherDisc.innerHTML = response.data.weather[0].description;
  feelsLikeDisplayed.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  humidityDisplayed.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  windDisplayed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  timeDisplayed.innerHTML = formatDate(response.data.dt * 1000);
  emojiDisplayed.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiDisplayed.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
  console.log(response);
}
function search(city) {
  let apiKey = "2f8b68a6537c0c66560a05003759942d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}
function sumbitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");
  search(cityInput.value);
}

function degreeFar(event) {
  event.preventDefault();
  let tempDisplayed = document.querySelector(".main-temp");
  let farTempFormula = (celTempData * 9) / 5 + 32;
  tempDisplayed.innerHTML = Math.round(farTempFormula);
}
function degreeCel(event) {
  event.preventDefault();
  let tempDisplayed = document.querySelector(".main-temp");
  tempDisplayed.innerHTML = Math.round(celTempData);
}

function currentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `2f8b68a6537c0c66560a05003759942d`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemperature);
}

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", sumbitCity);

let inputForm = document.querySelector("#enter-city-form");
inputForm.addEventListener("submit", sumbitCity);

let celTempData = null;
let degreeC = document.querySelector("#C");
let degreeF = document.querySelector("#F");
degreeC.addEventListener("click", degreeCel);
degreeF.addEventListener("click", degreeFar);

let currentLocBtn = document.querySelector("#current-loc-btn");
currentLocBtn.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
});
search("Philadelphia");
