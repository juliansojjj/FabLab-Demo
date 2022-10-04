import React,{useEffect} from 'react'
import { useState } from 'react'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import './Sign.css'
import Logo from '../../icons/logo.svg'

const Signup = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [repeatPassword,setRepeatPassword] = useState()
    const [user,setUser] = useState()
    const [error,setError] = useState()
    const errorSignMsg = ['Firebase: Password should be at least 6 characters (auth/weak-password).',
                          'Firebase: Error (auth/email-already-in-use).']

    const handleChange = (e)=>{
        const name = e.target.name
        const input = e.target.value
        if (name == 'email'){
            setEmail(input)
        }
        if (name == 'password'){
            setPassword(input)
        }
        if (name == 'repeatPassword'){
            setRepeatPassword(input)
        }
        if(name == 'user'){
            setUser(input)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(email && password && repeatPassword){
            if(password.length < 6 || repeatPassword.length < 6){setError('Las contraseñas deben tener 6 caracteres como mínimo')}
            else if(password == repeatPassword){
                createUserWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
                    setError()
                    const info = userCredential.user
                    const email = info.email
                    const id = info.uid
                    console.log(info)
                    console.log(email)
                    console.log(id)
                    await setDoc(doc(db,'Users',id),
                        {user:user,
                        email:email,
                        admin:'false'})
                        .then(()=>{
                            signOut(auth)
                            .then(()=>{
                                navigate('/login')})
                    })
                }).catch(err=>{
                    console.log(err)
                    setError(err.message)
                })
            }else{setError('Las contraseñas no coinciden')}
        } 
    }

  return (
    <div className='base-sign'>
        <div className='presentation-container'>
            <img src={Logo} alt="FabLab" className='presentation-img'/>
        </div>
        <div className='main'>
            <form onSubmit={handleSubmit} className='sign-form'>
                <h2 className='sign-form--title'>Registrarse</h2>
                <span className='sign-form--subtitle'>Nombre</span>
                <input type="text" placeholder='Your Name'
                name='user'
                onChange={handleChange}
                value={user}
                className='sign-form--input'
                required
                />
                <span className='sign-form--subtitle'>Mail</span>
                <input type="email" placeholder='user@mail.com'
                name='email'
                onChange={handleChange}
                value={email}
                className='sign-form--input'
                required
                />
                <span className='sign-form--subtitle'>Contraseña</span>
                <input type="password" placeholder='******'
                name='password'
                onChange={handleChange}
                value={password}
                className='sign-form--input'
                required
                />
                <span className='sign-form--subtitle'>Repetir contraseña</span>
                <input type="password" placeholder='******'
                name='repeatPassword'
                onChange={handleChange}
                value={repeatPassword}
                className='sign-form--input'
                required
                />
                {error 
                    ?   <span className='sign-form--error'>
                            {error == errorSignMsg[0] 
                            ? 'La contraseña debe tener 6 caracteres'
                            : error == errorSignMsg[1] 
                            ? 'Mail ya en uso' 
                            : error}
                        </span> 
                    : ''}
                <button type='submit' className='sign-form--btn'>Registrarse</button>
                <Link to='/login' className='sign-redirect'>¿Ya tenés cuenta? Iniciá sesión</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup