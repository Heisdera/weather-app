const date = document.querySelector('.date');
const time = document.querySelector('.time');
const form = document.querySelector('form');
const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.btn');
const weatherDetails = document.querySelector('.weather-details');
const weatherImage = document.querySelector('.weather img');
const temperature = document.querySelector('.weather h1');
const cityName = document.querySelector('.weather h2');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.speed');
const errText = document.querySelector('.error');

function getDate() {
  const today = new Date();
  const date = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  });
  const todayDate = date.format(today);

  return todayDate;
}
date.innerHTML = getDate();

function getTime() {
  const today = new Date();
  const time = new Intl.DateTimeFormat('en-us', {
    timeStyle: 'medium',
  });
  const currentTime = time.format(today);

  return currentTime;
}
setInterval(() => {
  time.innerHTML = getTime();
});

const apiKey = '5856f7ed9e4325955b6098ffdd9d432e';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);

  if (response.status == 404) {
    errText.style.display = 'block';
    weatherDetails.style.display = 'none';

    setTimeout(() => {
      errText.style.display = 'none';
    }, 2000);
  } else {
    weatherDetails.style.display = 'block';

    const weather = data.weather[0];
    if (weather.icon === '01d') {
      weatherImage.src = './images/sun.png';
    }

    if (weather.icon === '01n') {
      weatherImage.src = './images/moon.png';
    }

    if (weather.icon === '02d') {
      weatherImage.src = './images/day-few-clouds.png';
    }

    if (weather.icon === '02n') {
      weatherImage.src = './images/night-few-clouds.png';
    }

    if (weather.icon === '03d' || weather.icon === '03n') {
      weatherImage.src = './images/scattered-clouds.png';
    }

    if (weather.icon === '04d' || weather.icon === '04n') {
      weatherImage.src = './images/broken-clouds.png';
    }

    if (weather.icon === '09d' || weather.icon === '09n') {
      weatherImage.src = './images/shower-rain.png';
    }

    if (weather.icon === '10d') {
      weatherImage.src = './images/day-rain.png';
    }

    if (weather.icon === '10n') {
      weatherImage.src = './images/night-rain.png';
    }

    if (weather.icon === '11d' || weather.icon === '11n') {
      weatherImage.src = './images/thunderstorm.png';
    }

    if (weather.icon === '13d' || weather.icon === '13n') {
      weatherImage.src = './images/snow.png';
    }

    if (weather.icon === '50d' || weather.icon === '50n') {
      weatherImage.src = './images/mist.png';
    }

    temperature.textContent = data.main.temp + '°C';
    cityName.textContent = data.name;
    humidity.textContent = data.main.humidity + '%';
    windSpeed.textContent = data.wind.speed + 'km/h';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkWeather(searchInput.value.trim());
});
