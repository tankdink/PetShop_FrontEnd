import { createContext, useContext, useState } from 'react';

const AuthorzContext = createContext();

export const AuthorzProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('unknown'); 
  const [userLoggedIn_, setUserLoggedIn_] = useState({}); 

  return (
    <AuthorzContext.Provider value={{ userRole, setUserRole, userLoggedIn_, setUserLoggedIn_ }}>
      {children}
    </AuthorzContext.Provider>
  );
};

export const useAuthorz = () => useContext(AuthorzContext);
