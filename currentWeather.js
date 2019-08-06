// https://locationiq.com/docs

const apiKey = 'cdb3747d118e740b97f925964f2b5efe';
const locationKey = '116c426fcd7312';
const btn = document.querySelector('.btn');
const celcius = '\&#8451;'

async function getCurrentWeather() {
  const cords = await getLocation();
 
  const [ lat, lon ] = cords;
  printLocation();
 
  
  //2019-08-02T21:20:32
  
  const str = await getCurrentTime(leadingZero);
  
  
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lon}?units=si`
  // const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lon},${str}?exclude=minutely,alerts&units=si`;
  const response = await fetch(url);
  const data =  await response.json();
  // console.log(data)
  
  return data;
}

/**
 * 
 * @param {leadingZeros function} fn 
 * @return current time in format YYYY-MM-DDTHH:MM:SS
 */

function getCurrentTime(fn) {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours();
  const minuts = time.getMinutes() + 1;
  const seconds = time.getSeconds() + 1;

  return `${year}-${fn(time.getMonth()+ 1)}-${fn(time.getDate())}T${fn(hours)}:${fn(minuts)}:${fn(seconds)}`
};

//get zero if need
function leadingZero(i) {

  return (i < 10)? '0'+i : i;
}
// // getWeather();


async function getLocation() {
  let arr = [];
  const city = await getCity();
  const response = await fetch(`https://cors-anywhere.herokuapp.com/https://us1.locationiq.com/v1/search.php?key=116c426fcd7312&city=${city}&format=json`);
  const position = await response.json()
  const latitude = position[0].lat;
  const longitude = position[0].lon;
  const cityName = position[0].display_name;
  
  arr[0] = latitude;
  arr[1] = longitude;
  arr[2] = cityName;
  return arr;
 
};

// // getLocation();


 function getCity() {
  const inputValue = document.getElementById('city').value;
  return inputValue;
};

async function printLocation() {
  const data = await getLocation();

  const cityToPrint = document.querySelector('.city');

  cityToPrint.textContent = data[2];

}

/**
 * @return hour
 */

function checkHour() {
  const time = new Date();
  const hour = time.getHours();
  
}

/**
 * 
 * @param {Obj with weather data} arr 
 * @return weather data with next seven hours
 */
async function nextHours(arr) {
  let indexStart = await checkHour();
  let indexEnd = (indexStart + 7) % 49;

  if(indexStart <= indexEnd)
	  return arr.slice(indexStart, indexEnd);
  else
	  return arr.slice(indexStart, arr.length).concat(arr.slice(0,indexEnd));
}

//returnTime

function returnWeatherData(data) {
  return `${data}`;
};

function returnWeatherTemp(data, celcius) {
  return `${data}${celcius}`;
};


/**
 * 
 * @param {milliseconds from Date Obj} ms 
 */

 //? Jedna funckja do konwersji czasu, czy...
function convertToHour(ms) {
  const date = new Date(ms*1000);
// Hours part from the timestamp
  const hours = date.getHours();
  
  return hours;
}

function convertToDays(ms) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const date = new Date(ms * 1000);
  const day = date.getDay();
  return daysOfWeek[day];
}

function convertToDaysOfMonth(ms) {
  const date = new Date(ms * 1000);
  const daysOfMonth = date.getDate();

  return daysOfMonth
}

function renderTimeIntoHTML(weatherData) {
  const timeSpanElements = Array.from(document.querySelectorAll('.hour-box-time'));
  timeSpanElements.forEach((span, index) => {
    span.textContent = returnWeatherData(convertToHour(weatherData[index].time));
  });
};
    

function renderTempIntoHTML(weatherData) {
  const temperatureSpanElements = Array.from(document.querySelectorAll('.hour-box-temp'));
  temperatureSpanElements.forEach((span, index) => {
    span.innerHTML = returnWeatherTemp(weatherData[index].temperature.toFixed(0), celcius);
  });
};

/**
 * Render MAX TEMP
 */

 function renderDailyMaxTemp(weatherData) {
  
  const maxtempSpan = document.querySelectorAll('.max-temp');
  maxtempSpan.forEach((max, index) => {
    max.innerHTML = returnWeatherTemp(weatherData[index].temperatureHigh.toFixed(0),celcius);
  });
 };

 /**
  * Render MIn TEMP
  */

 function renderDailyMinTemp(weatherData) {
  const mintempSpan = document.querySelectorAll('.min-temp');
  mintempSpan.forEach((min, index) => {
    min.innerHTML = returnWeatherTemp(weatherData[index].temperatureLow.toFixed(0),celcius);
  });
 };

 /**
  * Render days
  */

 function renderDayOfWeek(weatherData) {
  const dayOfWeekSpan = document.querySelectorAll('.day-of-week');
  dayOfWeekSpan.forEach((day, index) => {
    day.textContent = convertToDaysOfMonth(weatherData[index].time);
  });
 };

 /**
  * Render days of month
  */

 function renderDayOfMonth(weatherData) {
  const dayOfMonthSpan = document.querySelectorAll('.date');
  dayOfMonthSpan.forEach((date, index) => {
    date.textContent = convertToDays(weatherData[index].time);
  });
 };


async function showWeather() {
  const response = await getCurrentWeather();
  const hourlyWeather = response.hourly.data; //?
  console.log(response);
  const dailyWeather = response.daily.data; // ?
  const nextSevenHoursWeather = await nextHours(hourlyWeather);
  // console.log(nextSevenHoursWeather)
  
  
  renderTempIntoHTML(nextSevenHoursWeather);
  renderTimeIntoHTML(nextSevenHoursWeather);
  renderDailyMaxTemp(dailyWeather);
  renderDailyMinTemp(dailyWeather);
  renderDayOfWeek(dailyWeather);
  renderDayOfMonth(dailyWeather);
    
//Days condition


  
  // console.log(one,two);
  const celcius = '\&#8451;'
  //santize html?
  document.querySelector('.temperature').innerHTML = `<p>${response.currently.temperature.toFixed(0)}${celcius}</p>`
  // document.querySelector('.icon')
  // document.querySelector('.hour-box-temp').innerHTML = `<p>${response.hourly.data[0].temperature.toFixed(0)}${celcius}</p>`;

}



// LISTENERS

btn.addEventListener('click', showWeather, false);
