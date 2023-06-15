import styled from 'styled-components';
import principalTheme from '../themes/principalTheme.json';
 
const ContainerList = styled.ul({
  listStyle: 'none',
  padding: '0px 2.5rem',
  overflowY: 'auto',
  height: '100%',
  
  'li': {
    gridTemplateColumns: '1fr 1fr 1fr auto'
  },
  
  '@media (max-width: 50rem)': {
    'li': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr'
    }
  }
});

const ListItem = styled.li({
  display: 'grid',
  padding: '1.25rem 0px',
  borderBottom: '2px solid #f2f2f2',
  justifyContent: 'space-between',
  gap: '0.31rem',
  
  '& > div': {
    width: '100%',
    alignItems: 'center',
    display: 'flex'
  },
  
  '&:hover button, &:hover a': {
    opacity: 1
  }
});
 
const CategoryList = styled.ul({
  listStyle: 'none',
  padding: '0px 2.5rem',
  overflowY: 'auto',
  height: '100%'
});
 
const CategoryListItem = styled.li({
  padding: '1.25rem 0px',
  borderBottom: '2px solid #f2f2f2',
  justifyContent: 'space-between',
  display: 'flex'
});
 
const Category = styled.div({
  fontWeight: 500,
  fontSize: '1rem',
  textTransform: 'uppercase',
  alignItems: 'center',
  display: 'flex',
      
  'svg': {
    height: 'auto',
    marginRight: '1.25rem',
    borderRadius: '0.62rem',
    width: '3.12rem'
  },
  
  '@media (max-width: 50rem)': {
    fontSize: '1.12rem'
  }
});
 
const Description = styled.div({
  justifyContent: 'left',
  textTransform: 'uppercase',
  fontSize: '1rem',

  '@media (max-width: 50rem)': {
    justifyContent: 'end'
  }
});
 
const Value = styled.div({
  fontSize: '1rem',
  justifyContent: 'end',
  fontWeight: 700,
  
  '@media (max-width: 50rem)': {
    justifyContent: 'start'
  }
});
 
const Date = styled.div({
  color: '#ffffff',
  textAlign: 'center',
  borderRadius: '0.31rem',
  background: principalTheme.lightBlue,
  padding: '0.62rem 3.12rem',
  display: 'inline-block',
  margin: '1.25rem 0',
  
  '@media (max-width: 50rem)': {
    width: '100%'
  }
});
 
const ButtonContainer = styled.div({
  '@media (max-width: 50rem)': {
    justifyContent: 'end'
  }
});
 
const ButtonAction = styled.button({
  border: 'none',
  width: '2.5rem',
  height: '2.5rem',
  lineHeight: '2.5rem',
  display: 'inline-block',
  background: principalTheme.lightGray,
  transition: '0.3s ease all',
  justifyContent: 'center',
  borderRadius: '0.31rem',
  marginLeft: '0.625rem',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '16px',
  outline: 'none',
  display: 'flex',
  opacity: 0,
  
  '&:hover': {
    background: principalTheme.lightGray2
  },
  
  'svg': {
    width: '1.125rem'
  },
  
  '@media (max-width: 50rem)': {
    opacity: 1
  }
});
 
const SubtitleContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%'
});
 
const Subtitle = styled.h3({
  fontWeight: 400,
  color: principalTheme.lightGray2,
  padding: '2.5rem 0px',
  fontSize: 40
});
 
const CentralButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '2.5rem'
});
 
const LoadMoreButton = styled.button({
  border: 'none',
  fontWeight: 500,
  color: '#000000',
  fontSize: '1.25rem',
  textDecoration: 'none',
  justifyContent: 'space-between',
  background: principalTheme.lightGray,
  fontFamily: 'Work Sans, sans-serif',
  transition: '0.3s ease all',
  padding: '1rem 1.87rem',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '7px',
  cursor: 'pointer',
  outline: 'none',
  
  '&:hover': {
    background: principalTheme.lightGray2
  }
});
 
export {
  ContainerList, ListItem, CategoryList, CategoryListItem,
  Category,Description, Value, Date, ButtonContainer, ButtonAction,
  LoadMoreButton, CentralButtonContainer, SubtitleContainer,
  Subtitle
};