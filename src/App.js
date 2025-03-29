import React from "react";
import CurrentLocation from "./components/Weather";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="container">
        <CurrentLocation />
      </div>
      <Footer />
      
    </>
  );
}

export default App;
