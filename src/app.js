function formatDay (timestamp) {
  let date = new Date(timestamp);
  
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  let day = days[date.getDay()];
  return `Last updated: ${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature (response){  
    let currentTemp = document.querySelector("#temp-now");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
    let currentDescription = document.querySelector("#description");
    currentDescription.innerHTML = response.data.weather[0].description;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let currentWindSpeed = document.querySelector("#wind-speed");
    currentWindSpeed.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} Km/h`;
    let currentCity = document.querySelector("#city-now");
    currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    let currentDayTime = document.querySelector("#day-time");
    currentDayTime.innerHTML = formatDay(response.data.dt * 1000);
    let currentIcon = document.querySelector("#icon");
    currentIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentIcon.setAttribute("alt",`${response.data.weather[0].description}`);
    celsiusTemp = response.data.main.temp;
}
function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    for (let index = 0; index < 6; index++) {
    forecast =response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                ${formatHours(forecast.dt * 1000)}
                </h5>
                <p class="card-text">
                    <div class="weather-icon">
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" width="50" >
                    </div>
                    <div>
                        <ul>
                            <li>
                             ${Math.round(forecast.main.temp_max)}°
                            </li>
                            <li>
                            ${Math.round(forecast.main.temp_min)}°
                            </li>
                         </ul>    
                    </div>
                </p>
            </div>
        </div>
    </div>`    
    }
    }

function search(city){
    let apiKey = "57c364089b821cdc467408c870253e67";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayTemperature);

    apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayForecast)
}

function handelSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function displayFtemp (event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temp-now");
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
    currentTemp.innerHTML = Math.round(farenheitTemp);
}

function displayCtemp (event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temp-now");
    celsiusLink.classList.add("active");
    farenheitLink.classList.remove("active");
    currentTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null

let form = document.querySelector("#search-city");
form.addEventListener("submit", handelSubmit);

let farenheitLink = document.querySelector ("#farenheit-link");
farenheitLink.addEventListener("click", displayFtemp);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", displayCtemp);

search("Caracas");

