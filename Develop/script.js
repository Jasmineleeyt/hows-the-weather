var current = $("#location-date");
var temp = $("#temp")
var wind = $("#wind");
var humidity = $("#humidity")
var currentDate = dayjs().format("MM/DD/YYYY");
var day1 = $(".forecast-day").eq(0)
var day2 = $(".forecast-day").eq(1)

$("#search-btn").on("click", function getWeather() {
  var location = $("#city").val();
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&limit=5&appid=2fc24cd864fa94774a47658c178c7b68&units=metric`;

//Get current weather
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    current.text(response.name);
    // Create icon
    var icon = $("<img>");
    var url =
      "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
    icon.attr("src", url);
    current.append(icon);

    temp.text("Temperature: " + response.main.temp + "°C");
    humidity.text("Wind: " + response.main.humidity + " %");
    wind.text("Wind: " + response.wind.speed);
    
    // current-weather.css({'border':'3px solid black'});

  });
// Get 5-day forecast
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=2fc24cd864fa94774a47658c178c7b68`;
        return response.json();
    })
    .then(function (response) {
      console.log(response.list);
      console.log(response.list[2]);
      console.log(response.list[10]);
      console.log(response.list[18]);
      console.log(response.list[26]);
      console.log(response.list[34]);
  });

});
