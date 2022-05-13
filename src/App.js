import React, { useState } from 'react';

const weatherApi = {
  key: "d21dbf4ec7c07da49bc079f1518d953d",
  base: "https://api.openweathermap.org/data/2.5/"
}
const geoCodeApi ={
  key:"d21dbf4ec7c07da49bc079f1518d953d",
  base: "http://api.openweathermap.org/geo/1.0/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [geoCode, setGeoCode] = useState({})


  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${geoCodeApi.base}direct?q=${query}&limit=1&appid=${geoCodeApi.key}`)
      .then(res => res.json())
      .then(result => {
        setGeoCode(result)
        console.log(geoCode)

        return fetch(`${weatherApi.base}onecall?lat=${result[0].lat}&lon=${result[0].lon}&units=imperial&appid=${weatherApi.key}`)

      })
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      });
    }
  }


  const dateBuilder = (d) => {
    let months = ['January','february','March','April','May','June','July','August','September','October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className="app">
        
      <main className='grid grid-cols-2'>
        <div className=''>
          <div className="search-box mt-7">
            <input type="text" 
            className='search-bar mt-7' 
            placeholder='Enter City...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyUp={search}
            />
        </div>

        { weather.timezone && 
          
          <div>
            <div className="locationBox">
              <div className="location">{geoCode[0].name}, {geoCode[0].state} </div>
              {/* <div className='population'>Poulation: {new Intl.NumberFormat().format(weather.city.population)}</div> */}
              <div className="date">{ dateBuilder(new Date()) }</div>
            </div>
            <div className='weatherBox'>
            <div className='temp'>
              {Math.round(weather.daily[0].temp.max)}°F
            </div>
            <div className='weather '>
              {weather.daily[0].weather[0].main}
            </div>
            </div>
          </div>
          }

        </div>

      { weather.timezone && 

        <div className='flex justify-end'>

          <ul>
            {weather.daily.slice(1,8).map((day)=>{
               return(
                
                <div className='forcastSection px-1 py-2 items-center'>
                  <li>
                    <div className='forcastSection px-1 py-2 flex items-center'>{Math.round(day.temp.max)}°F</div>
                    <div>{dateBuilder(new Date(day.dt * 1000))}</div>
                   

                  </li>
                </div>
               )
           })}
          </ul>
        </div>
      
}     


        
                
              
        
    
      </main>
    </div>
  );
}

export default App;
