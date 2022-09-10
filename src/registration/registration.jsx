import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../form/form'
import Styles from './registration.module.css'
import { database } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const Registration = () => {
  const auth = getAuth()
  const collectionRef = collection(database, 'users')
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState([])
  const userRole = 'user'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (firstName && lastName && username && email && password) {
      navigate('/Bike-app')
      const person = {
        firstName,
        lastName,
        username,
        email,
        password,
      }
      setUser(() => {
        return [...user, person]
      })
      createUserWithEmailAndPassword(auth, person.email, person.password)
        .then((response) => {
          console.log(response.user)
          addDoc(collectionRef, {
            firstName: person.firstName,
            lastName: person.lastName,
            username: person.username,
            email: person.email,
            password: person.password,
            userRole: userRole,
          })
            .then(() => {
              alert('you successfully registered')
            })
            .catch((err) => {
              alert(err.message)
            })
        })
        .catch((err) => {
          alert(err.message)
        })

      clearRegForm()
    } else {
      alert('You need to fill every form')
    }
  }

  const clearRegForm = () => {
    setFirstName('')
    setLastName('')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className={Styles['reg-page']}>
      <div>
        <h2 className={Styles['reg-text']}>Registration</h2>
      </div>
      <div>
        <Form
          name='First Name'
          type='text'
          value={firstName}
          change={(e) => setFirstName(e.target.value)}
        />
        <Form
          name='Last Name'
          type='text'
          value={lastName}
          change={(e) => setLastName(e.target.value)}
        />
        <Form
          name='Username'
          type='text'
          value={username}
          change={(e) => setUsername(e.target.value)}
        />
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
        <button className={Styles['registration-btn']} onClick={handleSubmit}>
          Register
        </button>
        <Link to='/Bike-app'>
          <button className={Styles['back-btn']} onClick={() => clearRegForm()}>
            Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Registration
