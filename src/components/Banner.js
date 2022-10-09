import React, { useState, useEffect } from 'react'
import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query, updateDoc, getDoc} from "firebase/firestore"; 
import { firestore } from '../utils/firebase'
import {useLocation} from 'react-router-dom';
import { signOut } from 'firebase/auth'

export default function (props) {
    const [citiesFromDb, setCitiesFromDb] = useState([])
    const [city, setCities] = useState('')
    const [weather, setWeather] = useState([])
    const location = useLocation();

    function updateCities(event) {
        setCities(event.target.value)
    }
    const onClickHandler = async () =>{
        const collectionRef = collection(firestore, "users");
        const payload = { FavoriteCities: city, uid: location.state.uid}
        console.log(location.state.uid)
        setCities('')
        await addDoc( collectionRef, payload );
    }
    const handleSignOut = () => {
        signOut()
    }
    useEffect(() => {
        const getData = async() => {
            const uid = location.state.uid
            const collectionRef = collection(firestore,"users")
            const queryParams = where('uid', '==', uid)
            const citiesQuery = await query(collectionRef, queryParams) 
            onSnapshot(citiesQuery, (snapshot) => {
                setCitiesFromDb(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
            })
            console.log(citiesFromDb,'USEEFFECT (BANNER COMPONENT)')
        }
        getData()

        const fetchWeather = () => { //CALL FECTH TEMP AND ADD TO OBJECT
            setWeather(
                citiesFromDb.map((city) => {
                console.log(props.fetchTemp(city.FavoriteCities),'HERE')
            }))
            console.log(weather, 'FETCHWEATHER-BANNER')
        }
        fetchWeather()
    },[]);

    return (
        <>
        <div >
            <ul className='grid grid-cols-4'>
                {citiesFromDb.map((city) => {
                    return (
                        
                        <div className='text-white '>
                            <li key={city.id} >
                                {city.FavoriteCities}
                                {props.fetchTemp(city.FavoriteCities)}
                            </li>
                        </div>                                
                    )
                })}
                {
                        
                }
            
            </ul>
        </div>
        <div>
            <input onChange={updateCities}></input>
            <button onClick={onClickHandler}>Add City</button>
            </div> 
            <div>
                <button onClick={handleSignOut}>sign out</button>
            </div>
        </>
    )
}
