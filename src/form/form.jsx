import React, {useContext} from 'react'
import Styles from './form.module.css'
import { UserContex } from '../userContex'

const Form = (props) => {
  const {isEdit, setIsEdit} = useContext( UserContex)

  return (
     <div className={Styles['form-div']}>
      <h2 className={isEdit ? (Styles['form-h2']) : (Styles['form-text'])}>{props.name}</h2>
      <form>
        <input
          type={props.type}
          className={Styles['form-input']}
          value={props.value}
          onChange={props.change}
        />
      </form>
    </div>
  )
}

export default Form