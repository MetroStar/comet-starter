import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import './styles.scss';
import keycloak from './utils/keycloak.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider {...keycloak}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
