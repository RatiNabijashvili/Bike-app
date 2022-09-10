import React, { useState, useEffect } from 'react'
import Home from '../home/home'
import Registration from '../registration/registration'
import SignIn from '../signIn/signIn'
import HomeSection from '../adminPage/home/home.jsx'
import Users from '../adminPage/users/users'
import AddUser from '../adminPage/addUser/addUser'
import Bicycles from '../adminPage/bicycles/bicycles'
import AddBicycle from '../adminPage/addBicycle/addBicycle'
import User from '../userPage/user'
import PageNotFound from '../pageNotFound/PageNotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Styles from './app.module.css'
import { UserContex } from '../userContex'

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('isAuth') === 'true'
  )
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('isAdmin') === 'true'
  )
  const [isUser, setIsUser] = useState(
    localStorage.getItem('isUser') === 'true'
  )
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('isAdmin', isAdmin)
    window.localStorage.setItem('isUser', isUser)
    window.localStorage.setItem('isAuth', isAuth)
  }, [isAuth, isAdmin, isUser])

  return (
    <Router>
      <UserContex.Provider
        value={{
          isAdmin,
          setIsAdmin,
          isUser,
          setIsUser,
          isAuth,
          setIsAuth,
          isEdit,
          setIsEdit,
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/signIn' element={<SignIn />} />
          {isAdmin ? (
            <Route path='admin'>
              <Route path='home' element={<HomeSection />} />
              <Route path='users' element={<Users />} />
              <Route path='users/add' element={<AddUser />} />
              <Route path='bicycles' element={<Bicycles />} />
              <Route path='bicycles/add' element={<AddBicycle />} />
            </Route>
          ) : (
            <Route path='*' element={<PageNotFound />} />
          )}
          {isUser ? (
            <Route path='user' element={<User />} />
          ) : (
            <Route path='*' element={<PageNotFound />} />
          )}
        </Routes>
      </UserContex.Provider>
    </Router>
  )
}

export default App
