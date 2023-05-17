import React, { useEffect } from 'react';
import principalTheme from '../themes/principalTheme.json';
import styled from 'styled-components';

const Alert = ({ visible, alertType, message, setAlert }) => {
  const verifyAlert = () => {
    let time;

    if (visible) {
      time = setTimeout(() => {
        setAlert({ visible: false, alertType: null, message: ''});
      }, 4000);
    }

    return (() => clearTimeout(time));
  }

  useEffect(verifyAlert, [visible, setAlert]);

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