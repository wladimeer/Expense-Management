import { TotalMonthExpenseContext } from '../contexts/TotalMonthExpenseContext';
import { useContext } from 'react';

const useTotalMonthExpense = () => {
  const { expenses, totalCost } = useContext(TotalMonthExpenseContext);

  return { expenses, totalCost };
}

export default useTotalMonthExpense;