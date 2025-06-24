// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Tailwind & global styles
import { CartProvider } from './lib/CartContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
