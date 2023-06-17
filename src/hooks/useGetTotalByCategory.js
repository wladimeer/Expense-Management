import { useCallback, useEffect, useState } from "react";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { onSnapshot, where, orderBy, query } from "firebase/firestore";
import { expensesReference, getExpenses } from "../service/expense";
import useAuth from "./useAuth";

const useGetTotalByCategory = (startDate = new Date(), endDate = new Date()) => {
  const startUnixTime = getUnixTime(startOfMonth(startDate));
  const endUnixTime = getUnixTime(endOfMonth(endDate));

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  const showData = useCallback(async (snapshot) => {
    try {
      const { data } = await getExpenses(snapshot);
      const expenseCategory = {}

      data.forEach(({ category, quantity, ...expense }) => {
        expenseCategory[category.id] ??= {
          'category': category,
          'expenses': [],
          'total': 0
        }

        expense.quantity = quantity;

        expenseCategory[category.id].expenses.push(expense);
        expenseCategory[category.id].total += quantity;
      });

      const categoryList = Object.values(expenseCategory);

      setCategories(categoryList);
      setLoading(false);

    } catch ({ message }) {
      console.error(message);
    }
  }, []);

  const showError = (error) => {
    console.error(error);
  }

  useEffect(() => {
    const expensesQuery = query(
      expensesReference,
      where('userUid', '==', user.uid),
      where('date', '>=', startUnixTime),
      where('date', '<=', endUnixTime),
      orderBy('date', 'desc')
    );

    const subscription = onSnapshot(
      expensesQuery, showData, showError
    );

    return subscription;

  }, [user, startUnixTime, endUnixTime, showData]);

  return { categories, loading }
}
 
export default useGetTotalByCategory;