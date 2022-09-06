import React from 'react'
import rainPic from '../assets/rainPic.jpeg'
import sunPic from '../assets/sunPic.webp'
import snowPic from '../assets/snowPic.jpeg'
import cloudPic from '../assets/cloudPic.jpeg'
import mistPhoto from '../assets/mistPhoto.webp'
import thunderstormPic from '../assets/thunderstormPic.jpeg'


function weatherSet(weather) {
      const weatherStyle = document.querySelector('.app')
    if (weather === 'Rain') {
      weatherStyle.style.setProperty('background-image',`url(${rainPic})`)
    } else if (weather === 'Clear') {
      weatherStyle.style.setProperty('background-image',`url(${sunPic})`)
    } else if (weather === 'Snow') {
      weatherStyle.style.setProperty('background-image',`url(${snowPic})`)
    } else if (weather === 'Clouds') {
      weatherStyle.style.setProperty('background-image',`url(${cloudPic})`)
    } else if (weather === 'Thunderstorm') {
      weatherStyle.style.setProperty('background-image',`url(${thunderstormPic})`)
    }else if (weather === 'Mist') {
      weatherStyle.style.setProperty('background-image',`url(${mistPhoto})`)
    }

}

export default weatherSet