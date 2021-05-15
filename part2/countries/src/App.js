import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY;

const LanguageList = ({country}) => 
  <ul>
    {country.languages.map((language, index) => <li key={index}>{language.name}</li>)}          
  </ul>

const DisplayWeather = ({country}) => {
  const [ weather, setWeather ] = useState() 
  const url = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.name
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [url])
  if (weather === undefined) {
    return <p>Loading...</p>;
  }
  return(
    <div>
      <h3>Weather in {country.name}</h3>
      <p><b>temperature:</b>{weather.temperature} Celcius</p>
      <img alt="weather icon" src={weather.weather_icons} width="50" height="auto"/>
      <p><b>wind:</b>{weather.wind_speed} mph direction{weather.wind_dir}</p>
    </div>
  )
}

const DisplayResult = ({countries, filter, handleFilter}) => {    
  countries = countries.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  if(countries.length > 10) {
    return (
      <p>Too many matches, modify the filter</p>
    )
  }

  if (countries.length < 10 && countries.length > 1) {
    return (      
      countries.map((country) => <div key={country.alpha3Code}>
        <span>{country.name}</span><button value={country.name} onClick={handleFilter}>show</button>
        </div>        
      )
    )
  } 
  
  if (countries.length === 1) {
    const currentCountry = countries[0];
    return (
      <div>
        <h2>{currentCountry.name}</h2>
        <p>Capital {currentCountry.capital}</p>
        <p>Population {currentCountry.population}</p>
        <h3>languages</h3>
        <LanguageList country={currentCountry}/>
        <img alt="country flag" src={currentCountry.flag} width="100" height="auto"/>
        <DisplayWeather country={currentCountry}/>
      </div>
    )
  }
  return (
    <p>No results, modify the filter</p>
  )
}

function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('') 
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)
  return (
    <div className="App">
      find countries <input value={filter} onChange={handleFilter}/>
      <DisplayResult countries = {countries} filter={filter} handleFilter={handleFilter}/>      
    </div>
  );
}

export default App;
