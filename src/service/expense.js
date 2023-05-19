import { firestore, auth } from '../firebase';
import { addDoc, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const expensesReference = collection(firestore, 'expenses');

const createExpense = async ({ description, quantity, category, date }) => {
  try {    
    const expenseData = { description, quantity, category, date }

    expenseData.userUid = auth.currentUser.uid;

    await addDoc(expensesReference, expenseData);

    const response = { status: 1, message: 'Successfully registered expense', data: expenseData }
  
    return Promise.resolve(response);

  } catch (message) {
    const response = { status: 0, message: String(message), data: {} }

    return Promise.reject(response);
  }
}

export {
  createExpense
};