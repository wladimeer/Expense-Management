import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { user } = useContext(AuthContext);

  return { user };
}
 
export default useAuth;