// https://locationiq.com/docs

const apiKey = 'cdb3747d118e740b97f925964f2b5efe';
const locationKey = '116c426fcd7312';
const btn = document.querySelector('.btn');

async function getCurrentWeather() {
  const cords = await getLocation();
  const lat = cords[0];
  const lon = cords[1];
  printLocation();
  const cityName = cords[2];
  // console.log(cityName);
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cdb3747d118e740b97f925964f2b5efe/${lat},${lon}?units=auto`
  const response = await fetch(url);
  const data =  await response.json();
  const { currently } = data;
  // console.log(currently)
  return { currently };
}

// getWeather();


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

// getLocation();


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
  console.log(data.currently);
  const celcius = '\&#8451;'
  //santize html?
  document.querySelector('.temperature').innerHTML = `<p>${data.currently.temperature.toFixed(0)}${celcius}</p>`
  document.querySelector('.icon')
}



btn.addEventListener('click', showWeather, false);

