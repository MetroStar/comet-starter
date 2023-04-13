import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';
import './styles.scss';

const rootNode = document.getElementById('app');
if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
