import React, { useState, useEffect, useContext } from 'react'
import Nav from '../../nav/Nav'
import EditBicycle from '../editBicycle/editBicycle'
import Styles from './bicycles.module.css'
import { Link } from 'react-router-dom'
import { database } from '../../firebase'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore'
import { UserContex } from '../../userContex'

const Bicycles = () => {
  const [bicycle, setBicycle] = useState([])
  const [bicycleIndex, setBicycleIndex] = useState(0)
  const { isEdit, setIsEdit } = useContext(UserContex)

  const bicycleRef = collection(database, 'bicycles')

  const getBicycleData = async () => {
    const data = await getDocs(bicycleRef)
    setBicycle(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id }
      })
    )
  }

  useEffect(() => {
    getBicycleData()
  }, [])

  const deleteBicycle = (id) => {
    let dataToDelete = doc(database, 'bicycles', id)
    deleteDoc(dataToDelete)
      .then(() => {
        alert('Data Deleted')
        getBicycleData()
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div>
      <Nav />
      <div className={Styles['bicycle-section']}>
        <div>
          <div className={Styles['user-nav']}>
            <h2 className={Styles['userNav-h2']}>Bicycles List</h2>
            <Link to='/admin/bicycles/add'>
              <button className={Styles['add-btn']}>Add</button>
            </Link>
          </div>
          <div>
            <ul>
              {bicycle.map((info, index) => {
                const { model, color } = info
                return (
                  <li key={index}>
                    <div className={Styles['user-list']}>
                      <h2 className={Styles['name']}>
                        {model} {color}
                      </h2>
                      <div>
                        <button
                          className={Styles['edit-btn']}
                          onClick={() => {
                            setBicycleIndex(index)
                            setIsEdit(true)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className={Styles['delete-btn']}
                          onClick={() => deleteBicycle(info.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div
              className={Styles['edit-page']}
              style={{ display: isEdit ? 'block' : 'none' }}
            >
              {bicycle.length > 0 && (
                <EditBicycle
                  bicycle={bicycle[bicycleIndex]}
                  onDataUpdate={getBicycleData}
                  click={() => setIsEdit(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bicycles
