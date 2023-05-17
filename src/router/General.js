import { Route, Routes } from 'react-router-dom';
import Categories from '../pages/private/Categories';
import ExpenseList from '../pages/private/ExpenseList';
import ModifyExpense from '../pages/private/ModifyExpense';
import NewExpense from '../pages/private/NewExpense';
import SignUp from '../pages/public/SignUp';
import SignIn from '../pages/public/SignIn';
import PrivateGuard from './PrivateGuard';
import PublicGuard from './PublicGuard';

const General = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateGuard><NewExpense /></PrivateGuard>} />
      <Route path='/categories' element={<PrivateGuard><Categories /></PrivateGuard>} />
      <Route path='/expense/modify/:expenseId' element={<PrivateGuard><ModifyExpense /></PrivateGuard>} />
      <Route path='/expense/list' element={<PrivateGuard><ExpenseList /></PrivateGuard>} />

      <Route path='/sign-in' element={<PublicGuard><SignIn /></PublicGuard>} />
      <Route path='/sign-up' element={<PublicGuard><SignUp /></PublicGuard>} />

      <Route path='*' element={<PrivateGuard><NewExpense /></PrivateGuard>} />
    </Routes>
  );
}

export default General;
