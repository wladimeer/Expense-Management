import React from 'react';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const BackButton = ({ route = '/' }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(route)}><IconButton /></Button>
  );
}

const Button = styled.button({
  display: 'flex',
  height: '3.12rem',
  textAlign: 'center',
  lineHeight: '3.12rem',
  marginRight: '1.25rem',
  justifyContent: 'center',
  borderRadius: '0.31rem',
  background: '#000000',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#ffffff',
  width: '3.12rem',
  border: 'none',

  '@media(max-width: 60rem)': {
    width: '2.5rem',
    height: '2.5rem',
    lineHeight: '2.5rem',
  }
});
 
const IconButton = styled(Arrow)({
  width: '50%',
  fill: '#ffffff',
  height: 'auto'
});

export default BackButton;