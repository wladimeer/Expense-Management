import { firestore, auth } from '../firebase';
import { addDoc, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';

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

const readExpense = async () => {
  try {
    const { docs } = await getDocs(expensesReference);

    const expenses = docs.map((expenseDocument) => ({
      id: expenseDocument.id,
      description: expenseDocument.get('description'),
      category: JSON.parse(expenseDocument.get('category')),
      quantity: expenseDocument.get('quantity'),
      userUid: expenseDocument.get('userUid'),
      date: expenseDocument.get('date')
    }));

    const response = { status: 1, message: 'Successfully obtained expenses', data: expenses }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: [] }

    return Promise.reject(response);
  }
}

const deleteExpense = async (expenseId) => {
  try {
    const expenseReference = doc(firestore, 'expenses', expenseId);
    const expenseDocument = await getDoc(expenseReference);
    const expenseData = {}

    let message = 'Expense doesn\'t exist'

    if (expenseDocument.exists()) {
      await deleteDoc(expenseReference);

      expenseData.id = expenseDocument.id;
      expenseData.description = expenseDocument.get('description');
      expenseData.category = JSON.parse(expenseDocument.get('category'));
      expenseData.quantity = expenseDocument.get('quantity');
      expenseData.userUid = expenseDocument.get('userUid');
      expenseData.date = expenseDocument.get('date');

      message = 'Successfully deleted expense'
    }

    const response = { status: 1, message: message, data: expenseData }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: {} }

    return Promise.reject(response);
  }
}

const loadExpenses = async (expensesDocument) => {
  try {
    const { docs } = expensesDocument;
    let lastDocument = {};

    const expenses = docs.map((expenseDocument) => ({
      id: expenseDocument.id,
      description: expenseDocument.get('description'),
      category: JSON.parse(expenseDocument.get('category')),
      quantity: expenseDocument.get('quantity'),
      userUid: expenseDocument.get('userUid'),
      date: expenseDocument.get('date')
    }));

    if (docs.length > 0) lastDocument = [...docs].pop();

    const response = { status: 1, message: 'Successfully obtained expenses', data: expenses, lastDocument }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: [] }

    return Promise.reject(response);
  }
}

export {
  createExpense, readExpense, deleteExpense, loadExpenses,
  expensesReference
};