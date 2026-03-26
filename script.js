document.addEventListener("DOMContentLoaded", () => {
  const CityInput = document.getElementById("input-city");
  const getWhetherBtn = document.getElementById("get-whether-btn");
  const Whetherinfo = document.getElementById("whether-info");
  const CityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description"); // error-message
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "41cffdf5c20d7178175dd0f828685943";
  getWhetherBtn.addEventListener("click", async () => {
    //f-1
    const city = CityInput.value.trim();
    if (!city) return;

    // server request: it may throw an error
    //  server/ database in always is  another content

    try {
      const weatherData = await fetchWeatherData(city);
      DisplayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //f-2
    // gets data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("Response", response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function DisplayWeatherData(data) {
    //f-3
    // display
    console.log(data);
    const { name, weather, main } = data;
    CityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // unclock the display
    Whetherinfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    //f-4
    Whetherinfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
