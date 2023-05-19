import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import principalTheme from '../themes/principalTheme.json';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import { format } from 'date-fns';

const DatePicker = ({ selected, setSelected }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onSelectDay = (date = new Date()) => {
    setIsVisible(false);
    setSelected(date);
  }

  return (
    <Container>
      <input
        readOnly type='text' value={format(selected, `MMMM dd 'Of' Y`)}
        onClick={() => setIsVisible(!isVisible)}
      />

      {isVisible && (
        <DayPicker
          selected={selected}
          onSelect={onSelectDay}
          defaultMonth={selected}
          mode='single'
        />
      )}
    </Container>
  );
}

const Container = styled.div({
  position: 'relative',
  userSelect: 'none',
 
  'input': {
    width: '100%',
    border: 'none',
    display: 'flex',
    padding: '0px 1.25rem',
    boxSizing: 'border-box',
    fontFamily: 'Work Sans, sans-serif',
    background: principalTheme.lightGray,
    textTransform: 'uppercase',
    borderRadius: '0.625rem',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
    height: '4rem'
  },
 
  '.rdp': {
    position: 'absolute',
    right: -15
  },
 
  '.rdp-months': {
    display: 'flex',
    justifyContent: 'center'
  },
 
  '.rdp-month': {
    background: '#ffffff',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    borderRadius: '10px',
    padding: '20px'
  },
 
  '@media(max-width: 60rem)': {
    '& > *': {
      width: '100%'
    }
  }
});
 
export default DatePicker;