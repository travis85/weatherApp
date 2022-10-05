import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Register from './Register'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'




export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [register, showRegister] = useState(false)
  const [user, setUser] = useState({
    email: '',
    uid: '',
  })

  const navigate = useNavigate()
  function propsToNextPage() {
    console.log(user.uid,'here')
    navigate('/WeatherInfo', { state: { uid: user.uid, userName: user.userName } })
    
  }

  function clearError() {
    setTimeout(() => {
      setErrorMessage('')
    },3000)
  }


  function handleUserRecieved(user){
    console.log(user)
    
    setUser({
      email: user.email,
      uid: user.uid,
    })
    
  }
  
  async function handleSignIn() {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      handleUserRecieved(res.user)
      
    } catch (error) {
      setErrorMessage('Sign In Error')
      clearError()
    }
  }

  function updateEmail(event){
    setEmail(event.target.value)
  }
  function updatePassword(event){
    setPassword(event.target.value)
  }

  return (
    <>
      <div className='grid grid-cols-1 place-items-center md:mt-10 p-32  bg-gradient-to-t from-gray-600 to-blue-800 rounded'>
        <input
          className='bg-gray-400 border-white border-solid px-4 py-2 placeholder-white mb-2'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}>
        </input>
        
        <input
          className='bg-gray-400 border-white border-solid px-4 py-2  placeholder-white'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}>
        </input>
        
        <button className='text-white hover:text-slate-400' onClick={() => (handleSignIn())}>Sign In</button>
        
        {!register &&
          <button className='text-white hover:text-slate-400' onClick={() => showRegister(true)}>Register?</button>
        }
        {register &&
          <Register />
        }
        <p className='text-red-500'>{ errorMessage }</p>
      </div>
      {user.uid &&
        propsToNextPage() 
      }
    </>
  )
}
