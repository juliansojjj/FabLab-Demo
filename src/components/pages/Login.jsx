import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import './Sign.css'
import Logo from '../../icons/logo.svg'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()
    const signErrorMsg = ['Firebase: Error (auth/user-not-found).',
                          'Firebase: Error (auth/wrong-password).']

    const handleChange = (e)=>{
        const name = e.target.name
        const input = e.target.value
        if (name == 'email'){
            setEmail(input)
        }
        if (name == 'password'){
            setPassword(input)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            const user = userCredential.user
            const id = userCredential.user.uid
            navigate('/')

        }).catch((err)=>{
            console.log(err.message)
            setError(err.message)
        })
    }

  return (
    <div className='base-sign'>
        <div className='presentation-container'>
            <img src={Logo} alt="FabLab" className='presentation-img'/>
        </div>
        <div className='main'>
            <form onSubmit={handleSubmit} className='sign-form'>
                    <h2 className='sign-form--title'>Iniciar Sesión</h2>
                    <span className='sign-form--subtitle'>Mail</span>
                    <input type="email" placeholder='user@mail.com'
                    name='email'
                    onChange={handleChange}
                    value={email}
                    required
                    className='sign-form--input'
                    />
                    <span className='sign-form--subtitle'>Contraseña</span>
                    <input type="password" placeholder='******'
                    name='password'
                    onChange={handleChange}
                    value={password}
                    className='sign-form--input'
                    required
                    />
                    {error 
                    ? <span className='sign-form--error'>
                        {error == signErrorMsg[0] 
                        ? 'Usuario no encontrado'
                        : error == signErrorMsg[1] 
                        ? 'Contraseña incorrecta'
                        : error}
                      </span>
                    : ''}
                    <button type='submit' className='sign-form--btn'>Iniciar Sesión</button>
                    <Link to='/signup' className='sign-redirect'>¿No tenés cuenta? Registrate</Link>
                </form>
                </div>
    </div>
  )
}

export default Login