import { useState } from 'react'
import React from 'react'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query, updateDoc, connectFirestoreEmulator} from "firebase/firestore"; 



export default  function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [userName, setUserName] = useState('')

    // const [user, setUser] = useState({
    //     email: '',
    //     uid: '',
    //     userName: '',
    // })

    async function handleRegister(){
        // setShowRegister(false)
        const res = await createUserWithEmailAndPassword(auth, email, password) 
        setEmail('')
        setPassword('')
        alert('Your Registered, You can now sign in!')
        console.log(res)
    }

    function updateEmail(event){
        setEmail(event.target.value)
    }
    function updatePassword(event){
        setPassword(event.target.value)
    }

    // const onClickHandler = async () =>{
    //     const collectionRef = collection(firestore, "users");
    //     const payload = { note: note, uid:user.uid }
    //     await addDoc( collectionRef, payload );
    //     setNote('');
    // }


    

    // function handleLogOut(){
    //     setUser({
    //     email: '',
    //     uid: '',
    //     userName: '',
    //     })
    //     alert('Your logged out')

    // }




  return (
      

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
  )
}


