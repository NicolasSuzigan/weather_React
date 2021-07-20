import React, { useEffect, useState } from 'react'
import './App.css'
import {api} from './services/api';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa'

function App() {
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  

  async function handleGetWeather(event) {
    event.preventDefault();
    const response = await api.get(search);
    await fetch('https://goweather.herokuapp.com/weather')
    setCity(search);

    console.log(response.data);
    setWeather(response.data);
    }

  return (
    <div className="App">
      <header>
        <form onSubmit={handleGetWeather}>
          <input 
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">pesquisar</button>
        </form>
      </header>

      {weather && 
        <main>
          <h1>{city}</h1>

          <section className="current-weather">
            <h2>Informações Meteorológicas</h2>

            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </section>

          <section className="forecast">
            <h2>Previsão</h2>
            <ol>
            {
              weather.forecast.map((day) => 
                <li>
                  <div>
                    <FaTemperatureHigh />
                    <p>{day.temperature}</p>
                  </div>

                  <div>
                    <FaWind />
                    <p>{day.wind}</p>
                  </div>
                </li>
            )}
              </ol>
          </section>
        </main>
      }
    </div>
)
}

export default App;
