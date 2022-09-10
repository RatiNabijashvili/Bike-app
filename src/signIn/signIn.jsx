import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './signIn.module.css'
import Form from '../form/form'
import { database } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {UserContex}  from '../userContex'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState([])
  const {isAdmin, setIsAdmin} = useContext(UserContex)
  const {isUser, setIsUser} = useContext(UserContex)
  const {isAuth, setIsAuth} = useContext(UserContex)
  const navigate = useNavigate()

  const signIn = (e) => {
    e.preventDefault()
    const auth = getAuth()
    const userList = collection(database, 'users')

    const getUserRole = async () => {
      const role = await getDocs(userList)

      role.docs.map((item) => {
        const person = {
          email,
          password,
        }
        setLogin(() => {
          return [...login, person]
        })

        if (item.data().userRole.includes('admin')) {
          if (item.data().email === person.email) {
            setIsAuth(true)
            setIsAdmin(true)
            navigate('/admin/home')
            alert('you successfully login')
          }
        } else if (item.data().userRole.includes('user')) {
          if (item.data().email === person.email) {
            setIsAuth(true)
            setIsUser(true)
            navigate('/user')
            alert('you successfully login')
          }
        }
        return { ...item.data().userRole }
      })
    }

    if (email && password) {
      const person = {
        email,
        password,
      }
      setLogin(() => {
        return [...login, person]
      })
      signInWithEmailAndPassword(auth, person.email, person.password)
        .then((response) => {
          console.log(response.user)
          getUserRole()
        })
        .catch((err) => {
          alert(err.message)
        })

      clearLogForm()
    } else {
      alert('You need to fill every form')
    }
  }


  
  const clearLogForm = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <div className={Styles['log-page']}>
        <div>
          <h2 className={Styles['log-text']}>Login</h2>
        </div>
        <div>
          <Form
            name='Email'
            type='email'
            value={email}
            change={(e) => setEmail(e.target.value)}
          />
          <Form
            name='Password'
            type='password'
            value={password}
            change={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={Styles['btnDiv']}>
            <button className={Styles['login-btn']} onClick={signIn}>
                Login
            </button>
            <Link to='/'>
                <button className={Styles['back-btn']}>
                    Back
                </button>
            </Link>
        </div>
      </div>
  )
}

export default SignIn