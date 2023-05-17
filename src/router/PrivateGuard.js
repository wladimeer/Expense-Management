import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? <>{children}</> : <Navigate replace to='/sign-in' />
}
 
export default PrivateGuard;