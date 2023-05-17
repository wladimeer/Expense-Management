import { useReducer } from "react";

const useAlert = () => {
  const initialState = {
    visible: false,
    alertType: null,
    message: ''
  }
  
  const reducer = (state, { type, payload }) => {
    const types = {
      'SET_VISIBLE': { ...state, visible: payload },
      'SET_ALERT_TYPE': { ...state, alertType: payload },
      'SET_MESSAGE': { ...state, message: payload }
    }
  
    return types[type] ?? state;
  }
  
  const [alert, dispatch] = useReducer(reducer, initialState);
  
  const setAlert = ({ visible, alertType, message }) => {
    dispatch({ type: 'SET_VISIBLE', payload: visible });
    dispatch({ type: 'SET_ALERT_TYPE', payload: alertType });
    dispatch({ type: 'SET_MESSAGE', payload: message });
  }
  
  return { alert, setAlert }
}

export default useAlert;