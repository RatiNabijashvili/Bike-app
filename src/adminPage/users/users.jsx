import React, { useState, useEffect, useContext } from 'react'
import Styles from './users.module.css'
import Nav from '../../nav/Nav'
import EditUser from '../editUser/editUser'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../firebase'
import { doc, getDocs, deleteDoc, collection } from 'firebase/firestore'
import { UserContex } from '../../userContex'

const Users = () => {
  const [users, setUsers] = useState([])
  const [userIndex, setUserIndex] = useState(0)
  const collectionRef = collection(database, 'users')
  const { isEdit, setIsEdit } = useContext(UserContex)
  const navigate = useNavigate()
  const getUserData = async () => {
    const data = await getDocs(collectionRef)
    setUsers(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })
    )
  }

  useEffect(() => {
    getUserData()
  }, [])

  const deleteUser = (id) => {
    let dataToDelete = doc(database, 'users', id)
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data Deleted')
        getUserData()
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div>
      <Nav />
      <div className={Styles['users-section']}>
        <div>
          <div className={Styles['user-nav']}>
            <h2 className={Styles['userNav-h2']}>User Tracker</h2>
            <Link to='/admin/users/add'>
              <button className={Styles['add-btn']}>Add</button>
            </Link>
          </div>
          <div>
            <div>
              <ul>
                {users.map((info, index) => {
                  const { username, firstName, lastName } = info
                  return (
                    <li key={username}>
                      <div className={Styles['user-list']}>
                        <h2 className={Styles['name']}>
                          {firstName} {lastName}
                        </h2>
                        <div>
                          <button
                            className={Styles['edit-btn']}
                            onClick={() => {
                              setUserIndex(index)
                              setIsEdit(true)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className={Styles['delete-btn']}
                            onClick={() => deleteUser(info.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={Styles['edit-page']}
          style={{ display: isEdit ? 'block' : 'none' }}
        >
          {users.length > 0 && (
            <EditUser
              user={users[userIndex]}
              onDataUpdate={getUserData}
              click={() => setIsEdit(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
