import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import { loggedInData } from '../../services/Authentication';

const HomePage = () => {

    const [userLoggedIn, setUserLoggedIn] = useState({});
    const isFirstRender = useRef(true);

    function greetNoti()
    {
        toast.info(`Welcome ${userLoggedIn?.firstName} ${userLoggedIn?.lastName}`, {
            position: "top-right",
            autoClose: 3000,
        });
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loggedInData().then(response => {
                setUserLoggedIn(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
        
    }, []);

    useEffect(() => {
        if (userLoggedIn?.firstName) {
            greetNoti();
        }
    }, [userLoggedIn]);

    
    

  return (
    <div>
        <p>{userLoggedIn?.email}--{userLoggedIn?.password}-{userLoggedIn.role?.name}</p>
        Home
    </div>
  )
}

export default HomePage