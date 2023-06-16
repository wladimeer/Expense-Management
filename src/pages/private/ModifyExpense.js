import React from 'react';
import { Helmet } from 'react-helmet-async';
import ExpenseForm from '../../components/ExpenseForm';
import { Header, Headline } from '../../elements/Header';
import TotalExpenseBar from '../../components/TotalExpenseBar';
import useFindExpense from '../../hooks/useFindExpense';
import BackButton from '../../components/BackButton';
import { useParams } from 'react-router';

const NewExpense = () => {
  const { expenseId } = useParams();
  const { expense } = useFindExpense(expenseId);

  return (
    <>
      <Helmet>
        <title>Modify Expense</title>
      </Helmet>

      <Header>
        <BackButton route='/expense/list' />
        <Headline>Modify Expense</Headline>
      </Header>

      <ExpenseForm formType='update' expense={expense} />
      <TotalExpenseBar />
    </>
  );
}
 
export default NewExpense;