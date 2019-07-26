const apiKey = 'cdb3747d118e740b97f925964f2b5efe';

async function getWeather() {
 const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/cdb3747d118e740b97f925964f2b5efe/54.194,16.171`
 const response = await fetch(url);
 const data =  await response.json();
 const { latitude, longitude } = data;
console.log(latitude, longitude)
 return { latitude, longitude };
}




getWeather();

