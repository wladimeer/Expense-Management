import { Route, Routes } from 'react-router-dom';
import Categories from '../pages/private/Categories';
import ExpenseList from '../pages/private/ExpenseList';
import ModifyExpense from '../pages/private/ModifyExpense';
import NewExpense from '../pages/private/NewExpense';
import SignUp from '../pages/public/SignUp';
import SignIn from '../pages/public/SignIn';

const General = () => {
  return (
    <Routes>
      <Route path='/' element={<NewExpense />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/modify/:expenseId' element={<ModifyExpense />} />
      <Route path='/expense-list' element={<ExpenseList />} />
      <Route path='*' element={<NewExpense />} />
    </Routes>
  );
}

export default General;
