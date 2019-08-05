// https://locationiq.com/docs

const apiKey = 'cdb3747d118e740b97f925964f2b5efe';
const locationKey = '116c426fcd7312';
const btn = document.querySelector('.btn');

async function getCurrentWeather() {
  const cords = await getLocation();
  // console.log(cords)
  // const lat = cords[0];
  // const lon = cords[1];
  const [ lat, lon ] = cords;
  printLocation();
  // const cityName = cords[2];
  
  //2019-08-02T21:20:32
  
  const str = await getCurrentTime(leadingZero);
  // console.log(str)
  
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
  
  return hour;
}

async function nextHours(arr) {
  let indexStart = await checkHour();
  let indexEnd = (indexStart + 7) % 49;

  if(indexStart <= indexEnd)
	  return arr.slice(indexStart, indexEnd);
  else
	  return arr.slice(indexStart, arr.length).concat(arr.slice(0,indexEnd));
}

//returnTemp

function returnWeatherData(data) {
  return `${data}`;
};

function renderTimeIntoHTML(weatherData) {
  // const time = new Date();
  const timeSpanElements = Array.from(document.querySelectorAll('.hour-box-time'));
  timeSpanElements.forEach((span, index) => {
    span.textContent = returnWeatherData(weatherData[index].time);
  });
};

function renderTempIntoHTML(weatherData) {
  const temperatureSpanElements = Array.from(document.querySelectorAll('.hour-box-temp'));
  temperatureSpanElements.forEach((span, index) => {
    span.textContent = returnWeatherData(weatherData[index].temperature);
  });
};



async function showWeather() {
  // const divs = Array.from(document.querySelectorAll('.hour-box'));
  const response = await getCurrentWeather();
  // console.log(response)
  const hourlyWeather = response.hourly.data; // data from api
  
  const nextSevenHoursWeather = await nextHours(hourlyWeather);
  console.log(nextSevenHoursWeather)
  

 renderTempIntoHTML(nextSevenHoursWeather);
 renderTimeIntoHTML(nextSevenHoursWeather);
 
    

    
  // console.log(test)
  // const currentHour = await checkHour();
  // console.log();

  
  
  
  
  
  // console.log(one,two);
  const celcius = '\&#8451;'
  //santize html?
  document.querySelector('.temperature').innerHTML = `<p>${response.currently.temperature.toFixed(0)}${celcius}</p>`
  // document.querySelector('.icon')
  // document.querySelector('.hour-box-temp').innerHTML = `<p>${response.hourly.data[0].temperature.toFixed(0)}${celcius}</p>`;

}



// LISTENERS

btn.addEventListener('click', showWeather, false);
