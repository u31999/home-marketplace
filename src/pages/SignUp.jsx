import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from "react-toastify"
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import GoogleOAuth from "../component/GoogleOAuth"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {name, email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword
      (auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })


      const forDataCopy = {...formData}
      delete forDataCopy.password
      forDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), forDataCopy)

      navigate('/')

    } catch(error) {
      toast.error('Somthing Went Rong')
    }
  }

  // Fix the margin for sign up
  const inputMarginStyle = {
    marginBottom: '1rem'
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
           <input type='text' className="nameInput" 
            placeholder="Your Name" id="name" value={name}
            onChange={onChange} 
              style={inputMarginStyle}
            />

            <input type='email' className="emailInput" 
            placeholder="Email" id="email" value={email}
            onChange={onChange} 
            style={inputMarginStyle}
            />

            <div className="passwordInputDiv" style={inputMarginStyle}>
              <input type={showPassword ? 'text' : 'password'}
              className='passwordInput' placeholder="Password"
              id="password" value={password} onChange={onChange} 
              style={{marginBottom: '0rem'}}
              />
              <img src={visibilityIcon} 
              className="showPassword" alt="show password" 
              onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to='/forgot-password' className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          
          <GoogleOAuth />
          <Link to='/sign-in' className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
