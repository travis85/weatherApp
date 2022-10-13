import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query, updateDoc, getDoc} from "firebase/firestore"; 
import { auth, firestore } from '../utils/firebase'
import { useLocation } from 'react-router-dom';
import './banner.css'


export default function (props) {
    const [citiesFromDb, setCitiesFromDb] = useState([])
    const location = useLocation();
    const navigate = useNavigate()


    const addCity = async () => {
        const cityAdded = prompt('add city')
        const collectionRef = collection(firestore, "users");
        const payload = { FavoriteCities: cityAdded, uid: location.state.uid }
        if (citiesFromDb.length < 4) {
            await addDoc( collectionRef, payload );
        } else {
            alert('Max cities is 4')
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

    const getData = async(props) => {
        const uid = location.state.uid
        const collectionRef = collection(firestore,"users")
        const queryParams = where('uid', '==', uid)
        const citiesQuery = await query(collectionRef, queryParams) 
        onSnapshot(citiesQuery, (snapshot) => {
            setCitiesFromDb(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
        })
    }
    
    const cityWithTemp = citiesFromDb.map(city => {
        return { ...city, temp: '50°F'}
    })
        
    useEffect(() => {
        getData()
       
    },[]);

    return (
        <>
        <div className='main h-40'>
            <ul className='grid grid-cols-4'>
                {cityWithTemp.map((city) => {
                    return (
                        <div className='weatherBox text-white grid grid-rows-2  relative'>
                            <button  onClick={()=> (handleDelete(city.id))} className='absolute top-0 left-0 text-sm ml-2 mt-2 text-red-500'>X</button>
                            <li key={city.id} className='' >
                                {city.FavoriteCities}
                            </li>
                            <li className='text-sm'>
                                {city.temp}
                            </li>
                        </div>                                
                    )
                })}
            </ul>       
            
            <button onClick={addCity} className='text-white absolute top-0 left-0 ml-3 mt-2'>Add City</button>
            <button onClick={handleSignOut} className='text-white absolute top-0 right-0 mr-3 mt-2'>sign out</button>
        </div>
        </>
    )
}
