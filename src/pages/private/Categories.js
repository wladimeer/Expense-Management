import React from 'react';
import BackButton from '../../components/BackButton';
import TotalExpenseBar from '../../components/TotalExpenseBar';
import { Header, Headline } from '../../elements/Header';
import { Helmet } from 'react-helmet-async';

const Categories = () => {
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <Header>
        <BackButton />
        <Headline>Categories</Headline>
      </Header>

      <TotalExpenseBar />
    </>
  );
}
 
export default Categories;