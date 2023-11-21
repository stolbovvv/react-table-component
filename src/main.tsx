import '@fontsource-variable/roboto-slab';
import '@fontsource-variable/inter';

import 'styles/reset.css';
import 'styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
);
