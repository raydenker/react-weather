import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { WEATHER_API_KEY } from './config'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

 
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}?country=UA&lang=uk`
 
  // const url = `http://api.openweathermap.org/data/2.5/weather?q=${location},ua&APPID=${WEATHER_API_KEY}`
  const handleChange = (e) => {
    setLocation(e.target.value) 
  }
  
  const searchLocation = () => {    
    if (location) {
      axios
      .get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }   
  }
 

  useEffect(() => {
    searchLocation()
    // eslint-disable-next-line
  }, [location])
  
  if (!data) return null

  return (
    <div className="App">
      <div className="app">
        <div className="search">
          <select name="" id="" onChange={handleChange}>           
            <option disabled>Choese City</option>
            <option value="Dnipropetrovsk">Dnipro</option>
            <option value="novomoskovsk">Novomoskovsk</option>
            <option value="Pavlohrad">Pavlohrad</option>
            <option value="Kiev">Kyiv</option>
          </select>
        
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
             {data.location ? <p>{data.location.name}</p>: null}
            </div>
            <div className="temp">
              {data.current ? <h1>{data.current.temp_c.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
            {data.current ? <img src={data.current.condition.icon } alt="" />   : null}    
            {data.current ? <p>{data.current.condition.text}</p> : null}                         
            </div>
          </div>

          {data.location !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.current ? (
                  <p className="bold">{data.current.feelslike_c.toFixed()}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.current ? (
                  <p className="bold">{data.current.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.current ? (
                  <p className="bold">{data.current.wind_kph.toFixed()} KPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
