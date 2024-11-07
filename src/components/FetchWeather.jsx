import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import ErrorMessage from '../utility/ErrorMessage';

const FetchWeather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`;
    
    try {
      const response = await axios.get(geocodeUrl);
      if (response.data.results.length > 0) {
        const { latitude, longitude } = response.data.results[0];
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await axios.get(weatherUrl);
        setWeatherData(weatherResponse.data.current_weather);
        setError(null);
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-4">Weather Now</h1>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter city"
        />
        <button
          onClick={fetchWeather}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Get Weather
        </button>

        {error && <ErrorMessage message={error} />}
        
        {weatherData && (
          <WeatherCard
            temperature={weatherData.temperature}
            windspeed={weatherData.windspeed}
            weatherCode={weatherData.weathercode} // Pass the weather code
          />
        )}
      </div>
    </div>
  );
};

export default FetchWeather;
