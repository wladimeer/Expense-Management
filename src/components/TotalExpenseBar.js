import React from 'react';
import principalTheme from '../themes/principalTheme.json';
import { toChileanPesos } from '../utils/functions';
import styled from 'styled-components';

const TotalExpenseBar = () => {
  return (
    <Container>
      <p>Month Total Expense:</p>
      <p>{toChileanPesos(0)}</p>
    </Container>
  );
}

const Container = styled.div({
  fontWeight: 500,
  letterSpacing: 1,
  fontSize: '1.25rem',
  textTransform: 'uppercase',
  background: principalTheme.green,
  justifyContent: 'space-between',
  padding: '0.62rem 2.25rem',
  alignItems: 'center',
  color: '#ffffff',
  display: 'flex',
 
  '@media(max-width: 31.25rem)': {
    flexDirection: 'column',
    fontSize: 14
  }
});
 
export default TotalExpenseBar;