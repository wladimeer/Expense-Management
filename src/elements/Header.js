import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.5rem 2.5rem',
  
  '@media(max-width: 60rem)': {
    justifyContent: 'start'
  }
});

const HeaderContent = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  
  '@media(max-width: 60rem)':{
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
  
    '& > div': {
      display: 'flex',
      marginBottom: '1.25rem',
      justifyContent: 'end'
    }
  }
});

const HeaderButtonGroup = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const Headline = styled.h1({
  fontWeight: 'normal',
  textTransform: 'uppercase',
  fontSize: '1.8rem',
  
  '@media(max-width: 60rem)': {
    fontSize: '1.5rem'
  }
});

const HeaderButton = styled(Link)(({ primary, withIcon, largeIcon }) => ({
  border: 'none',
  outline: 'none',
  color: '#ffffff',
  marginLeft: '1.25rem',
  display: 'inline-flex',
  borderRadius: '0.625rem',
  padding: '1.25rem 1.87rem',
  width: withIcon ? '15.62rem' : 'auto',
  background: primary ? '#5B69E2' : '#000000',
  fontFamily: 'Work Sans, sans-serif',
  justifyContent: 'space-between',
  textDecoration: 'none',
  alignItems: 'center',
  fontSize: '1.25rem',
  height: '2.75rem',
  cursor: 'pointer',
  fontWeight: 500,
 
  'svg': {
    height: largeIcon ? '100%' : '0.75rem',
    fill: 'white'
  }
}));

export { Header, HeaderContent, HeaderButtonGroup, Headline, HeaderButton };