import { addDoc, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore, auth, createUserWithEmailAndPassword, signOut } from '../firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const usersReference = collection(firestore, 'users');

const createUser = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    let userData = {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    }

    const userReference = await addDoc(usersReference, userData);

    userData.id = userReference.id;

    const response = { status: 1, message: 'Successfully registered user', data: userData }
  
    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: {} }

    return Promise.reject(response);
  }
}

const readUser = async () => {
  try {
    const { docs } = await getDocs(usersReference);

    const users = docs.map((userDocument) => ({
      id: userDocument.id,
      email: userDocument.get('email'),
      name: userDocument.get('name')
    }));

    const response = { status: 1, message: 'Successfully obtained users', data: users }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: [] }

    return Promise.reject(response);
  }
}

const updateUser = async (userId, email = null, name = null) => {
  try {
    const userReference = doc(firestore, 'users', userId);
    const userDocument = await getDoc(userReference);
    const user = {}

    let message = 'User doesn\'t exist'

    if (userDocument.exists()) {
      if (email !== null) user.email = email;
      if (name !== null) user.name = name;
  
      if (Object.values(user).length > 0) await updateDoc(userReference, user);
  
      user.id = userDocument.id;
      user.email = userDocument.get('email');
      user.name = userDocument.get('name');

      message = 'Successfully updated user'
    }

    const response = { status: 1, message: message, data: user }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: {} }

    return Promise.reject(response);
  }
}

const deleteUser = async (userId) => {
  try {
    const userReference = doc(firestore, 'users', userId);
    const userDocument = await getDoc(userReference);
    const user = {}

    let message = 'User doesn\'t exist'

    if (userDocument.exists()) {
      await deleteDoc(userReference);

      user.id = userDocument.id;
      user.email = userDocument.get('email');
      user.name = userDocument.get('name');

      message = 'Successfully deleted user'
    }

    const response = { status: 1, message: message, data: user }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: {} }

    return Promise.reject(response);
  }
}

const findUser = async (userId) => {
  try {
    const userReference = doc(firestore, 'users', userId);
    const userDocument = await getDoc(userReference);

    const user = {
      id: userDocument.id,
      email: userDocument.get('email'),
      name: userDocument.get('name')
    }

    const response = { status: 1, message: 'Successfully obtained user', data: user }

    return Promise.resolve(response);
    
  } catch (error) {
    const response = { status: 0, message: String(error), data: {} }

    return Promise.reject(response);
  }
}

const loadUsers = async (usersDocument) => {
  try {
    const { docs } = usersDocument;

    const users = docs.map((userDocument) => ({
      id: userDocument.id,
      email: userDocument.get('email'),
      name: userDocument.get('name')
    }));

    const response = { status: 1, message: 'Successfully obtained users', data: users }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: [] }

    return Promise.reject(response);
  }
}

export {
  createUser, readUser, updateUser, deleteUser, findUser,
  onSnapshot, loadUsers, signOut, usersReference
};