import React, {useState, useEffect, useContext } from 'react'
import Styles from './editBicycle.module.css'
import { database } from '../../firebase'
import Form from '../../form/form'
import { doc, updateDoc } from 'firebase/firestore'
import { UserContex } from '../../userContex'


const EditBicycle = (props) => {
    const {isEdit, setIsEdit} = useContext( UserContex)
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [location, setLocation] = useState('')
 

    const editBicycle = (id) => {
        let dataToUpdate = doc(database, 'bicycles', id)
        updateDoc(dataToUpdate, {
        model: model,
        color: color,
        location: location
        })
        alert('you successfully edit bicycle')
        setIsEdit(false)
        props.onDataUpdate()
    }

     useEffect(() => {
        setModel(props.bicycle.model)
        setColor(props.bicycle.color)
        setLocation(props.bicycle.location)
    }, [props])  


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
          <button
            className={Styles['add-btn']}
            onClick={() => editBicycle(props.bicycle.id)}
          >
            Edit
          </button>
          <button
            className={Styles['back-btn']}
            onClick={props.click}
          >
            back
          </button>
        </div>
      </div>
  )
}

export default EditBicycle