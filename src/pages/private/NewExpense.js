import React, { useContext } from 'react';
import { HeaderButton, Headline } from '../../elements/Header';
import { Header, HeaderContent, HeaderButtonGroup } from '../../elements/Header';
// import { AuthContext } from '../../contexts/AuthContext';
import ExitButton from '../../components/ExitButton';
import { Helmet } from 'react-helmet-async';

const NewExpense = () => {
  // const { user } = useContext(AuthContext);

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
            <ExitButton />
          </HeaderButtonGroup>
        </HeaderContent>
      </Header>

      AddExpense
    </>
  );
}
 
export default NewExpense;