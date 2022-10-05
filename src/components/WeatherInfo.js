import React, { useState, useEffect } from 'react'
import Map from '../components/Map';
import DateBuilder from '../utils/DateBuilder'
import weatherSet from '../utils/weatherSet'
import Banner from './Banner';

//https://openweathermap.org/api


function App(props) {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [geoCode, setGeoCode] = useState({})
const weatherApi = {
  key: '9d31b566b7835cec15c8ffac25143073',//TODO ,env
  base: "https://api.openweathermap.org/data/2.5/"
}

const geoCodeApi ={
  key: '9d31b566b7835cec15c8ffac25143073',
  base: "https://api.openweathermap.org/geo/1.0/"
}

  
  //USED TO SET DEFAULT CITY ON PAGE LOAD
  useEffect(() => {
    fetch(`${geoCodeApi.base}direct?q=romulus&limit=1&appid=${geoCodeApi.key}`)
    .then(res => res.json())
    .then(result => {
      setGeoCode(result)
      console.log(geoCode,result)
      return fetch(`${weatherApi.base}onecall?lat=${result[0].lat}&lon=${result[0].lon}&units=imperial&appid=${weatherApi.key}`)
    })
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      setQuery('')
      console.log(result)
    });

  },[])


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



  return (
    <>
      
    <div className="app ">
      {/* MOBILE VIEW */}
      <main className='grid grid-cols-1 md:hidden '>
        <div className=''>
          <div className="search-box mt-7">
            <input type="text" 
            className='search-bar mt-7 ' 
            placeholder='Enter City...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyUp={search}
            />
        </div>

        { weather.timezone && 
          
          <div className=''>
            <div className="locationBox">
              <div className="location">{geoCode[0].name}, {geoCode[0].state} </div>
              <div className="date">{DateBuilder(new Date())}</div>
              <div className="date">{new Date().toLocaleTimeString()}</div>
            </div>
            <div className='weatherBox'>
              <div className='temp'>
                {Math.round(weather.current.temp)}°F
              </div>
              <div className='weather '>
                { weatherSet(weather.current.weather[0].main), weather.current.weather[0].main}
              </div>
            </div>
          </div>
          }
          </div>
          
          { weather.timezone && 
        <div className=''>
          <ul>
            {weather.daily.slice(1,7).map((day)=>{
               return(
                
                <div className='forcastSection px-1 py-2 items-center flex flex-wrap max-w-[75%]'>
                  <li>
                    <div className='forcastSection px-1 py-2 flex items-center'>{Math.round(day.temp.max)}°F</div>
                     <div>{DateBuilder(new Date(day.dt * 1000))}</div>

                  </li>
                </div>
               )
            })}
          </ul>
        </div>
        }     
      </main>


      {/* DESKTOP VIEW */}
        <Banner />
        <main className='hidden md:grid grid-cols-3  '>
          
           
        <div className='grid grid-cols-1 '>
           
          <div className="search-box ">
            <input type="text" 
            className='search-bar ' 
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
                  <div className="date">{DateBuilder(new Date())}</div>
                  <div className="date">{new Date().toLocaleTimeString()}</div>
            </div>
            <div className='weatherBox'>
              <div className='temp'>
                {Math.round(weather.current.temp)}°F
              </div>
              <div className='weather '>
                {weatherSet(weather.current.weather[0].main),weather.current.weather[0].main}
              </div>
            </div>
          </div>
          }   
        </div>
          
        <div className='flex items-center'>
          < Map lat={Number(weather.lat)} lng={Number(weather.lon)} />
        </div>
          
        {/* ITERATING OVER ARRAY AND SEPERATING  */}
          {weather.timezone && 
            
        <div className='flex justify-end'>
              <ul>
                
              {weather.daily.slice(1, 7).map((day) => {
              
               return(
                <div className='forcastSection px-1 py-2 items-center'>
                  <li >
                    <div className='forcastSection px-1 py-2 flex items-center'>{Math.round(day.temp.max)}°F</div>
                    <div>{DateBuilder(new Date(day.dt * 1000))}</div>
                  </li>
                </div>
               )
            })}
          </ul>
        </div>
        }     
      </main>
        </div>
        
    </>
  );
}

export default App;
