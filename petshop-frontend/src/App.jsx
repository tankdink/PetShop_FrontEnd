import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetAllUserComponent from './components/Admin/GetAllUserComponent'
import HeaderComponent from './components/Header_Footer/HeaderComponent'
import FooterComponent from './components/Header_Footer/FooterComponent'
import Add_EditUserComponent from './components/Admin/Add_EditUserComponent'
import LoginComponent from './components/Authentication/Login'
import ErrorPageComponent from './components/Error/ErrorPage'
import LogoutComponent from './components/Authentication/Logout'
import HomePage from './components/HomePage/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// DeffaultURL = localhost:3000

function App() {
  return ( 
    <>
      <BrowserRouter> 
          <HeaderComponent />

              <Routes>
                  <Route path='/' element= { <GetAllUserComponent /> }> </Route>
                  <Route path='/home' element= { <HomePage /> }> </Route>
                  <Route path='/userList' element= { <GetAllUserComponent /> }> </Route>
                  <Route path='/addUser' element= { <Add_EditUserComponent /> }> </Route>
                  <Route path='/updateUser/:id' element= { <Add_EditUserComponent /> }> </Route>
                  <Route path='/login' element= { <LoginComponent /> }> </Route>
                  <Route path='/logout' element= { <LogoutComponent /> }> </Route>
                  <Route path='*' element= { <ErrorPageComponent /> }> </Route>
                  
              </Routes>
            <ToastContainer />
          <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
