import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthorz } from '../contexts/AuthorzContext';

const ErrorPageComponent = () => {

    const {userLoggedIn_} = useAuthorz();
    const navigator = useNavigate();

    function goBack() 
    {
        navigator('/home')
    }

    return (
        <div>
            <h1>What are you looking for?</h1>
            <p>You don't have enough permission to access this page!</p>
            <button className='btn btn-primary' onClick={goBack}>Go back</button>
        </div>
  )
}

export default ErrorPageComponent