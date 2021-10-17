const tempField = document.getElementsByClassName("temperature")[0];
const descField = document.getElementsByClassName("desc")[0];
const iconField = document.getElementsByClassName("wIcon")[0].childNodes[1];
const statusField = document.getElementsByClassName("request-status")[0];

const CORS_BRIDGE_API_KEY = "98962845-3242-4056-bec2-0d078e520371";
const apiOptions = {
  headers: {
    "x-cors-grida-api-key": CORS_BRIDGE_API_KEY,
  },
};

const findId = (location) => {
  statusField.style.display = "block";
  fetch(
    //`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=${location}`
    `https://cors.bridged.cc/https://www.metaweather.com/api/location/search/?query=${location}`,
    apiOptions
  )
    .then((response) => response.json())
    .then((jsonData) => getWeather(jsonData[0].woeid))
    .catch((err) => alert("Wrong Location or Location not available"));
};

const getWeather = (id) => {
  console.log("request sent!");
  fetch(
    //`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/${id}`
    `https://cors.bridged.cc/https://www.metaweather.com/api/location/${id}`,
    apiOptions
  )
    .then((response) => response.json())
    .then((jsonData) => displayValues(jsonData.consolidated_weather[0]))
    .catch((err) => alert("Wrong Location or Location not available"));
};
const displayValues = (weatherData) => {
  statusField.style.display = "none";
  descField.innerHTML = weatherData.weather_state_name;
  iconField.src = `https://www.metaweather.com/static/img/weather/${weatherData.weather_state_abbr}.svg`;
  tempField.innerHTML = `${weatherData.the_temp.toFixed(
    1
  )} <span>&deg;C</span>`;
};

const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", () => {
  const inputValue = document.getElementsByClassName("locationInput")[0].value;
  findId(inputValue);
});
