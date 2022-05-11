import React, { useState } from 'react';

const weatherApi = {
  key: "d21dbf4ec7c07da49bc079f1518d953d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})
  const [forcast, setForcast] = useState({})

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${weatherApi.base}weather?q=${query}&units=imperial&APPID=${weatherApi.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setWeather(result)
        console.log(result)
      });
      fetch(`${weatherApi.base}forecast?q=${query}&units=imperial&APPID=${weatherApi.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setForcast(result)
        console.log(result)
      });
    }
  }


  const dateBuilder = (d) => {
    let months = ['January','february','March','April','May','June','July','August','September','October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thurday','Friday','Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="app">
      <main>
    <div className="search-box">
          <input type="text" 
          className='search-bar' 
          placeholder='Enter City...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyUp={search}
        
          />
        </div>

        {(typeof weather.main != 'undefined') ?(
        <div>
          <div className="locationBox">
            <div className="location">{weather.name} , {weather.sys.country}</div>
            <div className="date">{ dateBuilder(new Date()) }</div>
          </div>
          <div className='weatherBox'>
          <div className='temp'>
            {Math.round(weather.main.temp)}°F
          </div>
          <div className='weather'>
            {weather.weather[0].main}
          </div>
          </div>
        </div>
        ) : ('')}
        
        <div className='text-white'>
          {forcast.list[1].main.temp}
        </div>

                
              
                
              
        
    
      </main>
    </div>
  );
}

export default App;
