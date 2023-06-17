import React, { createContext } from 'react';
import useGetMonthExpense from "../hooks/useGetMonthExpense";

const TotalMonthExpenseContext = createContext();

const TotalMonthExpenseProvider = ({ children }) => {
  const { expenses, totalCost } = useGetMonthExpense();

  return (
    <TotalMonthExpenseContext.Provider value={{ expenses, totalCost }}>
      {children}
    </TotalMonthExpenseContext.Provider>
  );
}

export { TotalMonthExpenseContext, TotalMonthExpenseProvider };