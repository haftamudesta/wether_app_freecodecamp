const selectEl = document.getElementById('city-select');
const getWeatherBtn = document.getElementById('get-weather-btn');

const weatherIcon = document.getElementById('weather-icon');
const mainTempEl = document.getElementById('main-temperature');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const windGustEl = document.getElementById('wind-gust');
const weatherMainEl = document.getElementById('weather-main');
const locationEl = document.getElementById('location');

const setTextContent = (el, value) => {
  if (el) {
    el.textContent = (value === undefined || value === null) ? 'N/A' : value;
  }
};
const setIcon = (url) => {
  if (weatherIcon) {
    if (url && typeof url === 'string' && url.startsWith('http')) {
      weatherIcon.src = url;
    } else {
      weatherIcon.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%234f6f9f\' opacity=\'0.5\'/%3E%3Ctext x=\'18\' y=\'70\' fill=\'%23ffffff\' font-size=\'48\'%3E☁️%3C/text%3E%3C/svg%3E';
    }
  }
};
async function getWeather(city) {
  try {
    const encodedCity = encodeURIComponent(city.trim().toLowerCase());
    const url = `https://weather-proxy.freecodecamp.rocks/api/city/${encodedCity}`;
    const response = await fetch(url);

    if (!response.ok) { 
      console.log(error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function showWeather(city) {
  try {
    const weatherData = await getWeather(city);
    if (!weatherData) {
      throw new Error('Weather data is undefined');
    }

    const iconUrl = weatherData.weather?.[0]?.icon;
    const mainTemp = weatherData.main?.temp;
    const feelsLike = weatherData.main?.feels_like;
    const humidity = weatherData.main?.humidity;
    const windSpeed = weatherData.wind?.speed;
    const windGust = weatherData.wind?.gust;
    const mainWeather = weatherData.weather?.[0]?.main;
    const locationName = weatherData.name;

    setIcon(iconUrl);
    setTextContent(mainTempEl, mainTemp);
    setTextContent(feelsLikeEl, feelsLike);
    setTextContent(humidityEl, humidity);
    setTextContent(windEl, windSpeed);
    setTextContent(windGustEl, windGust);
    setTextContent(weatherMainEl, mainWeather);
    setTextContent(locationEl, locationName ? `📍 ${locationName}` : 'N/A');

  } catch (error) {
    alert('Something went wrong, please try again later.');
    
    setIcon();
    setTextContent(mainTempEl, undefined);
    setTextContent(feelsLikeEl, undefined);
    setTextContent(humidityEl, undefined);
    setTextContent(windEl, undefined);
    setTextContent(windGustEl, undefined);
    setTextContent(weatherMainEl, undefined);
    setTextContent(locationEl, undefined);
  }
}

getWeatherBtn.addEventListener('click', () => {
  const selectedValue = selectEl.value;

  if (!selectedValue || selectedValue.trim() === '') {
    return;
  }

  showWeather(selectedValue);
});

window.addEventListener('load', () => {
  setIcon(); 
  setTextContent(mainTempEl, undefined);
  setTextContent(feelsLikeEl, undefined);
  setTextContent(humidityEl, undefined);
  setTextContent(windEl, undefined);
  setTextContent(windGustEl, undefined);
  setTextContent(weatherMainEl, undefined);
  setTextContent(locationEl, undefined);
});

window.getWeather = getWeather;
window.showWeather = showWeather;