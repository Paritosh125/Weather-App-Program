

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apikey = "ac1423d935088f37cc6e13b342217c29";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
    // console.log(response);
}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent = `Humidity:${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
            break;
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
            break;
        case (weatherId >= 500 && weatherId < 600):
            return "🌨";
            break;
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
            break;
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
            break;
        case (weatherId == 800):
            return "☀";
            break;
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
            break;
        default:
            return "❓";
            break;
    }
}
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}