import { useState } from 'react'
import React from 'react'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import loginValidation from './loginValidationRules'


export default  function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    async function handleRegister() {
        const values = {
            email: email,
            password: password
        }
        const errorsArray = Object.keys(loginValidation(values))
        
        if (errorsArray.length > 0){
            const newArray = Object.values(loginValidation(values))
            setErrors(errors => [...errors, newArray])
            clearError()
        } else {
            const res = await createUserWithEmailAndPassword(auth, email, password) 
            setEmail('')
            setPassword('')
            alert('Your Registered, You can now sign in!')
        }
    }

    function clearError() {
        setTimeout(() => {
        setErrors([])
        },3000)
    }

    function updateEmail(event){
        setEmail(event.target.value)
    }
    function updatePassword(event){
        setPassword(event.target.value)
    }

    return (
        <>
        <div>
            <input
                className='bg-gray-400 border-white border-solid px-4 py-2 rounded placeholder-white'
                type=' text'
                placeholder='Register Email'
                value={email}
                onChange={updateEmail}>
            </input>
            <input
                className='bg-gray-400 border-white border-solid px-4 py-2 m-4 placeholder-white rounded'
                type='password'
                placeholder='Register Password'
                value={password}
                onChange={updatePassword}>
            </input>
            <button className='text-white hover:text-slate-400' onClick={()=> (handleRegister())}>Register</button>
        </div>
        <ul>
            {errors.flat(1).map((error,index) => {
                return (
                    <li key={index}>
                        {error}
                    </li> 
                )
            })}
        </ul>
        </>
    )
}


