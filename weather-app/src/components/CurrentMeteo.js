import React, {useEffect, useState} from "react";
import axios from "axios";

function CurrentMeteo({city}) {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
        try{
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=5986d27d50ff4de8a36163004242511&q=${city}&days=1`
               );
            setWeatherData({
                location: response.data.location,
                current: response.data.current,
                forecast: response.data.forecast,
            });

        }catch(error){
            console.log("Error Fetching the weather data: ", error);
        }
        };

        fetchWeather();
    }, [city]);

  return (
        <div className="currentMeteoContainer">
            {weatherData ? (
                <div className="currentMeteo">
                    <div className="infoContainer">
                        <h2 className="location">{weatherData.location?.name || "Loading..."}</h2>
                        <p className="temperature">{weatherData.current?.temp_c || "Loading..."}°C</p>
                        <p className="condition">Ressentis: {weatherData.current?.feelslike_c || "Loading..."}°C</p>
                        {weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday[0]
                        ?(<p className="condition">{weatherData.forecast.forecastday[0]?.day.maxtemp_c}°C / 
                        {weatherData.forecast.forecastday[0]?.day.mintemp_c}°C</p>   
                        ):(
                            <p>Loading max temperature...</p>
                        )}
                       
                    </div>
                    <div className="iconContainer">
                        <img src={weatherData.current?.condition?.icon || ""} alt="Condition météo" className="icon" />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CurrentMeteo;