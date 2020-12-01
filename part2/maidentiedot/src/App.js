
import './App.css';
import React, {useState, useEffect} from 'react'
import Axios from 'axios';

const Country = ({country}) => {
  const [weather, setWeatherData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const apiKey = process.env.REACT_APP_API_KEY
  

  

  useEffect(() => {
    Axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
    .then(response => {
      console.log("weather data: " ,response.data)
      setWeatherData(response.data)
      setLoading(true)
    }).catch(error => {
      console.log(error)
    })
  },[apiKey,country.capital])
  if(!isLoading) {
    return(
      <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h4>Languages</h4>
      {country.languages.map(l => <p key={l.iso639_2}>{l.name}</p>)}
      <img src={country.flag} width="200px" height="150px" />
      <h3>Loading weather data...</h3>
      </div>
    )
  } else {
  return(
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h4>Languages</h4>
      {country.languages.map(l => <p key={l.iso639_2}>{l.name}</p>)}
      <img src={country.flag} width="200px" height="150px" />
      <div>
        <h4>Weather in {country.capital} </h4>
        <p>{weather.current.weather_descriptions[0]}</p>
        <p>temperature: {weather.current.temperature} C</p>
        <img src={weather.current.weather_icons[0]} width="100px" height="100px" />
        <p>Wind: {weather.current.wind_speed} m/s</p>
      </div>
    </div>
  )
  }
}
const CountryName = ({country}) => {
  const [showCountry, setShowCountry] = useState(false)
  const handleClick = (event) => {
    setShowCountry(!showCountry)
  }
  if(showCountry) {
    return(
      <>
      <button onClick={handleClick}>Hide</button>
      <Country country={country} />
      </>
    )
  } else {
  return(
    
  <div>
    {country.name} <button onClick={handleClick}>Show</button>
  </div>
  )
  }
}
const CountiresList = ({countries}) => {
  if(countries.length === 1) {
    console.log(countries[0])
    return(
      <Country country={countries[0]} />
    )
  } else if(countries.length <= 10) {
    return(
      <div>
        {countries.map(c => <CountryName key={c.alpha3Code} country={c} />)}
      </div>
    )
  } else {
    return(
      <div>
        Too many matches, please specify more accurate filter
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearch] = useState('')

  const hook = () => {
    Axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log(response)
      setCountries(response.data)
    }).catch(error => {
      console.log("Error: ", error);
    })
  }

  useEffect(hook, [])


  

  const handleInput = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const dSearch = () => {
    console.log(countries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())))
    return countries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return (
    <div className="App">
    <div className="search">
      find countries: <input value={searchTerm} onChange={handleInput}/>
    </div>
      <CountiresList countries={dSearch()} />
    </div>
  );
}

export default App;
