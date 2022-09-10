import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import Styles from './Nav.module.css'
import { UserContex } from '../userContex'

const Nav = () => {
  const { isAdmin, setIsAdmin, isUser, setIsUser, isAuth, setIsAuth } =
    useContext(UserContex)

  const auth = getAuth()
  const navigate = useNavigate()

  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert('successfully log out')
        navigate('/Bike-app')
        setIsAuth(false)
        setIsAdmin(false)
        setIsUser(false)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div>
      <div className={Styles['main-div']}>
        <div>
          <h2 className={Styles.logo}>Bike Rental</h2>
        </div>
        {isAuth ? (
          isAdmin ? (
            <div className={Styles['nav-components']}>
              <Link to='/admin/home'>
                <h2 className={Styles['nav-h2']}>Home</h2>
              </Link>
              <Link to='/admin/users'>
                <h2 className={Styles['nav-h2']}>Users</h2>
              </Link>
              <Link to='/admin/bicycles'>
                <h2 className={Styles['nav-h2']}>Bicycles</h2>
              </Link>
              <button className={Styles['log-btn']} onClick={logOut}>
                Log out
              </button>
            </div>
          ) : (
            <div>
              <button className={Styles['log-btn']} onClick={logOut}>
                Log out
              </button>
            </div>
          )
        ) : (
          <div>
            <Link to='registration'>
              <button className={Styles['reg-btn']}>Create an account</button>
            </Link>
            <Link to='signIn'>
              <button className={Styles['log-btn']}>Sign in</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav
