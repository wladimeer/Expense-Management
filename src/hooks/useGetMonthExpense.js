import { useCallback, useEffect, useState } from "react";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { onSnapshot, where, orderBy, query } from "firebase/firestore";
import { expensesReference, getExpenses } from "../service/expense";
import useAuth from "./useAuth";

const useGetMonthExpense = (startDate = new Date(), endDate = new Date()) => {
  const startUnixTime = getUnixTime(startOfMonth(startDate));
  const endUnixTime = getUnixTime(endOfMonth(endDate));

  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  const showData = useCallback(async (snapshot) => {
    try {
      const { data } = await getExpenses(snapshot);
      const quantities = [...data].map((e) => e.quantity);
      const total = quantities.reduce((a, v) => a + v);

      setExpenses(data);
      setTotalCost(total);
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

  return { expenses, totalCost, loading }
}
 
export default useGetMonthExpense;