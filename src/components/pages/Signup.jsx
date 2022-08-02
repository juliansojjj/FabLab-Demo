import React from 'react'
import { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()

    const handleChange = (e)=>{
        const name = e.target.name
        const input = e.target.value
        if (name == 'email' && input){
            setEmail(input)
        }
        if (name == 'password' && input){
            setPassword(input)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(email && password){
            createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
                const user = userCredential.user;
                console.log(user)
                navigate('/login')
            }).catch(err=>{
                console.log(err)
                setError(err.message)
            })
        }
    }

  return (
    <div className='base'>
        <div className='main'>
            {error == 'Firebase: Password should be at least 6 characters (auth/weak-password).' ? 'La contraseña debe tener 6 caracteres como mínimo' : ''}
            {error == 'Firebase: Error (auth/email-already-in-use).' ? 'Este mail ya ha sido registrado' : ''}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='user@mail.com'
                name='email'
                onChange={handleChange}
                value={email}
                required
                />
                <input type="password" placeholder='******'
                name='password'
                onChange={handleChange}
                value={password}
                required
                />
                <button type='submit' >Registrarse</button>
                <Link to='/login'>¿Ya tenés cuenta? Iniciá sesión</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup