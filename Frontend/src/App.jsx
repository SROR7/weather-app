import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get("/api/weather", {
        params: {
          city: city,
        },
      });

      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError(err.response?.data?.message || "Failed to get weather.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌤 Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>

          <p>
            <strong>Country:</strong> {weather.sys.country}
          </p>

          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>

          <p>
            <strong>Feels Like:</strong> {weather.main.feels_like} °C
          </p>

          <p>
            <strong>Humidity:</strong> {weather.main.humidity} %
          </p>

          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>

          <p>
            <strong>Weather:</strong> {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
