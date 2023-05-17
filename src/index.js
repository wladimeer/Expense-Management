import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import WebFont from 'webfontloader';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const families = ['Work Sans: 400, 500, 700', 'sans-serif'];

WebFont.load({ google: { families } });

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);