const apiKey = '7ac0e3b4ae48403b80c133716240709'; 
let city = document.getElementById("txt");
let btn = document.getElementById("button-addon");


function fetchCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      let URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
      
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          updateFirstPageWeather(data);
        })
        .catch(() => {
          alert('Failed to fetch weather data for current location');
        });
    }, () => {
      alert('Unable to retrieve your location');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Function to update the first page with current weather data
function updateFirstPageWeather(data) {
  const location = data.location;
  const current = data.current;

  // Set country, date, and time
  document.getElementById("countryName").innerText = location.country;
  document.getElementById("countryDate").innerText = `${location.localtime}`; // Date and time

  // Set temperature, humidity, and wind speed
  document.getElementById("countryTemp").innerText = `${current.temp_c}°C`;
  document.getElementById("countryWind").innerText = `${current.wind_kph} km/h`;
  document.getElementById("countryHum").innerText = `${current.humidity}%`;
}


fetchCurrentLocationWeather();




function btnCity() {
  let cityName = city.value.trim();
  console.log(cityName);
  city.value = "";

  const section = document.getElementById("second");
  section.scrollIntoView({ behavior: 'smooth' });

  let URL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateHourlyForecast(data);
      updateCurrentWeather(data);
      weekWeatherDetails(data);
    })
    .catch(() => {
      alert(`Failed to fetch weather data for ${cityName}`);
    });
}

function weekWeatherDetails(data) {
  let tblWeek = document.getElementById("tblWeekReport");

  tblWeek.innerHTML = ""; 
  let forecastDays = data.forecast.forecastday;

  let tblWeekBody = ""; 
  forecastDays.forEach((dayData, index) => {
    let dayName = new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'long' }); // Get day name
    let icon = dayData.day.condition.icon; 
    let avgTemp = dayData.day.avgtemp_c;
    let windSpeed = dayData.day.maxwind_kph;
    tblWeekBody += `
      <td>
        <p class="text-center" id="week${index + 1}">${dayName}</p>
        <img width="64" height="64" src="${icon}" alt="weather-icon" />
        <h4 class="text-center">${avgTemp}°C</h4>
        <h6 class="text-center">${windSpeed} km/h</h6>
      </td>
    `;
  });

  // tblWeekBody += "</tr>";
  tblWeek.innerHTML = tblWeekBody; 
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





function subscribe(){
  
  let city = document.getElementById("city");
  let email =  document.getElementById("email");
    
  city.value = "";
  email.value = "";
}