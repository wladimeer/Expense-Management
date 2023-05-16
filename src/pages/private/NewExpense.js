import React from 'react';
import { Header, HeaderContent, HeaderButtonGroup } from '../../elements/Header';
import { HeaderButton, Headline } from '../../elements/Header';
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
            <HeaderButton to='/expense-list'>Expense List</HeaderButton>
            <HeaderButton>X</HeaderButton>
          </HeaderButtonGroup>
        </HeaderContent>
      </Header>

      AddExpense
    </>
  );
}
 
export default NewExpense;