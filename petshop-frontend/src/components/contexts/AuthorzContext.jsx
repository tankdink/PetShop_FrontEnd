import { createContext, useContext, useState } from 'react';

const AuthorzContext = createContext();

export const AuthorzProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('unknown'); //Name
  const [userRoleId, setUserRoleId] = useState('unknown'); //Role ID
  const [userLoggedIn_, setUserLoggedIn_] = useState({}); 


  return (
    <AuthorzContext.Provider value={{ userRole, setUserRole, userLoggedIn_, setUserLoggedIn_, userRoleId, setUserRoleId }}>
      {children}
    </AuthorzContext.Provider>
  );
};

export const useAuthorz = () => useContext(AuthorzContext);
