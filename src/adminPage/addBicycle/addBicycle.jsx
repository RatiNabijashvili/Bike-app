import React, {useState}  from 'react'
import Styles from './addBicycle.module.css'
import Form from '../../form/form'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

const AddBicycle = () => {
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [location, setLocation] = useState('')

    const bicycleRef = collection(database, 'bicycles')
    const navigate = useNavigate()


    const addBicycle = async () => {
        if(model && color && location) {
            navigate('/admin/bicycles')
            const docRef = doc(bicycleRef)
            await setDoc(docRef, {
                model,
                color,
                location,
            })
        }else {
            alert('You need to fill everything')
        }
        clearBicycleAddForm()
    } 
    
    const clearBicycleAddForm = () => {
        setModel('')
        setColor('')
        setLocation('')
    }

  return (
     <div className={Styles['changeData-div']}>
        <div>
          <Form
            name='Model'
            type='text'
            value={model}
            change={(e) => setModel(e.target.value)}
          />
          <Form
            name='Color'
            type='text'
            value={color}
            change={(e) => setColor(e.target.value)}
          />
          <Form
            name='Location'
            type='text'
            value={location}
            change={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className={Styles['btnDiv']}>
          <button className={Styles['add-btn']} onClick={addBicycle}>
            Add
          </button>
          <Link to='/admin/bicycles'>
            <button
            className={Styles['back-btn']}
            onClick={() => clearBicycleAddForm()}
          >
            Back
          </button>
          </Link>
        </div>
      </div>
  )
}

export default AddBicycle