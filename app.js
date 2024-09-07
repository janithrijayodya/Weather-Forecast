const apiKey = '7ac0e3b4ae48403b80c133716240709';
let city = document.getElementById("txt");
let btn = document.getElementById("button-addon");

function btnCity(){
  let cityName = city.value.trim();
  // console.log(cityName);
  city.value = "";

  let URL= `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}`;

  fetch(URL).then(res => res.json())
  .then(data =>{
    // console.log(data);
    // let {name,country,state} = data[0];
    getWeatherDetails(data);

  }).catch(()=>{
    alert(`Faild to fetch coordinates of ${cityName}`)
  });
}



function getWeatherDetails(data){
    const location = data.location;

    document.getElementById("secondPageLocation").innerText = location.name;

    const current = data.current;

    document.getElementById("todayTemp").innerText = `${current.temp_c}°C`;
    document.getElementById("todayWind").innerText = `${current.wind_kph}km/h`;
    document.getElementById("todayHum").innerText = `${current.humidity}%`;
    document.getElementById("todayDesc").innerText = `${current.condition.text}`;
    document.getElementById("image").src = `${current.condition.icon}`;


    let tblHourly = document.getElementById("tblHourReport");

    data.forecast.forecastday[0].hour.forEach( hour =>{
      tblHourly +=`<td>
                      <img class="" width="64" height="64" src="${hour.condition.icon}" alt="bright-moon"/>
                      <h6 class="text-center">${hour.time}</h6>
                      <p class="text-center" id="00Time">${hour.temp_c}°C</p>
                  </td>`
      
    })
}