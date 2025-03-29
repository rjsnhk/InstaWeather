---

# 🌦️ Weather Application Setup Guide  

This guide provides step-by-step instructions for building a **Weather Application** in React. 🚀 The application has two main functions:  

✅ **Display real-time weather data** for your current location.  
✅ **Show weather conditions for a specific city** based on user search.  

By following this guide, you'll learn React basics like **hooks, states, props, components, API calls, dynamic data handling, forms, and more!** 💡  

## 🌍 Live Demo  
🔗 Check out the [Live Demo here](https://instaweather9.vercel.app/)  

## 📂 Source Code  
⬇️ Find the source code and demo by scrolling down.  

---

## ⚙️ Setting Up the React Environment  

1️⃣ **Create a React Project**:  

   ```bash
   mkdir weather
   cd weather
   npx create-react-app weather
   ```

   🚀 This command sets up a new React project and opens it on `localhost:3000`.  

2️⃣ **Install Required Packages** 📦:  

   Run the following command to install dependencies:  

   ```bash
   npm install
   ```

   Required packages include:  

   - 📌 `react-animated-weather`
   - ⏰ `react-live-clock`
   - 🔗 `axios`  

---

## 🔑 API Key Setup  

To fetch weather data, sign up for an **OpenWeatherMap API key** (free and accurate weather data 🌍).  

📌 **Steps to add the API Key:**  
1. Register on OpenWeatherMap & get your API key.  
2. Create a file `apiKeys.js` and store the key securely:  

   ```javascript
   module.exports = {
     key: "{Your API Key Here}",
     base: "https://api.openweathermap.org/data/2.5/",
   };
   ```

---

## 📍 App Phase 1: Display Weather for Current Location  

To get the user's **current location** and fetch weather data, use `navigator.geolocation`.  

📌 **Step 1: Fetch User's Location**  

```javascript
if (navigator.geolocation) {
  this.getPosition()
    .then((position) => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    })
    .catch((err) => {
      this.getWeather(28.67, 77.22);  // Default coordinates (e.g., New Delhi)
      alert("📍 You have disabled location services. Using default location.");
    });
} else {
  alert("⚠️ Geolocation not available");
}
```

📌 **Step 2: Fetch Weather Data Using Coordinates**  

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
    temperatureC: Math.round(data.main.temp) + "°C 🌡️",
    humidity: data.main.humidity + "% 💧",
    main: data.weather[0].main,
    country: data.sys.country + " 🌍",
  });
};
```

---

## 🌎 App Phase 2: Display Weather for a Specific City  

To fetch and display weather conditions for any **searched city**, use **React hooks and state management**.  

📌 **Step 1: Set Up State Variables**  

```javascript
const [query, setQuery] = useState("");
const [weather, setWeather] = useState({});
const [error, setError] = useState("");
```

📌 **Step 2: Create an Input Field for City Search**  

```javascript
<input
  type="text"
  className="search-bar"
  placeholder="🔍 Search any city"
  onChange={(e) => setQuery(e.target.value)}
  value={query}
/>
```

📌 **Step 3: Fetch Weather for Entered City**  

```javascript
const search = (city) => {
  axios
    .get(`${apiKeys.base}weather?q=${city || query}&units=metric&APPID=${apiKeys.key}`)
    .then((response) => {
      setWeather(response.data);
      setQuery("");
    })
    .catch((error) => {
      setError({ message: "❌ City Not Found", query: query });
      console.error(error);
    });
};
```

---

## 🎨 Add Animated Weather Icons  

Enhance your UI with **animated weather icons** that dynamically change based on weather conditions! ⛅🌩️❄️  

📌 **Step 1: Define Default Icon Properties**  

```javascript
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
```

📌 **Step 2: Assign Weather Conditions to Icons**  

```javascript
switch (this.state.main) {
  case "Haze":
    this.setState({ icon: "CLEAR_DAY" });
    break;
  case "Clouds":
    this.setState({ icon: "CLOUDY" });
    break;
  case "Rain":
    this.setState({ icon: "RAIN" });
    break;
  case "Snow":
    this.setState({ icon: "SNOW" });
    break;
  case "Fog":
    this.setState({ icon: "FOG" });
    break;
  case "Thunderstorm":
    this.setState({ icon: "RAIN" });
    break;
  default:
    this.setState({ icon: "CLEAR_DAY" });
}
```

🎉 **Now, your app will display animated weather icons dynamically!**  

---

## 🎯 Final Thoughts  

🚀 **Congratulations!** You've built a **functional weather application** that:  
✅ Detects user location automatically 🌎  
✅ Fetches real-time weather data using APIs ☀️  
✅ Allows searching for any city’s weather 🌆  
✅ Displays animated weather icons ⛅  

💡 **Next Steps?**  
- 📌 Add **temperature in Fahrenheit** (°F)  
- 📌 Show **hourly weather forecast** ⏳  
- 📌 Implement **dark mode** 🌙  
- 📌 Improve UI using **CSS animations** 🎨  

---

🔗 **[Live Demo](https://instaweather9.vercel.app/)** | 🛠️ **Happy Coding!** 💻🚀
