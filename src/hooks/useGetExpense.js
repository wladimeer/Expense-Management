import { useState, useEffect, useRef } from 'react';
import { query, limit, orderBy, where } from 'firebase/firestore';
import { loadExpenses, expensesReference } from '../service/expense';
import { onSnapshot, startAfter } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

const useGetExpense = () => {
  const lastExpense = useRef({});
  const isLastExpense = useRef(false);
  const subscriptions = useRef([]);

  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  const subscriptionCleanup = () => {
    const { current } = subscriptions;

    current.forEach((subscription) => subscription());
  }

  const showData = async (snapshot) => {
    try {
      const { data, lastDocument } = await loadExpenses(snapshot);
      
      if (data.length > 0) {
        setExpenses([...expenses, ...data]);
        lastExpense.current = lastDocument;

      } else {
        isLastExpense.current = true;
      }

      if (loading) setLoading(false);

    } catch ({ message }) {
      console.error(message);
    }
  }

  const showError = (error) => {
    console.error(error);
  }

  const loadExpenseList = () => {
    const expensesQuery = query(
      expensesReference,
      where('userUid', '==', user.uid),
      orderBy('date', 'desc'),
      startAfter(lastExpense.current),
      limit(1)
    );

    const subscription = onSnapshot(
      expensesQuery, showData, showError
    );

    subscriptions.current = [...subscriptions.current, subscription];
  };

  useEffect(() => {
    loadExpenseList();

    return subscriptionCleanup;

  }, [user]);

  return { expenses, loading, isLastExpense, loadExpenseList };
}
 
export default useGetExpense;