import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
// import { ToastContainer } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';

import Base from './components/Base';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Base>
        <App />
      </Base>
      {/* <ToastContainer /> */}
    </Provider>
  // </React.StrictMode>
);