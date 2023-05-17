import React from 'react';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogOut } from '../images/log_out.svg';
import { HeaderButton } from '../elements/Header';
import { signOff } from '../service/user';
import useAlert from '../hooks/useAlert';

const ExitButton = () => {
  const { alert, setAlert } = useAlert();
  const navigate = useNavigate();

  const onClickButton = async () => {
    try {
      await signOff();
      navigate('/sign-in');

    } catch ({ message }) {
      setAlert({ visible: true, alertType: 'error', message: message });
    }
  }

  return (
    <>
      <HeaderButton as='button' largeIcon onClick={onClickButton}>
        <LogOut />
      </HeaderButton>

      <Alert { ...alert } setAlert={setAlert} />
    </>
  );
}
 
export default ExitButton;