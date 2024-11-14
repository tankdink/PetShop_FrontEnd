import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthorz } from '../contexts/AuthorzContext';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
  const { userRole, userLoggedIn_ } = useAuthorz();
  const {id} = useParams();
  
    if (userRole === "unknown") { return <div>Loading...</div>; }

    if (requiredRole === "ROLE_ADMIN" && userRole !== "ROLE_ADMIN") 
    {
        console.log("Error role 1");
        return <Navigate to="/error" replace />;
    }
    if (Array.isArray(requiredRole) && !requiredRole.includes(userRole))
    {
        console.log("Error role 2");
        return <Navigate to="/error" replace />;
    }
    
    if ((userRole === "ROLE_USER" || userRole === "ROLE_ACCOUNT_MANAGER") && userLoggedIn_.id !== parseInt(id)) 
    {
        console.log("Error role 3");
        console.log(userLoggedIn_.id !== parseInt(id));
        return <Navigate to="/error" replace />;
    }

  return <Component {...rest} />;

};

export default ProtectedRoute;
