import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { Modal, ModalProvider } from './context/Modal';

// I believe this sets up the Redux store
const store = configureStore();

// This is doing some setup if the app isn't in production
if (import.meta.env.MODE !== 'production') {
  restoreCSRF(); // I believe this brings back the CSRF token for dev use

  // This is doing some dev-only access on the window for testing
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// This is doing the rendering of the whole app into the root HTML element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* I believe this wraps everything with modal features */}
    <ModalProvider>
      {/* This is doing the setup for Redux across the app */}
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);