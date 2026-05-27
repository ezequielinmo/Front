import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from '../src/Redux/Store';
import './index.css';

const resizeObserverMessages = [
  'ResizeObserver loop limit exceeded',
  'ResizeObserver loop completed with undelivered notifications.',
];

window.addEventListener('error', (event) => {
  if (resizeObserverMessages.includes(event.message)) {
    event.stopImmediatePropagation();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
