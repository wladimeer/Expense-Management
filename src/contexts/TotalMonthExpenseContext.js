import React, { createContext } from 'react';
import useGetMonthExpense from "../hooks/useGetMonthExpense";

const TotalMonthExpenseContext = createContext();

const TotalMonthExpenseProvider = ({ children }) => {
  const { expenses, totalCost, loading } = useGetMonthExpense();

  return (
    <TotalMonthExpenseContext.Provider value={{ expenses, totalCost, loading }}>
      {!loading && children}
    </TotalMonthExpenseContext.Provider>
  );
}

export { TotalMonthExpenseContext, TotalMonthExpenseProvider };