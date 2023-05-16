import React from 'react';
import BackButton from '../../components/BackButton';
import { Header, Headline } from '../../elements/Header';
import { Helmet } from 'react-helmet-async';

const ExpenseList = () => {
  return (
    <>
      <Helmet>
        <title>Expense List</title>
      </Helmet>

      <Header>
        <BackButton />
        <Headline>Expense List</Headline>
      </Header>
    </>
  );
}
 
export default ExpenseList;