import { useState, useEffect, useRef } from 'react';
import { query, limit, orderBy, where } from 'firebase/firestore';
import { loadExpenses, expensesReference } from '../service/expense';
import { onSnapshot, startAfter } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

const useGetExpense = () => {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const lastExpense = useRef({});
  const { user } = useAuth();

  const showData = async (snapshot) => {
    try {
      const { data, lastDocument } = await loadExpenses(snapshot);
      
      if (data.length > 0) {
        setExpenses([...expenses, ...data]);
        lastExpense.current = lastDocument;
      }

      if (loading) setLoading(false);

    } catch ({ message }) {
      console.error(message);
    }
  }

  const showError = (error) => {
    console.error(error);
  }

  useEffect(() => {
    const expensesQuery = query(
      expensesReference,
      where('userUid', '==', user.uid),
      orderBy('date', 'desc'),
      startAfter(lastExpense.current),
      limit(1)
    );

    const unsuscribeReference = onSnapshot(
      expensesQuery, showData, showError
    );

    return unsuscribeReference;

  }, [user]);

  return { expenses, loading, user, lastExpense, showData, showError };
}
 
export default useGetExpense;