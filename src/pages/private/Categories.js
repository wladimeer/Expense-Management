import React from 'react';
import BackButton from '../../components/BackButton';
import HTMLRendered from '../../components/HTMLRendered';
import TotalExpenseBar from '../../components/TotalExpenseBar';
import useGetTotalByCategory from '../../hooks/useGetTotalByCategory';
import { SubtitleContainer, Subtitle, CategoryListItem } from '../../elements/List';
import { CategoryList, Category, Value } from '../../elements/List';
import { Header, Headline } from '../../elements/Header';
import { toChileanPesos } from '../../utils/functions';
import { Helmet } from 'react-helmet-async';

const Categories = () => {
  const { categories, loading } = useGetTotalByCategory();

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <Header>
        <BackButton />
        <Headline>Categories</Headline>
      </Header>


      <CategoryList>
        {loading ? (
          <SubtitleContainer>
            <Subtitle>Loading categories...</Subtitle>
          </SubtitleContainer>
        ) : (
          categories.length > 0 ? (
            <>
              {categories.map(({ category, total }) => (
                <CategoryListItem key={category.id}>
                  <Category>
                    <HTMLRendered html={category.icon} />
                    {category.value}
                  </Category>

                  <Value>{toChileanPesos(total)}</Value>
                </CategoryListItem>
              ))}
            </>
          ) : (
            <SubtitleContainer>
              <Subtitle>No categories to show</Subtitle>
            </SubtitleContainer>
          )          
        )}
      </CategoryList>

      <TotalExpenseBar />
    </>
  );
}
 
export default Categories;