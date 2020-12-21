function formatDay (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature (response){
    console.log(response);
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

}
let city = "Caracas"
let apiKey = "57c364089b821cdc467408c870253e67";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayTemperature);