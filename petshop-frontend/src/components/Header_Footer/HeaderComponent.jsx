import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { loggedInData } from '../../services/Authentication';
import { toast } from 'react-toastify';
import { useAuthorz } from '../contexts/AuthorzContext';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

  const isFirstRender = useRef(true);
  const { userRole ,setUserRole, setUserLoggedIn_, userLoggedIn_ } = useAuthorz();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin"); 
  const navigator = useNavigate();

//   useEffect(() => {
//     if (isFirstRender.current)
//     {
//         isFirstRender.current = false;
//         loggedInData().then(response => {
//             setUserRole(response.data?.role?.name);
//             setUserLoggedIn_(response.data);
//       })
//       .catch(error => {
//           toast.error(error.response?.data);
//           navigator("/login");
//       });
//     }
// }, []);

useEffect(() => {
  
      loggedInData().then(response => {
          setUserRole(response.data?.role?.name);
          setUserLoggedIn_(response.data);
    })
    .catch(error => {
        if (isFirstRender.current)
        {
          isFirstRender.current = false;
          toast.error(error.response?.data);
        }
        // navigator("/login");
    });
}, []);


  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-primary'>
              {isAdminRoute ? 
                <a className='navbar-brand' href='/admin/userList'>Users Manager System for {userRole.split('_')[1]} </a> 
                : <a className='navbar-brand' href='/home'> Welcome customers!</a>
              }
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent