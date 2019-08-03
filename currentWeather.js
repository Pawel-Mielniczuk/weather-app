// https://locationiq.com/docs

const apiKey = 'cdb3747d118e740b97f925964f2b5efe';
const locationKey = '116c426fcd7312';
const btn = document.querySelector('.btn');

async function getCurrentWeather() {
  const cords = await getLocation();
  console.log(cords)
  // const lat = cords[0];
  // const lon = cords[1];
  const [ lat, lon ] = cords;
  printLocation();
  // const cityName = cords[2];
  
  //2019-08-02T21:20:32
  
  const str = await getCurrentTime(leadingZero);
  console.log(str)
  
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lon},${str}?exclude=minutely,alerts&units=si`;
  const response = await fetch(url);
  const data =  await response.json();
  console.log(data)
  
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
  const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=116c426fcd7312&city=${city}&format=json`);
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

async function showWeather() {
  const data = await getCurrentWeather();
  // console.log(data.currently);
  const celcius = '\&#8451;'
  //santize html?
  document.querySelector('.temperature').innerHTML = `<p>${data.currently.temperature.toFixed(0)}${celcius}</p>`
  // document.querySelector('.icon')
  document.querySelector('.hour-box-1').innerHTML = `<p>${data.hourly.data[0].temperature.toFixed(0)}${celcius}`;

}



// LISTENERS

btn.addEventListener('click', showWeather, false);

