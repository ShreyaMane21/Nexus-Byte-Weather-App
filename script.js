document;
let inputBox = document.querySelector(".search");
let searchIcon = document.querySelector(".searchIcon");
let topInput = document.querySelector(".top");
let lowInput = document.querySelector(".low");
let windText = document.getElementById("leftText");
let humidityText = document.getElementById("rightText");
let weatherIcon = document.querySelector(".icon-top");

async function holds() {
  let gets = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&appid=91f0cf04214630a40bcbd5bd14354f15&units=metric`
  );

  let result = await gets.json();
  console.log(result);

  if (
    result.message === "Nothing to geocode" ||
    result.message === "city not found"
  ) {
    topInput.textContent = "Please Enter City Name";
    lowInput.innerText = "";
  } else {
    topInput.textContent = `${result.name}`;
    lowInput.textContent = `${Math.round(result.main.temp) + "°"}`;
    windText.textContent = `Wind Speed ${Math.round(result.wind.speed)} km/h`;
    humidityText.textContent = `Humidity ${Math.round(result.main.humidity)}%`;

    if (
      result.weather[0].main === "Thunderstorm" ||
      result.weather[0].main === "Rain" ||
      result.weather[0].main === "Mist" ||
      result.weather[0].main === "Clouds"
    ) {
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/892/892300.png";
    } else {
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/128/3073/3073665.png";
    }
  }
}

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    holds();
  }
});

searchIcon.addEventListener("click", () => {
  holds();
});
