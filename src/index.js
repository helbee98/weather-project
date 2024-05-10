function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity")
    let windSpeedElement = document.querySelector("#wind-speed")
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    console.log(response.data.condition.description);

    cityElement.innerHTML = response.data.city;

    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`
}

function formatDate(date)  {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["sunday", "monday", "tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`
}

function searchCity(city) {
    let apiKey = "f0t31ebf10a05340167073caaaa44dbo";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);


searchCity("paris");
