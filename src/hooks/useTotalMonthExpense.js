import { TotalMonthExpenseContext } from '../contexts/TotalMonthExpenseContext';
import { useContext } from 'react';

const useTotalMonthExpense = () => {
  const { expenses, totalCost, loading } = useContext(TotalMonthExpenseContext);

  return { expenses, totalCost, loading };
}

export default useTotalMonthExpense;