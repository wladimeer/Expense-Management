import React, { useEffect } from 'react';
import principalTheme from '../themes/principalTheme.json';
import styled from 'styled-components';

const Alert = ({ alertType, message, visible, setVisible }) => {
  const verifyAlert = () => {
    let time;

    if (visible) time = setTimeout(() => setVisible(false), 4000);

    return (() => clearTimeout(time));
  }

  useEffect(verifyAlert, [visible, setVisible]);

  return (
    <>
      {visible && (
        <Container alertType={alertType}>
          <p>{message}</p>
        </Container>
      )}
    </>
  );
}

const props = {
  background: {
    success: principalTheme.green,
    error: principalTheme.red
  }
}
 
const Container = styled.div(({ alertType }) => ({
  left: 0,
  top: '1.25rem',
  display: 'flex',
  position: 'fixed',
  animation: `slideDown 4s ease forwards`,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  zIndex: 1000,
  
  'p': {
    color: '#ffffff',
    borderRadius: '0.31rem',
    background: alertType ? props.background[alertType] : '#000000',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    padding: '1.25rem 2.5rem',
    textAlign: 'center'
  },

  '@keyframes slideDown': {
    '0%': {
      transform: 'translateY(-1.25rem)',
      opacity: 0
    },
   
    '10%': {
      transform: 'translateY(1.25rem)',
      opacity: 1
    },
      
    '90%': {
      transform: 'translateY(1.25rem)',
      opacity: 1
    },
   
    '100%': {
      transform: 'translateY(1.25rem)',
      opacity: 0
    }
  }
}));
 
export default Alert;