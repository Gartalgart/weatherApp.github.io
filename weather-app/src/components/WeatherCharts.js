import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

function WeatherCharts({city}){

    const [hourlyData, setHourlyData] = useState([]);

    useEffect(() => {
        const fetchHourlyData = async () => {
            try{
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=5986d27d50ff4de8a36163004242511&q=${city}&days=1`
                );

                console.log("Données: ",response);

                if (response.data.forecast && response.data.forecast.forecastday) {
                    const hourlyForecast = response.data.forecast.forecastday[0].hour.map((hour) => ({
                        time: hour.time.split(" ")[1], // Extraire l'heure
                        precip_mm: hour.precip_mm,    // Précipitations en mm
                        wind_kph: hour.wind_kph,      // Vent en km/h
                    }));

                    setHourlyData(hourlyForecast);

                } else {
                console.error('Les données météo sont manquantes ou incorrectes.');
                }

            }catch(error){
                console.log("Erreur lors de la récupération des données météos: ", error);
            }
        };
        
        fetchHourlyData();
    }, [city]);

    if(hourlyData.length === 0) return <p>Chargement des données...</p>

    return(
        <div className='chartsContainer'>
            <h2>Graphiques météo pour {city}</h2>

            {/* Graphique des précipitations */}
            <div className='charts'>
                <h3>Précipitations au cours de la journée</h3>
                <LineChart className='chart' width={600} height={300} data={hourlyData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <Line type="monotone" dataKey="precip_mm" stroke="#8884d8" strokeWidth={1} />
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="time" label={{ value: "Heure", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Précipitations (mm)", angle: -90, position: "insideBottomLeft" }} minTickGap={5} />
                <Tooltip />
                </LineChart>
            </div>

            {/* Graphique en radar pour l'humidité */}
            <div className='charts'>
                <h3>Vitesse du vent</h3>
                <AreaChart className='chart' width={600} height={300} data={hourlyData}
                      margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <defs>
                        <linearGradient id='colorGradient' x1="0" v1="0">
                            <stop offset="5%" stopColor='#2d00f7' opacity={0.8} />
                            <stop offset="95%" stopColor='#000039' opacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" label={{ value: "Heure", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{value: "Vitesse du vent (km/h)", angle: -90, position:"insideBottomLeft"}} />
                    <CartesianGrid strokeDasharray="2 2" />
                    <Tooltip />
                    <Area type="monotone" dataKey="wind_kph" stroke="#8884d8" fillOpacity={0.5} fill="url(#colorGradient)" />
                </AreaChart>
            </div>
        </div>
    );
}

export default WeatherCharts;
