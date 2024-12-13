import React, { useState, useEffect} from 'react';
import axios from 'axios';

function DailyMeteo({city}){
    const [forecastData, setForecastData] =  useState(null);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', options).format(date)
            .split(" ")//Divise la chaine en un tableau de mot en utilisant les espaces comme séparateurs
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))// Parcourt les mots de chaque tableaux et converti chaque 1ère lettre en majuscule.
            .join(" ");//Rejoint les mots du tableau;
    };

    useEffect(() => {
        const fetchForecast = async () => {
            try{
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=5986d27d50ff4de8a36163004242511&q=${city}&days=3`
                );

                const prevision = response.data.forecast.forecastday;
                const days2and3 = prevision.slice(1);

                setForecastData(days2and3);
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
                        <h3 className='dailyDate'>{formatDate(day.date)}</h3>
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