import React, {useState} from "react";
import Banner from "./Banner";
import CurrentMeteo from "./CurrentMeteo";
import DailyMeteo from "./DailyMeteo";
import WeatherCharts from "./WeatherCharts";

function App() {
  const [city, setCity] = useState("Paris");

  return (
    <div>
      <Banner setCity={setCity} />
      <CurrentMeteo city={city} />
      <DailyMeteo city={city}/>
      <WeatherCharts city={city} />
    </div>
    
  );
}

export default App;
