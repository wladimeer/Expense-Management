import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, FormButtonGroup, Input } from '../../elements/Form';
import { Headline, HeaderButton, HeaderButtonGroup } from '../../elements/Header';
import { ReactComponent as LoginImage } from '../../images/login.svg';
import { Header, HeaderContent } from '../../elements/Header';
import styled from 'styled-components';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeInput = ({ target: { name, value } }) => {
    const inputs = {
      email: { set: (value) => setEmail(value) },
      password: { set: (value) => setPassword(value) },
    }

    inputs[name].set(value);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <Header>
        <HeaderContent>
          <Headline>Sign In</Headline>

          <HeaderButtonGroup>
            <HeaderButton to='/sign-up'>Sign Up</HeaderButton>
          </HeaderButtonGroup>
        </HeaderContent>
      </Header>

      <Form onSubmit={onSubmitForm}>
        <FormImage />

        <Input
          name='email' type='email' placeholder='Electronic Mail'
          onChange={onChangeInput} value={email}
        />

        <Input
          name='primaryPassword' type='password' placeholder='Password'
          onChange={onChangeInput} value={password}
        />

        <FormButtonGroup>
          <HeaderButton as='button' primary='true' type='submit'>
            Login
          </HeaderButton>
        </FormButtonGroup>
      </Form>
    </>
  );
}

const FormImage = styled(LoginImage)({
  width: '100%',
  marginBottom: '1.25rem',
  maxHeight: '13.12rem'
});
 
export default SignIn;