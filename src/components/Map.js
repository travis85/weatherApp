import React from 'react'
import { GoogleMap, Marker, useLoadScript,  } from '@react-google-maps/api';
const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY

//PASSING DESTRUCTURED PROPS LAT ANND LNG
export default function Map({ lat, lng }) {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  })
  if (!isLoaded) return <div> Map Loading...</div>

  let center = {lat: lat, lng: lng}


  return (
    <div className='map border-solid border-2 border-white'>
      <GoogleMap
        zoom={6}
        center={center}
        mapContainerStyle={{ width: "500px", height: "300px" }}>
        <Marker position={center}/>
      </GoogleMap>
    </div>
    
  )


}