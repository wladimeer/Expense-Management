import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PublicGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  return !user ? <>{children}</> : <Navigate replace to='/' />
}
 
export default PublicGuard;