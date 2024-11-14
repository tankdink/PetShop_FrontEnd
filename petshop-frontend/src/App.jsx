import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import GetAllUserComponent from './components/Admin/GetAllUserComponent'
import HeaderComponent from './components/Header_Footer/HeaderComponent'
import FooterComponent from './components/Header_Footer/FooterComponent'
import Add_EditUserComponent from './components/Admin/Add_EditUserComponent'
import LoginComponent from './components/Authentication/login'
import ErrorPageComponent from './components/Error/ErrorPage'
import HomePage from './components/HomePage/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/routes/ProtectedRoutes'
import SignUpComponent from './components/Authentication/SignUp'
import ChangeEmail_PasswordComponent from './components/Authentication/ChangeEmail_Password'

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';  
  return (
    <>
      {!isAuthRoute && <HeaderComponent />}
      
      <Routes>
        {/* PUBLIC PATH */}
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/signup' element={<SignUpComponent />} />
        <Route path='/changeEmail' element={<ChangeEmail_PasswordComponent />} />
        <Route path='/changePassword' element={<ChangeEmail_PasswordComponent />} />
        <Route path='/error' element={<ErrorPageComponent />} />
        <Route path='*' element={<ErrorPageComponent />} />

        {/* ADMIN PATH */}
        <Route 
          path='/admin/userList' 
          element={<ProtectedRoute element={GetAllUserComponent} requiredRole="ROLE_ADMIN" />} 
        />
        <Route 
          path='/admin/addUser' 
          element={<ProtectedRoute element={Add_EditUserComponent} requiredRole="ROLE_ADMIN" />} 
        />
        <Route 
          path='/updateUser/:id' 
          element={<ProtectedRoute element={Add_EditUserComponent} requiredRole={["ROLE_ADMIN", "ROLE_USER", "ROLE_ACCOUNT_MANAGER"]} />} 
        />
        <Route 
          path='/changeInfo/updateUser/:id' 
          element={<ProtectedRoute element={Add_EditUserComponent} requiredRole={["ROLE_ADMIN", "ROLE_USER", "ROLE_ACCOUNT_MANAGER"]} />} 
        />
      </Routes>
      
      <ToastContainer />
      
      {!isAuthRoute && <FooterComponent />}
    </>
  );
}

export default App;
