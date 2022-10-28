import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query } from "firebase/firestore"; 
import { auth, firestore } from '../utils/firebase'
import { useLocation } from 'react-router-dom';
import './banner.css'
    const weatherApi = {//regenerate keys for both weather and map and update
        key: process.env.REACT_APP_WEATHER_KEY,//TODO ,env
        base: "https://api.openweathermap.org/data/2.5/"
    }

    const geoCodeApi ={
        key: process.env.REACT_APP_WEATHER_KEY,
        base: "https://api.openweathermap.org/geo/1.0/"
    }


export default function Banner() {
    const [citiesFromDb, setCitiesFromDb] = useState([])
    const [completeCities, setCompleteCities] = useState([])
    
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, []);//EMPTY ARRAY ONLY RUNS ONCE
    
    useEffect(() => {
        getTemp()
    },[citiesFromDb])//THIS USEEFFECT RUNS WHENEVER CITIESFROMDB CHANGES
    
    const addCity = async () => { //ADDS FAVORITE CITY TO DB
        let cityAdded = prompt('add city').split(' ')
        cityAdded = cityAdded.map((city) => {
            return city[0].toUpperCase() + city.substring(1).toLowerCase()
        }).join(' ')
        const collectionRef = collection(firestore, "users");
        const payload = { FavoriteCities: cityAdded, uid: location.state.uid }
        if (citiesFromDb.length < 4) {
            if (cityAdded.length > 0) {
                await addDoc( collectionRef, payload );
            }
        } else {
            alert('City Limit Is 4')
        }
    }

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigate('/', { state: { uid: '' } })
            console.log('user logged out')
        })
    }

    const handleDelete = async(id) => { 
        const docRef = doc(firestore, "users",id);
        await deleteDoc(docRef)
    }

    const getData = async () => { //GETTING FAVORITE CITY FROM DB
        const uid = location.state.uid
        const collectionRef = collection(firestore,"users")
        const queryParams = where('uid', '==', uid)
        const citiesQuery = await query(collectionRef, queryParams) 
        onSnapshot(citiesQuery, (snapshot) => {
            setCitiesFromDb(snapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id}
            )));
        })
    }

    const getTemp = async () => {
        let citiesWithTemp = []
        for (let i = 0; i < citiesFromDb.length; i++){
            const data = await fetch(`${geoCodeApi.base}direct?q=${citiesFromDb[i].FavoriteCities}&limit=1&appid=${geoCodeApi.key}`)
            const res = await data.json()
            const tempData = await fetch(`${weatherApi.base}onecall?lat=${res[0].lat}&lon=${res[0].lon}&units=imperial&appid=${weatherApi.key}`)
            const tempRes = await tempData.json()
            const temp = Math.round(tempRes.current.temp)
            const city = Object.assign(citiesFromDb[i], { temp: temp.toString() })
            citiesWithTemp.push(city)
            
            //USED FOR LOOP BC CANT DO ASYNC AWAIT INSIDE MAP OR FOREACH
        }
       
        setCompleteCities(citiesWithTemp)
    }
    
   
    return (
        <>
            <div className='main h-40'>
                
            <ul className='grid grid-cols-4'>
                    {completeCities.map(city => {
                    return (
                        <div className='weatherBox text-white grid grid-rows-2 relative h-24' key={city.id}>
                            <button  onClick={()=> (handleDelete(city.id))} className='absolute top-0 left-0 text-sm ml-2 mt-2 text-red-500'>X</button>
                            <li >
                                {city.FavoriteCities}<br></br>
                                {city.temp}°F
                            </li>
                        </div>                                
                    )
                })}
            </ul>       
            
            <button onClick={addCity} className='text-white absolute top-0 left-0 ml-3 mt-2 hover:text-black'>Add City</button>
            <button onClick={handleSignOut} className='text-white absolute top-0 right-0 mr-3 mt-2 hover:text-black'>Sign Out</button>
        </div>
        </>
    )
}
