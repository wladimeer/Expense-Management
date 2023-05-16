import styled from "styled-components";
import principalTheme from '../themes/principalTheme.json';

const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1.87rem',
 
  '@media(max-width: 60rem)': {
    flexDirection: 'column',
 
    '& > *': {
      width: '100%',
      marginBottom: '0.62rem'
    }
  }
});
 
const Form = styled.form({
  height: '100%',
  padding: '0px 2.5rem',
  justifyContent: 'space-around',
  flexDirection: 'column',
  display: 'flex',

  'input': {
    width: '100%',
    padding: '2.5rem 0px',
    fontFamily: 'Work Sans, sans-serif',
    textAlign: 'center',

    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.2)',
    }
  },
 
  '@media(max-width: 60rem)': {
    justifyContent: 'start'
  }
});
 
const Input = styled.input({
  border: 'none',
  fontSize: '1.5rem',
  textTransform: 'uppercase',
  borderBottom: `2px solid ${principalTheme.lightGray}`,
  outline: 'none',
  
  '@media(max-width: 60rem)': {
    fontSize: '2.2rem'
  }
});
 
const LargeInput = styled(Input)({
  fontSize: '4.37rem',
  fontWeight: 'bold'
});
 
const FormButtonGroup = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '2.5rem 0px'
});

export { FilterContainer, Form, Input, LargeInput, FormButtonGroup };