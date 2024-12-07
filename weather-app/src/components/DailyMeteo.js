import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {format} from "date-fns";
import {fr} from "date-fns/locale";

function DailyMeteo({city}){
    const [forecastData, setForecastData] =  useState(null);
    const [error, setError] = useState(null);

     useEffect(() => {
        const fetchForecast = async () => {
            try{
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=5986d27d50ff4de8a36163004242511&q=${city}&days=8`
                );

                setForecastData(response.data.forecast.forecastday);
                setError(null);

            }catch(error){
                console.error("Error Fetching the weather data: ", error);
                setError("Erreur lors du chargement des données météo.");
            }
        };

        fetchForecast();
    }, [city]);

    if (error) return <p>{error}</p>;
    if(!forecastData) return <p>Loading...</p>;

    return(
        <div className='dailyMeteoContainer'>
            <div className='dailyMeteoList'>
                {forecastData.map(day => (
                    <div key={day.date} className='meteoDay'>
                        <h3>{day.date}</h3>
                        <img src={day.day.condition.icon}></img>
                        <p>Max: {day.day.maxtemp_c}°C</p>
                        <p>Min: {day.day.mintemp_c}°C</p>  
                    </div>
                ))} 
            </div>
        </div>
    );
}

export default DailyMeteo;