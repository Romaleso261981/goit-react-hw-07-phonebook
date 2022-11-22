import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './index.css';

// const basename =
//   process.env.NODE_ENV !== 'production'
//     ? '/goit-react-hw-06-phonebook'
//     : '/goit-react-hw-06-phonebook/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
  </React.StrictMode>
);
