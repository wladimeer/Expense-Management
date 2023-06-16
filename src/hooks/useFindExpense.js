import { useEffect, useState } from 'react';
import { findExpense } from '../service/expense';
import { getFormatDateFromUnixTime } from '../utils/functions';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const useFindExpense = (expenseId) => {
  const [expense, setExpense] = useState({});
  const { user: { uid } } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadExpense = async () => {
      try {
        const { status, data } = await findExpense(expenseId);
        
        if (status === 1 && data.userUid === uid) {
          data.date = getFormatDateFromUnixTime(data.date);
          setExpense(data);

        } else {
          navigate('/expense/list');
        }
  
      } catch ({ message }) {
        navigate('/expense/list');
      }
    }

    loadExpense();
    
  }, [expenseId, uid, navigate]);

  return { expense }
}
 
export default useFindExpense;