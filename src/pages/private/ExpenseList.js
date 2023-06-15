import { Helmet } from 'react-helmet-async';
import React, { useEffect, useRef } from 'react';
import BackButton from '../../components/BackButton';
import HTMLRendered from '../../components/HTMLRendered';
import TotalExpenseBar from '../../components/TotalExpenseBar';
import { ContainerList, ListItem, CategoryList } from '../../elements/List';
import { CategoryListItem, ButtonContainer, ButtonAction } from '../../elements/List';
import { LoadMoreButton, CentralButtonContainer } from '../../elements/List';
import { Category, Description, Value, Date } from '../../elements/List';
import { ReactComponent as Delete } from '../../images/delete.svg';
import { SubtitleContainer, Subtitle } from '../../elements/List';
import { ReactComponent as Edit } from '../../images/edit.svg';
import { Header, Headline } from '../../elements/Header';
import { toChileanPesos } from '../../utils/functions';
import { deleteExpense } from '../../service/expense';
import useGetExpense from '../../hooks/useGetExpense';
import { HeaderButton } from '../../elements/Header';
import { fromUnixTime, format } from 'date-fns';
import { Link } from 'react-router-dom';

import { expensesReference } from '../../service/expense';
import { query, limit, orderBy, where } from 'firebase/firestore';
import { onSnapshot, startAfter } from 'firebase/firestore';

const ExpenseList = () => {
  const { expenses, loading, user, lastExpense, showData, showError } = useGetExpense();
  const subscriptions = useRef([])

  const getDateFromUnixTime = (date) => {
    const newDate = fromUnixTime(date);

    return format(newDate, `MMMM dd Y`);
  }

  const compareUnixTimes = (firstUnixTime, secondUnixTime) => {
    const firstDate = fromUnixTime(firstUnixTime).getDate();
    const secondDate = fromUnixTime(secondUnixTime).getDate();

    return firstDate === secondDate;
  }

  const subscriptionCleanup = () => {
    const { current } = subscriptions;
    
    current.forEach((subscription) => subscription());
  }

  const loadMoreData = async () => {
    const expensesQuery = query(
      expensesReference,
      where('userUid', '==', user.uid),
      orderBy('date', 'desc'),
      startAfter(lastExpense.current),
      limit(1)
    );

    const subscription = onSnapshot(
      expensesQuery, showData, showError
    );

    subscriptions.current = [...subscriptions.current, subscription];
  };

  const removeExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);

    } catch ({ message }) {
      console.error(message);
    }
  }

  useEffect(() => subscriptionCleanup, [user]);

  return (
    <>
      <Helmet>
        <title>Expense List</title>
      </Helmet>

      <Header>
        <BackButton />
        <Headline>Expense List</Headline>
      </Header>

      <ContainerList>
        {loading ? (
          <SubtitleContainer>
            <Subtitle>Loading expenses...</Subtitle>
          </SubtitleContainer>
        ) : (
          expenses.length > 0 ? (
            <>
              {expenses.map((expense, index, array) => (
                <div key={expense.id}>
                  {compareUnixTimes(expense.date, array[index - 1]?.date) || (
                    <Date>{getDateFromUnixTime(expense.date)}</Date>
                  )}

                  <ListItem>
                    <Category>
                      <HTMLRendered html={expense.category?.icon} />
                      {expense.category.value}
                    </Category>

                    <Description>{expense.description}</Description>
                    <Value>{toChileanPesos(expense.quantity)}</Value>

                    <ButtonContainer>
                      <ButtonAction as={Link} to={`/expense/modify/:${expense.id}`}>
                        <Edit />
                      </ButtonAction>

                      <ButtonAction onClick={() => removeExpense(expense.id)}>
                        <Delete />
                      </ButtonAction>
                    </ButtonContainer>
                  </ListItem>
                </div>
              ))}

              <CentralButtonContainer>
                <LoadMoreButton onClick={loadMoreData}>
                  Get More Results
                </LoadMoreButton>
              </CentralButtonContainer>
            </>
          ) : (
            <SubtitleContainer>
              <Subtitle>No expenses to show</Subtitle>
              <HeaderButton as={Link} to='/'>Add Expenses</HeaderButton>
            </SubtitleContainer>
          )          
        )}
      </ContainerList>
      <TotalExpenseBar />
    </>
  );
}
 
export default ExpenseList;