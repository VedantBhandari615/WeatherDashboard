const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '6eb55518c6c4fd127835a84f89a89555'; 
$(document).ready(function () {
});

async function weatherFn(cName) {
    if (!cName.trim()) {
        alert('Please enter a city, town, or village.');
        return;
    }
    const encodedCityName = encodeURIComponent(cName.trim());
    const temp = `${url}?q=${encodedCityName},IN&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}
function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $('#weather-info').fadeIn();
}
