const tempField = document.getElementsByClassName("temperature")[0];
const descField = document.getElementsByClassName("desc")[0];
const iconField = document.getElementsByClassName("wIcon")[0].childNodes[1];
const info = document.getElementsByClassName("info")[0];

const findId = (location) => {
  fetch(
    //`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=${location}`
    `https://cors.bridged.cc/https://www.metaweather.com/api/location/search/?query=${location}`
  )
    .then((response) => response.json())
    .then((jsonData) => getWeather(jsonData[0].woeid))
    .catch((err) => alert("Wrong Location or Location not available"));
};

const getWeather = (id) => {
  fetch(
    //`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/${id}`
    `https://cors.bridged.cc/https://www.metaweather.com/api/location/${id}`
  )
    .then((response) => response.json())
    .then((jsonData) => displayValues(jsonData.consolidated_weather[0]))
    .catch((err) => alert("Wrong Location or Location not available"));
};
const displayValues = (weatherData) => {
  console.log(weatherData);
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
