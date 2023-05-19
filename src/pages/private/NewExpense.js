import React from 'react';
import ExpenseForm from '../../components/ExpenseForm';
import { HeaderButton, Headline } from '../../elements/Header';
import { Header, HeaderContent, HeaderButtonGroup } from '../../elements/Header';
import ExitButton from '../../components/ExitButton';
import { Helmet } from 'react-helmet-async';

const NewExpense = () => {
  return (
    <>
      <Helmet>
        <title>New Expense</title>
      </Helmet>

      <Header>
        <HeaderContent>
          <Headline>New Expense</Headline>

          <HeaderButtonGroup>
            <HeaderButton to='/categories'>Categories</HeaderButton>
            <HeaderButton to='/expense/list'>Expense List</HeaderButton>
            <ExitButton />
          </HeaderButtonGroup>
        </HeaderContent>
      </Header>

      <ExpenseForm />
    </>
  );
}
 
export default NewExpense;