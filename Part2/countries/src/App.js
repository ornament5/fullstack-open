import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Search = ({searchValue, changeHandler}) => {
  return (
    <div>
      find countries <input value={searchValue} onChange={changeHandler}/>
    </div>
  );
};

const Warning = () => <p> Too many matches, specify another filter</p>;

const Countries = ({countries, onShowClicked}) => {
  return (
    <div>
      {
        countries.map((country => <Country key={country.name} name={country.name} onShowClicked={onShowClicked}/>))
      }
    </div>
  );
};

const Country = ({name, onShowClicked}) => {
  return (
    <div>
      <p>
        {name} &nbsp;
        <Button text='show' clickHandler={onShowClicked}/>  
      </p>
         
    </div>
  );
};

const Button = ({text, clickHandler}) => {
  return <button onClick={clickHandler}>{text}</button>
};

const CountryDetails = ({country, weather}) => {
  return (
    <div>
      <CountryBasicInfo {...country} />
      <Languages {...country} />
      <Flag flagLink={country.flag} />
      <WeatherSection city={country.capital} weather={weather}/>
    </div>
  );
};

const CountryBasicInfo = ({name, capital, population}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
    </div>
  );
};

const Languages = ({languages}) => {
  return (
    <div>
      <h2>Spoken languages</h2>
      <ul>
        {
          languages.map(language => <li key={language.name}>{language.name}</li>)
        }
      </ul>
    </div>
  );
};

const Flag = ({flagLink, name}) => {
  return (
    <div>
      <img src={flagLink} alt={`national flag of ${name}`}/>
    </div>
  );
};

const WeatherSection = ({city, weather}) => {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><strong>temperature:</strong>  {weather.current.temperature} Celsius </p> 
      <img src={weather.current.weather_icons[0]}  alt={'weather icon'}/>
      <p><strong>wind:</strong> {weather.current.wind_speed}  mph direction {weather.current.wind_dir} </p>
    </div>
  );
};

const App = () => {
const [ countries, setCountries ] = useState([]);
const [ newFilter, setNewFilter ] = useState('');

useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all')
    .then( response => setCountries([...response.data]));
}, []);

const filteredCountries = countries.filter(country => country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1);
let searchResult = null;

const [weatherReport, setWeatherReport] = useState({current:{
  temperature:'',
  wind_speed:'',
  wind_dir:'',
  weather_icons:''
}});
useEffect(() => {  
  if(filteredCountries.length === 1) {
    const city = filteredCountries[0].capital;   
    console.log('fetch') 
   axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${city}`)
   .then( response => setWeatherReport(response.data));
  }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [newFilter]);

const handleFilterChange = e => {
  setNewFilter(e.target.value);
};

const handleShowClicked = (e) => {
  e.preventDefault();
  setNewFilter(e.target.parentElement.firstChild.textContent);  
};

if (newFilter !== '') {
  searchResult = <Warning />;
}

if (filteredCountries.length < 11) {
  if (filteredCountries.length === 1) {
    searchResult = <CountryDetails country={filteredCountries[0]} weather={weatherReport} />
  } else {
    searchResult = <Countries countries={filteredCountries} onShowClicked={handleShowClicked}/>
  }
}



return (
  <div>
    <Search searchValue={newFilter} changeHandler={handleFilterChange} />
    {searchResult}
  </div>
);
};

export default App;
