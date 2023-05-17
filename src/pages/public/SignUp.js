import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, FormButtonGroup, Input } from '../../elements/Form';
import { Headline, HeaderButton, HeaderButtonGroup } from '../../elements/Header';
import { ReactComponent as RegisterImage } from '../../images/register.svg';
import { Header, HeaderContent } from '../../elements/Header';
import { createUser } from '../../service/user';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import Alert from '../../components/Alert';
import styled from 'styled-components';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [primaryPassword, setPrimaryPassword] = useState('');
  const [secundaryPassword, setSecundaryPassword] = useState('');
  const { alert, setAlert } = useAlert();
  const navigate = useNavigate();

  const onChangeInput = ({ target: { name, value } }) => {
    const inputs = {
      email: { setValue: (value) => setEmail(value) },
      primaryPassword: { setValue: (value) => setPrimaryPassword(value) },
      secundaryPassword: { setValue: (value) => setSecundaryPassword(value) }
    }

    inputs[name].setValue(value);
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if ([email, primaryPassword, secundaryPassword].includes('')) {
      setAlert({ visible: true, alertType: 'error', message: 'Check that all fields are completed' });

    } else {
      const expression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

      if (expression.test(email) && (primaryPassword === secundaryPassword)) {
        try {
          await createUser(email, primaryPassword);
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
        <title>Sign Up</title>
      </Helmet>

      <Header>
        <HeaderContent>
          <Headline>Sign Up</Headline>

          <HeaderButtonGroup>
            <HeaderButton to='/sign-in'>Sign In</HeaderButton>
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
          onChange={onChangeInput} value={primaryPassword}
        />

        <Input
          name='secundaryPassword' type='password' placeholder='Repeat Password'
          onChange={onChangeInput} value={secundaryPassword}
        />

        <FormButtonGroup>
          <HeaderButton as='button' primary='true' type='submit'>
            Create Account
          </HeaderButton>
        </FormButtonGroup>
      </Form>

      <Alert { ...alert } setAlert={setAlert} />
    </>
  );
}

const FormImage = styled(RegisterImage)({
  width: '100%',
  marginBottom: '1.25rem',
  maxHeight: '6.25rem'
});
 
export default SignUp;