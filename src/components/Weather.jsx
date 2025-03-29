import React, { useState, useEffect } from "react";
import apiKeys from "../apiKeys";
import Clock from "react-live-clock";
import Forcast from "./ForCast";
import loader from "../images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) => {
  let months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    main: undefined,
    icon: "CLEAR_DAY",
  });

  useEffect(() => {
    const getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const getWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
        );
        const data = await response.json();

        setWeatherData({
          lat,
          lon,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          humidity: data.main.humidity,
          main: data.weather[0].main,
          country: data.sys.country,
          icon: mapWeatherToIcon(data.weather[0].main),
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const mapWeatherToIcon = (main) => {
      const weatherIcons = {
        Haze: "CLEAR_DAY",
        Clouds: "CLOUDY",
        Rain: "RAIN",
        Snow: "SNOW",
        Dust: "WIND",
        Drizzle: "SLEET",
        Fog: "FOG",
        Smoke: "FOG",
        Tornado: "WIND",
      };
      return weatherIcons[main] || "CLEAR_DAY";
    };

    getPosition()
      .then((position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch(() => {
        getWeather(28.67, 77.22);
        alert("Location access denied. Showing default location weather.");
      });

    const interval = setInterval(() => {
      getWeather(weatherData.lat, weatherData.lon);
    }, 600000);

    return () => clearInterval(interval);
  }, [weatherData.lat, weatherData.lon]);

  return weatherData.temperatureC ? (
    <>
      <div className="city">
        <div className="title">
          <h2>{weatherData.city}</h2>
          <h3>{weatherData.country}</h3>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather
            icon={weatherData.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <p>{weatherData.main}</p>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div className="current-time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature">
            <p>
              {weatherData.temperatureC}°<span>C</span>
            </p>
          </div>
        </div>
      </div>
      <Forcast icon={weatherData.icon} weather={weatherData.main} />
    </>
  ) : (
    <>
      <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="loading" />
      <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>Detecting your location</h3>
      <h3 style={{ color: "white", marginTop: "10px" }}>
        Your current location will be displayed on the App & used for calculating real-time weather.
      </h3>
    </>
  );
};

export default Weather;
