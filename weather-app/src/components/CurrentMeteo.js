import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faDroplet, faArrowsDownToLine, faCloud, faWind, faLeaf, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';



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
                        <div>
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
                    <div className="tableContainer">
                        <div className="leftInfo">
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faCloudSunRain} /></span><p>Précipitations: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.precip_mm || "Loading..."}mm</p>
                            </div>
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faDroplet} /></span><p>humiditer: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.humidity || "Loading..."}%</p>
                            </div>
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faArrowsDownToLine} /></span><p>Pression: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.pressure_mb || "Loading..."}mb</p>
                            </div>
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faCloud} /></span><p>Couverture nuageuse: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.cloud || "Loading..."}%</p>
                            </div>
                        </div>
                        <div className="rightInfo">
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faWind} /></span><p>vent: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.wind_kph || "Loading..."}km/h</p>
                            </div>
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faLeaf} /></span><p>Point de rosée: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.dewpoint_c || "Loading..."}°C</p>
                            </div>
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faSun} /></span><p>Indice UV: </p>
                                </div>
                                <p className="tableData">{weatherData.current?.uv || "Loading..."}</p>
                            </div>
                            <div className="ligneContainer">
                                <div className="hook">
                                    <span><FontAwesomeIcon icon={faCloudRain} /></span><p>Possibilité de pluie: </p>
                                </div>
                                {weatherData.forecast && weatherData.forecast.forecastday && weatherData.forecast.forecastday[0]
                                ?(<p className="tableData">{weatherData.forecast.forecastday[0]?.day.daily_chance_of_rain}%</p>   
                                ):(
                                    <p>Loading daily chance of rain...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CurrentMeteo;