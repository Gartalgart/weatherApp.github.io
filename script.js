const API_KEY = '5986d27d50ff4de8a36163004242511'; 
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');

async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&lang=fr`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherInfo(data);
        } else {
            alert(data.error.message);
        }
    } catch (error) {
        alert('Erreur lors de la récupération des données météo.');
        console.error(error);
    }
}

function updateWeatherInfo(data) {
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `Température : ${data.current.temp_c} °C`;
    condition.textContent = `Condition : ${data.current.condition.text}`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Veuillez entrer une ville.');
    }
});

