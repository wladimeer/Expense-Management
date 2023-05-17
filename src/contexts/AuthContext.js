import { onAuthStateChanged } from '../service/user';
import React, { useEffect, createContext, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
      setLoading(false);
    });

    return subscription;
  }, []);
  
  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
 
export { AuthContext, AuthProvider };