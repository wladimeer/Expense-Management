import { useState, useEffect, useRef } from 'react';
import { query, limit, orderBy, where } from 'firebase/firestore';
import { onSnapshot, startAfter } from 'firebase/firestore';
import { expensesReference } from '../service/expense';
import useAuth from '../hooks/useAuth';

const useGetExpense = () => {
  const lastExpense = useRef({});
  const expenseListRef = useRef([]);
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
      const docChanges = snapshot.docChanges();

      docChanges.forEach(({ doc, type }) => {
        if (type === 'added') {
          const exist = expenseListRef.current.find((e) => e.id === doc.id);
          if (!exist) expenseListRef.current.push(doc);
        }
  
        if (type === 'modified') {
          const index = expenseListRef.current.findIndex((e) => e.id === doc.id);
          if (index !== -1) expenseListRef.current.splice(index, 1, doc);
        }
  
        if (type === 'removed') {
          const index = expenseListRef.current.findIndex((e) => e.id === doc.id);
          if (index !== -1) expenseListRef.current.splice(index, 1);
        }
      });

      const arrayRef = [...expenseListRef.current].map((doc) => ({
        ...doc.data(),
        id: doc.id, category: JSON.parse(doc.get('category'))
      }));

      setExpenses(arrayRef);

      if (expenseListRef.current.length > 0) {
        const doc = [...expenseListRef.current].pop();
        lastExpense.current = doc;

      } else {
        lastExpense.current = {};
      }

      if (docChanges.length === 0) isLastExpense.current = true;

      setLoading(false);

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

    const { current } = subscriptions;

    subscriptions.current = [...current, subscription];
  };

  useEffect(() => {
    loadExpenseList();

    return subscriptionCleanup;

  }, [user]);

  return {
    expenses, loading, isLastExpense: isLastExpense.current,
    loadExpenseList
  }
}
 
export default useGetExpense;