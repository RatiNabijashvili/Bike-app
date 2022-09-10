import React, { useState } from 'react'
import Styles from './addUser.module.css'
import Form from '../../form/form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'
import { database } from '../../firebase'
import { collection } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const AddUser = () => {
  const { id } = useParams()
  console.log(id)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usersRole, setUsersRole] = useState('')
  const [user, setUser] = useState([])

  const userRole = 'user'
  const adminRole = 'admin'
  const collectionRef = collection(database, 'users')
  const auth = getAuth()
  const navigate = useNavigate()

  const addUser = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    if (
      firstName == '' ||
      lastName == '' ||
      username == '' ||
      email == '' ||
      password == ''
    ) {
      alert('please enter data')
      return
    }
    if (firstName && lastName && username && email && password) {
      navigate('/admin/users')
      const person = {
        firstName,
        lastName,
        username,
        email,
        password,
        usersRole,
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
            userRole: person.usersRole,
          })
            .then(() => {
              alert('you succesfully add user')
              window.location.reload()
            })
            .catch((err) => {
              alert(err.message)
            })
        })
        .catch((err) => {
          alert(err.message)
        })

      clearAddForm()
    } else {
      alert('You need to fill everything')
    }
  }

  const clearAddForm = () => {
    navigate('/admin/users')
    setFirstName('')
    setLastName('')
    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className={Styles['changeData-div']}>
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
        <div className={Styles['form-div']}>
          <h2 className={Styles['form-text']}>Role</h2>
          <select
            className={Styles.select}
            onChange={(e) => setUsersRole(e.target.value)}
          >
            <option value=''>select</option>
            <option value={userRole}>{userRole}</option>
            <option value={adminRole}>{adminRole}</option>
          </select>
        </div>
      </div>
      <div className={Styles['btnDiv']}>
        <button className={Styles['registration-btn']} onClick={addUser}>
          Add
        </button>
        <button
          className={Styles['back-btn']}
          onClick={() => clearAddForm(user.id)}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default AddUser
