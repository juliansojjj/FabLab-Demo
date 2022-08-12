import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../features/user/userSlice'
import { useEffect } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()

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
            setError(err)
        })
    }

  return (
    <div className='base'>
        <div className='main'>
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
                    <button type='submit'>Iniciar Sesión</button>
                </form>
                <Link to='/signup'>¿No tenés cuenta? Registrate</Link>
            </div>
    </div>
  )
}

export default Login