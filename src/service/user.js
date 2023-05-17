import { firestore, auth, createUserWithEmailAndPassword } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from '../firebase';
import { addDoc, getDocs, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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

    await addDoc(usersReference, userData);

    const response = { status: 1, message: 'Successfully registered user', data: userData }
  
    return Promise.resolve(response);

  } catch ({ code }) {
    const message = {
      'default': 'An error occurred while processing the transaction, please try again',
      'auth/weak-password': 'Invalid password, must be at least 6 characters',
      'auth/email-already-in-use': 'Email is already in use for another user',
      'auth/invalid-email': 'Check email address, it\'s invalid'
    }

    const response = { status: 0, message: message[code] ?? message['default'], data: {} }

    return Promise.reject(response);
  }
}

const readUser = async () => {
  try {
    const { docs } = await getDocs(usersReference);

    const users = docs.map((userDocument) => ({
      id: userDocument.id,
      email: userDocument.get('email'),
      emailVerified: userDocument.get('emailVerified'),
      phoneNumber: userDocument.get('phoneNumber'),
      photoURL: userDocument.get('photoURL'),
      uid: userDocument.get('uid')
    }));

    const response = { status: 1, message: 'Successfully obtained users', data: users }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: [] }

    return Promise.reject(response);
  }
}

const updateUser = async (userId, email = null, phoneNumber = null) => {
  try {
    const userReference = doc(firestore, 'users', userId);
    const userDocument = await getDoc(userReference);
    const userData = {}

    let message = 'User doesn\'t exist'

    if (userDocument.exists()) {
      if (email !== null) userData.email = email;
      if (phoneNumber !== null) userData.phoneNumber = phoneNumber;
  
      if (Object.values(userData).length > 0) await updateDoc(userReference, userData);
  
      userData.id = userDocument.id;
      userData.email = userDocument.get('email');
      userData.phoneNumber = userDocument.get('phoneNumber');

      message = 'Successfully updated user'
    }

    const response = { status: 1, message: message, data: userData }

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

const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    let userData = {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    }

    const response = { status: 1, message: 'Session opened successfully', data: userData }

    return Promise.resolve(response);

  } catch ({ code }) {
    const message = {
      'default': 'An error occurred while processing the transaction, please try again',
      'auth/user-not-found': 'User not found, check the credentials',
      'auth/wrong-password': 'Check the credentials ingressed'
    }

    const response = { status: 0, message: message[code] ?? message['default'], data: [] }

    return Promise.reject(response);
  }
}

const signOff = async () => {
  try {
    const { currentUser } = auth;
    let userData = {}

    if (currentUser !== null) {
      userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        emailVerified: currentUser.emailVerified,
        photoURL: currentUser.photoURL
      }

      await signOut(auth);
    }

    const response = { status: 1, message: 'Session closed successfully', data: userData }

    return Promise.resolve(response);

  } catch (error) {
    const response = { status: 0, message: String(error), data: [] }

    return Promise.reject(response);
  }
}

export {
  createUser, readUser, updateUser, deleteUser, findUser,
  onSnapshot, loadUsers, signIn, onAuthStateChanged, signOff,
  usersReference
};