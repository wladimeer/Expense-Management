import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseConfig } from './configs/general';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firestore, auth, createUserWithEmailAndPassword, signOut };