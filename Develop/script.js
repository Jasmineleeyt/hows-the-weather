var current = $("#location-date");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var future = $(".future-weather");
var locationEl = $("#city");

// Hide the 5-day forecast section when the page loads
future.attr("id", "hidden");

renderHistory();

$("#search-btn").on("click", function getWeather() {
  var location = locationEl.val();
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&limit=5&appid=2fc24cd864fa94774a47658c178c7b68&units=metric`;

  //Get current weather
  $.ajax({
    url: requestUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    current.text(response.name);

    // Get today's date using dayjs
    var currentDate = dayjs().format("YYYY-MM-DD");
    current.append(" " + currentDate);

    // Get icon
    var icon = $("<img>");
    var url =
      "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
    icon.attr("src", url);
    current.append(icon);

    temp.text("Temperature: " + response.main.temp + "°C");
    wind.text("Wind: " + response.wind.speed + " m/s");
    humidity.text("Humidity: " + response.main.humidity + "%");

    $(".current-weather").css({
      border: "1px solid navy",
      margin: "10px 0 10px 0",
      padding: "10px",
      width: "40%",
    });
  });

  // Get 5-day forecast
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=2fc24cd864fa94774a47658c178c7b68&units=metric`,
    success: function (response) {
      console.log(response);
      future.attr("id", "");

      //Store the cities entered
      if (localStorage.getItem("cities")) {
        const previousCities = localStorage.getItem("cities");
        let allCities = JSON.parse(previousCities);
        allCities.push(locationEl.val());

        // Removes duplicate cities by converting it to lowercase.
        allCities = allCities.map((city) => city.toLowerCase());
        allCities = [...new Set(allCities)];

         // Function to convert cities to title case
        function convertToTitleCase(searchCities) {
          if (!searchCities) {
            return "";
          }
          return searchCities
            .toLowerCase()
            .split(" ")
            .map(function (convert) {
              return convert.charAt(0).toUpperCase().concat(convert.substr(1));
            })
            .join(" ");
        }

        // Convert all cities back to title case and store
        allCities = allCities.map((city) => convertToTitleCase(city));

        localStorage.setItem("cities", JSON.stringify(allCities));
      } else {
        let newCities = [];
        newCities.push(locationEl.val());
        localStorage.setItem("cities", JSON.stringify(newCities));
      };

      // Get next 5 days forecast by grabbing every 8 intervals
      for (var i = 0; i < 40; i++) {
        const responseDate = response.list[i].dt_txt;
        const date = responseDate.split(" ");
        var iconUrl =
          "https://openweathermap.org/img/wn/" +
          response.list[i].weather[0].icon +
          ".png";
        if (i === 2) {
          $("#futuredate1").text(date[0]);
          $("#img1").attr("src", iconUrl);
          $("#temp1").text("Temperature: " + response.list[i].main.temp + "°C");
          $("#wind1").text("Wind: " + response.list[i].wind.speed + " m/s");
          $("#humidity1").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
        } else if (i === 10) {
          $("#futuredate2").text(date[0]);
          $("#img2").attr("src", iconUrl);
          $("#temp2").text("Temperature: " + response.list[i].main.temp + "°C");
          $("#wind2").text("Wind: " + response.list[i].wind.speed + " m/s");
          $("#humidity2").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
        } else if (i === 18) {
          $("#futuredate3").text(date[0]);
          $("#img3").attr("src", iconUrl);
          $("#temp3").text("Temperature: " + response.list[i].main.temp + "°C");
          $("#wind3").text("Wind: " + response.list[i].wind.speed + " m/s");
          $("#humidity3").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
        } else if (i === 26) {
          $("#futuredate4").text(date[0]);
          $("#img4").attr("src", iconUrl);
          $("#temp4").text("Temperature: " + response.list[i].main.temp + "°C");
          $("#wind4").text("Wind: " + response.list[i].wind.speed + " m/s");
          $("#humidity4").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
        } else if (i === 34) {
          $("#futuredate5").text(date[0]);
          $("#img5").attr("src", iconUrl);
          $("#temp5").text("Temperature: " + response.list[i].main.temp + "°C");
          $("#wind5").text("Wind: " + response.list[i].wind.speed + " m/s");
          $("#humidity5").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
        }
      }
      renderHistory();
    },
  });
});

// Render search history
function renderHistory() {
  $("#history-list").empty();

  if (localStorage.getItem("cities")) {
    var arr = JSON.parse(localStorage.getItem("cities"));

    // Create a button for each city stored in local storage and append it to the history list
    for (var i = 0; i < arr.length; i++) {
      var historyLi = $("<button>");
      historyLi.addClass("history-btn");
      historyLi.text(arr[i]);
      historyLi.on("click", (event) => {
        var el = event.target;
        var cityName = el.innerText;
        locationEl.val(cityName);
        $("#search-btn").click();
      });
      $("#history-list").append(historyLi);
    };
  };
};
