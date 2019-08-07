if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('dziala')
  });
} else {
  console.log('nie dziala')
}

function renderInitMessage() {
  const message = `This are weather conditions from your position.`;
  const cityElement = document.querySelector('.city');
  cityElement.textContent = message;
}


async function geoSuccess(position) {
  const { latitude:lat, longitude:lon } = position.coords;
  
  const data = await getInitWeather(lat, lon);
  renderInitMessage();
  showInitWeather(data);
}

function geoError(errorObj) {
  let errorMessage = '';

  switch(errorObj.code) {
    case errorObj.PERMISSION_DENIED :
      errorMessage = 'Brak pozwolenia na znalezienie lokalicazji';
      break;
    case errorObj.POSITION.UNAVAILABLE :
    errorMessage = 'Brak dostepu do sieci';
    break;

    case errorObj.TIMEOUT :
      errorMessage = 'Przekroczono czas oczekiwania';
      break;
  }
};



async function getInitWeather(lat, lon) {
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lon}?units=si`;
  const response = await fetch(url);
  const data =  await response.json();
  
  return data;
};


async function showInitWeather(weatherData) {
  
  const hourlyWeather = weatherData.hourly.data; //?
  const dailyWeather = weatherData.daily.data; // ?
  const nextSevenHoursWeather = await nextHours(hourlyWeather);

  renderTempIntoHTML(nextSevenHoursWeather);
  renderTimeIntoHTML(nextSevenHoursWeather);
  renderDailyMaxTemp(dailyWeather);
  renderDailyMinTemp(dailyWeather);
  renderDayOfWeek(dailyWeather);
  renderDayOfMonth(dailyWeather);
  renderHourlyIconIntoHTML(hourlyWeather);
  renderDailyIconIntoHTML(dailyWeather);
};




window.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}, false);
