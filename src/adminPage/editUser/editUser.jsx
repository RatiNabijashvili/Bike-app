import React, { useState, useEffect, useContext } from 'react'
import Styles from './editUser.module.css'
import Form from '../../form/form'
import { database } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { UserContex } from '../../userContex'

const EditUser = (props) => {
  const { isEdit, setIsEdit } = useContext(UserContex)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usersRole, setUsersRole] = useState('')

  const userRole = 'user'
  const adminRole = 'admin'

  const editUser = (id) => {
    let dataToUpdate = doc(database, 'users', id)
    updateDoc(dataToUpdate, {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      userRole: usersRole,
    })
    alert('you successfully edit user')
    setIsEdit(false)
    props.onDataUpdate()
  }

  useEffect(() => {
    setFirstName(props.user.firstName)
    setLastName(props.user.lastName)
    setUsername(props.user.username)
    setEmail(props.user.email)
    setPassword(props.user.password)
    setUsersRole(props.user.userRole)
  }, [props])

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
            value={usersRole}
          >
            <option value={userRole}>{userRole}</option>
            <option value={adminRole}>{adminRole}</option>
          </select>
        </div>
      </div>
      <div className={Styles['btnDiv']}>
        <button
          className={Styles['add-btn']}
          onClick={() => editUser(props.user.id)}
        >
          Edit
        </button>
        <button className={Styles['back-btn']} onClick={props.click}>
          back
        </button>
      </div>
    </div>
  )
}

export default EditUser
