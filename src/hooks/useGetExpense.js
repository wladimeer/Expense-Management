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
        const expense = {
          id: doc.id,
          description: doc.get('description'),
          category: JSON.parse(doc.get('category')),
          quantity: doc.get('quantity'),
          userUid: doc.get('userUid'),
          date: doc.get('date')
        };
  
        if (type === 'added') {
          const exist = expenseListRef.current.find((e) => e.id === expense.id);
          if (!exist) expenseListRef.current.push(expense);
        }
  
        if (type === 'modified') {
          const index = expenseListRef.current.findIndex((e) => e.id === expense.id);
          expenseListRef.current.splice(index, 1, expense);
        }
  
        if (type === 'removed') {
          const index = expenseListRef.current.findIndex((e) => e.id === expense.id);
          expenseListRef.current.splice(index, 1);
        }
      });

      setExpenses([...expenseListRef.current]);

      if (docChanges.length > 0) {
        const { doc } = [...docChanges].pop();
        lastExpense.current = doc;
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