import React from 'react'
import { GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';


export default function Map(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })
  

  const center = { lat: props.lat, lng: props.lng }
  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className='map border-solid border-2 border-white'>
      <GoogleMap
        zoom={5}
        center={center}
        mapContainerStyle={{ width: "500px", height: "300px" }}>
      
        <Marker  position={center}/>

      </GoogleMap>
    </div>
    
  )
}