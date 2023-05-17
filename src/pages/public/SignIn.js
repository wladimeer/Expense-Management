import React, { useState } from 'react';
import Alert from '../../components/Alert';
import { signIn } from '../../service/user';
import { Form, FormButtonGroup, Input } from '../../elements/Form';
import { Headline, HeaderButton, HeaderButtonGroup } from '../../elements/Header';
import { ReactComponent as LoginImage } from '../../images/login.svg';
import { Header, HeaderContent } from '../../elements/Header';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAlert from '../../hooks/useAlert';
import styled from 'styled-components';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { alert, setAlert } = useAlert();
  const navigate = useNavigate();

  const onChangeInput = ({ target: { name, value } }) => {
    const inputs = {
      email: { setValue: (value) => setEmail(value) },
      password: { setValue: (value) => setPassword(value) }
    }

    inputs[name].setValue(value);
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if ([email, password].includes('')) {
      setAlert({ visible: true, alertType: 'error', message: 'Check that all fields are completed' });

    } else {
      const expression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

      if (expression.test(email)) {
        try {
          await signIn(email, password);
          navigate('/');
          
        } catch ({ message }) {
          setAlert({ visible: true, alertType: 'error', message: message });
        }

      } else {
        setAlert({ visible: true, alertType: 'error', message: 'Check that the field values are correct' });
      }
    }
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
          name='password' type='password' placeholder='Password'
          onChange={onChangeInput} value={password}
        />

        <FormButtonGroup>
          <HeaderButton as='button' primary='true' type='submit'>
            Login
          </HeaderButton>
        </FormButtonGroup>
      </Form>

      <Alert { ...alert } setAlert={setAlert} />
    </>
  );
}

const FormImage = styled(LoginImage)({
  width: '100%',
  marginBottom: '1.25rem',
  maxHeight: '13.12rem'
});
 
export default SignIn;