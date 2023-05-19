import React, { useState } from 'react';
import { ReactComponent as Down } from '../images/down.svg';
import { ReactComponent as Fun } from '../images/cat_fun.svg';
import { ReactComponent as Food } from '../images/cat_food.svg';
import { ReactComponent as Clothes } from '../images/cat_clothes.svg';
import { ReactComponent as AccountsAndPay } from '../images/cat_accounts_and_pay.svg';
import { ReactComponent as HealthAndHygiene } from '../images/cat_health_and_hygiene.svg';
import { ReactComponent as Transport } from '../images/cat_transport.svg';
import { ReactComponent as Shopping } from '../images/cat_shopping.svg';
import { ReactComponent as Home } from '../images/cat_home.svg';
import principalTheme from '../themes/principalTheme.json';
import styled from 'styled-components';

const CategorySelector = ({ currentOption, setCurrentOption }) => {
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    { id: 1, value: 'Food', icon: <Food /> },
    { id: 2, value: 'Accounts and Pay', icon: <AccountsAndPay /> },
    { id: 3, value: 'Home', icon: <Home /> },
    { id: 4, value: 'Transport', icon: <Transport /> },
    { id: 5, value: 'Clothes', icon: <Clothes /> },
    { id: 6, value: 'Health and Hygiene', icon: <HealthAndHygiene /> },
    { id: 7, value: 'Shopping', icon: <Shopping /> },
    { id: 8, value: 'Fun', icon: <Fun /> }
  ]

  const onClickOption = ({ target: { dataset: { id } } }) => {
    const { value } = categories.find((c) => c.id === Number(id));

    setCurrentOption({ id, value });
    setIsVisible(false);
  }

  return (
    <Container onClick={() => setIsVisible(!isVisible)}>
      <OptionSelected>
        {currentOption?.value ?? 'Select'}
        <Down />
      </OptionSelected>

      <Options isVisible={isVisible}>
        {categories.map(({ id, value, icon }) => (
          <Option key={id} data-id={id} onClick={onClickOption}>
            {icon} {value}
          </Option>
        ))}
      </Options>
    </Container>
  );
}

const Container = styled.div({
  width: '40%',
  height: '4rem',
  cursor: 'pointer',
  userSelect: 'none',
  position: 'relative',
  padding: '0px 1.25rem',
  borderRadius: '0.625rem',
  transition: '0.5s ease all',
  background: principalTheme.lightGray,
  alignItems: 'center',
  textAlign: 'center',
  fontSize: '0.9rem',
  display: 'flex',

  '&:hover': {
    background: principalTheme.lightGray2
  }
});

const OptionSelected = styled.div({
  display: 'flex',
  textTransform: 'uppercase',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',

  'svg': {
    width: '1.25rem',
    marginLeft: '1.25rem',
    height: 'auto'
  }
});

const Options = styled.div(({ isVisible }) => ({
  width: '100%',
  position: 'absolute',
  borderRadius: '0.625rem',
  background: principalTheme.lightGray,
  display: isVisible ? 'block' : 'none',
  textTransform: 'uppercase',
  maxHeight: '18.75rem',
  overflowY: 'auto',
  top: '4.62rem',
  left: 0
}));
 
const Option = styled.div({
  display: 'flex',
  padding: '1.25rem',

  'svg': {
    width: '28px',
    marginRight: '1.25rem',
    height: 'auto',
  },

  '&:hover': {
    background: principalTheme.lightGray2,

    'svg': {
      fillOpacity: 0.8
    }
  }
});
 
export default CategorySelector;