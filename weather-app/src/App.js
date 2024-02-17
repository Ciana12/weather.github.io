// WeatherApp.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '338c961dcfb8cbbf4bed8b115daccc5e';

  const getWeather = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching weather data. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const convertKelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  return (
    <div className="weather-app">
      <h1>Weather Forecast</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-details">
          <h2>{weatherData.name}</h2>
          <p>
            Temperature: {convertKelvinToCelsius(weatherData.main.temp)}°C
          </p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <div className="additional-details">
            <p>Humidity: {weatherData.main.humidity}%</p>
            
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
