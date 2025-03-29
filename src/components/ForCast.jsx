import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "../apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import History from "./History"; // Import the new History component

const defaults = {
  icon: "CLEAR_DAY",
  color: "goldenrod",
  size: 64,
  animate: true,
};

const Forcast = (props) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(sessionStorage.getItem("searchHistory"));
    if (savedHistory) setHistory(savedHistory);

    search("Delhi");
  }, []);

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setError("");

        updateSearchHistory(city);
      })
      .catch((error) => {
        console.error(error);
        setWeather({});
        setQuery("");
        setError({ message: "Not Found", query });
      });
  };

  const updateSearchHistory = (searchCity) => {
    let updatedHistory = [searchCity, ...history.filter((item) => item !== searchCity)].slice(0, 5);
    setHistory(updatedHistory);
    sessionStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon || defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
        <input
  type="text"
  className="search-bar"
  placeholder="Search any city"
  onChange={(e) => setQuery(e.target.value)}
  value={query}
  onKeyPress={(e) => e.key === "Enter" && search(query)} // Add this line
/>

          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="Search"
              onClick={() => search(query)}
            />
          </div>
        </div>

        <ul>
          {weather.main ? (
            <>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity <span className="temp">{weather.main.humidity}%</span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">{Math.round(weather.visibility)} mi</span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">{Math.round(weather.wind.speed)} Km/h</span>
              </li>
            </>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>

      {/* Pass history as props to History Component */}
      <History history={history} search={search} />
    </div>
  );
};

export default Forcast;
