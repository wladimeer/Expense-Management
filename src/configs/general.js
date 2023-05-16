const firebaseConfig = {
  apiKey: process.env['REACT_APP_FIREBASE_API_KEY'],
  authDomain: process.env['REACT_APP_FIREBASE_AUTH_DOMAIN'],
  messagingSenderId: process.env['REACT_APP_FIREBASE_MESSAGING_SENDER_ID'],
  storageBucket: process.env['REACT_APP_FIREBASE_STORAGE_BUCKET'],
  projectId: process.env['REACT_APP_FIREBASE_PROJECT_ID'],
  appId: process.env['REACT_APP_FIREBASE_APP_ID']
}

export { firebaseConfig };