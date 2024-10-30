import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {

    const navigator = useNavigate();

    useEffect(() => {
        localStorage.removeItem('jwtToken');
    }, [navigator]);

  return (
    <div>
        <button onClick={() => navigator('/login')}>Logout</button>
    </div>
  )
}

export default LogoutComponent
