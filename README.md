

# Weather Application Setup Guide

This guide provides step-by-step instructions for building a weather application in React. The application has two main functions:

1. Display real-time weather data for your current location.
2. Show weather conditions for a specific city based on user search.

By following this guide, you'll learn React basics like hooks, states, props, components, API calls, dynamic data handling, working with forms, and more.

## Getting Started

### Live Demo
Check out the [live demo here](https://instaweather.onrender.com/).

### Source Code Download
You can find the source code and demo by scrolling down.

---

## Setting Up the React Environment

1. **Create a React project**:

   ```bash
   mkdir weather
   cd weather
   npx create-react-app weather
   ```

   This command sets up a new React project and opens it on `localhost:3000`.

2. **Install Required Packages**:
   
   Install the following packages by running the `npm install` command with each package name:

   - `react-animated-weather`
   - `react-live-clock`
   - `axios`

   For example:

   ```bash
   npm install
   ```

## API Key Setup

To fetch weather data, sign up for an OpenWeatherMap API key (free and accurate weather data). After registering, check your email for the API key or find it in the OpenWeatherMap dashboard.

1. **Add API Key**:
   Create a file `apiKeys.js` to store your key:

   ```javascript
   module.exports = {
     key: "{Your API Key Here}",
     base: "https://api.openweathermap.org/data/2.5/",
   };
   ```

---

## App Phase 1: Display Weather for Current Location

To get the user's current location and fetch weather data, use `navigator.geolocation`.

1. **Fetch User's Location**:
   
   Create `currentLocation.js` to detect the user’s location and call `getWeather()` with latitude and longitude:

   ```javascript
   if (navigator.geolocation) {
     this.getPosition()
       .then((position) => {
         this.getWeather(position.coords.latitude, position.coords.longitude);
       })
       .catch((err) => {
         this.getWeather(28.67, 77.22);  // Default coordinates (e.g., Delhi)
         alert("You have disabled location service.");
       });
   } else {
     alert("Geolocation not available");
   }
   ```

   This code checks if geolocation is enabled and uses default coordinates if it’s denied.

2. **Fetch Weather Data with Coordinates**:

   ```javascript
   getWeather = async (lat, lon) => {
     const api_call = await fetch(
       `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
     );
     const data = await api_call.json();
     this.setState({
       lat: lat,
       lon: lon,
       city: data.name,
       temperatureC: Math.round(data.main.temp),
       temperatureF: Math.round(data.main.temp * 1.8 + 32),
       humidity: data.main.humidity,
       main: data.weather[0].main,
       country: data.sys.country,
     });
   };
   ```

   Here, `getWeather` fetches and displays the weather data for the user’s current location.

---

## App Phase 2: Weather Conditions of a Particular City

To show weather for a specific city, use React hooks and states.

1. **Set Up State Variables**:

   ```javascript
   const [query, setQuery] = useState("");
   const [weather, setWeather] = useState({});
   const [error, setError] = useState("");
   ```

2. **Get Data for Entered City**:

   ```javascript
   <input
     type="text"
     className="search-bar"
     placeholder="Search any city"
     onChange={(e) => setQuery(e.target.value)}
     value={query}
   />
   ```

   The `onChange` event stores the user’s input (city name) in `query`.

3. **Fetch Weather for the Entered City**:

   ```javascript
   const search = (city) => {
     axios
       .get(`${apiKeys.base}weather?q=${city || query}&units=metric&APPID=${apiKeys.key}`)
       .then((response) => {
         setWeather(response.data);
         setQuery("");
       })
       .catch((error) => {
         setError({ message: "Not Found", query: query });
         console.error(error);
       });
   };
   ```

   This code fetches data from OpenWeatherMap when a city name is entered, using `axios` to handle the API request.

---

## Add Animated Weather Icons

To add weather icons that represent conditions like clear sky or clouds, use the `react-animated-weather` package.

1. **Define Default Icon Properties**:

   ```javascript
   const defaults = {
     color: "white",
     size: 112,
     animate: true,
   };
   ```

2. **Display Icons Based on Weather Condition**:

   ```javascript
   switch (this.state.main) {
     case "Haze":
       this.setState({ icon: "CLEAR_DAY" });
       break;
     case "Clouds":
       this.setState({ icon: "CLOUDY" });
       break;
     // Add other cases for different weather conditions
     default:
       this.setState({ icon: "CLEAR_DAY" });
   }
   ```

   Map each weather condition to an appropriate icon.

---



That's it! You've now created a functional weather application that shows both current location weather and allows city-specific searches. You also added a live view button for easy access to the demo. Keep experimenting with additional features to enhance your app further. Enjoy coding!
