const apiKey = '7ac0e3b4ae48403b80c133716240709'; 
let city = document.getElementById("txt");
let btn = document.getElementById("button-addon");

function btnCity() {
  let cityName = city.value.trim();
  console.log(cityName);
  city.value = "";

  let URL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=1`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateHourlyForecast(data);
      updateCurrentWeather(data);
      
    })
    .catch(() => {
      alert(`Failed to fetch weather data for ${cityName}`);
    });
}

function updateHourlyForecast(data) {
  let tbl = document.getElementById("tblHourReport");

  tbl.innerHTML = "";

  let hours = data.forecast.forecastday[0].hour;

  let tblBody = "";
  hours.forEach((hourData) => {
    let time = hourData.time.split(" ")[1]; 
    let temp = hourData.temp_c;
    let icon = hourData.condition.icon;

    tblBody += `
      
        <td>
          <img src="${icon}" alt="weather-icon" width="64" height="64" />
          <h6 class="text-center">${time}</h6>
          <p class="text-center">${temp}°C</p>
        </td>
      
    `;
  });

  tbl.innerHTML = tblBody;
}

function updateCurrentWeather(data) {
  const location = data.location;
  document.getElementById("secondPageLocation").innerText = location.name;

  const current = data.current;
  document.getElementById("todayTemp").innerText = `${current.temp_c}°C`;
  document.getElementById("todayWind").innerText = `${current.wind_kph} km/h`;
  document.getElementById("todayHum").innerText = `${current.humidity}%`;
  document.getElementById("todayDesc").innerText = `${current.condition.text}`;
  document.getElementById("image").src = `${current.condition.icon}`;
}
