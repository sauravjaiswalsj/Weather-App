/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from 'react-query';
import WeatherUI from './WeatherUI';
import { useState } from 'react';

const apiKey = import.meta.env.VITE_API_KEY;

const fetchWeather = async (city) => {
    console.log(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { mode: 'cors' }, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    console.log(data);
    if (response.ok) {
        return data;
    }
    else {
        throw new Error(data.message);
    }
}

export default function weather() {
    const [city, setCity] = useState('Delhi');
    const { data: weather, isLoading, isError } = useQuery(['weather', city], () => fetchWeather(city));


    function handleCityChange(cityValue) {
        setCity(cityValue);
    }
    return (
        <div className="weather">
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error fetching weather.</p>
            ) : (
                <>
                    <WeatherUI weather={weather} onCityChange={handleCityChange} city={city} />
                </>
            )}
        </div>
    )
}
