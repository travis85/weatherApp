import React from 'react'
import { GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';

const containerStyle = {
  width: '50px',
  height: '50px',
}

export default function Map(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })
  

  const center = { lat: props.lat, lng: props.lng }
  if (!isLoaded) return <div>Loading...</div>

  return (
    // <div className='h-48 w-48'>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName={containerStyle}
        >
        <Marker  position={center}/>
      </GoogleMap>
    // </div>
    
  )
}