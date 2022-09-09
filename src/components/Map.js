import React from 'react'
import { GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';


//PASSING DESTRUCTURED PROPS LAT ANND LNG
export default function Map({lat, lng}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'd21dbf4ec7c07da49bc079f1518d953d',
  })
  let center = {lat: lat, lng: lng}

  if (!isLoaded) return <div>Loading...</div>

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