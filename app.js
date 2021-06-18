// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//event listener function on keypress
const weatherAPi = {
  key: "47c30ef54866bdae88e940488f5ee713",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInput = document.getElementById("input_box");
searchInput.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    // console.log(event.target.value);
    getWeatherReport(event.target.value);
    document.querySelector(".weather_body").style.display = "block";
  }
});

//get weather report
function getWeatherReport(city) {
  fetch(`${weatherAPi.baseUrl}?q=${city}&appid=${weatherAPi.key}&units=metric`)
    .then((data) => {
      data
        .json()
        .then((weatherData) => {
          showWeatherReport(weatherData);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
//show weather report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById("city");
  let temp = document.getElementById("temp");
  let min_max = document.getElementById("min_max");
  let weather_status = document.getElementById("weather_status");

  city.innerText = `${weather.name}, ${weather.sys.country}`;
  temp.innerHTML = `${Math.floor(weather.main.temp)}&deg;C`;
  min_max.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (Min) / ${Math.floor(weather.main.temp_max)}&deg;C (Max)`;
  weather_status.innerHTML = `${weather.weather[0].main}`;

  const getCurrentDayTime = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentTime = new Date();
    let dayName = weekday[currentTime.getDay()];
    let month = monthNames[currentTime.getMonth()];
    let date = currentTime.getDate();
    let year = currentTime.getFullYear();

    let currentDate = document.getElementById("date");

    currentDate.innerHTML = ` ${date} ${month} ${dayName} ${year}`;
  };
  getCurrentDayTime();
}
