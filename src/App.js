import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyle from './styles/globalstyles';
import Header from './components/Header';
import AppRoutes from './routes';

import store, { persistor }   from './store';


function App() {

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <AppRoutes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} className="toast-container"/>
        </BrowserRouter>
        </PersistGate>
        </Provider>

  );
}

export default App;
