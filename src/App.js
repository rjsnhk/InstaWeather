import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        
        

        Weather data powered by <a target="_blank" href="https://openweathermap.org/">
          OpenWeather
        </a> | Developed with ❤️ by <a target="_blank" href="https://www.linkedin.com/in/rjsnhk/">
          Rajesh Nahak
        </a> using React.
        
      </div>
    </React.Fragment>
  );
}

export default App;
