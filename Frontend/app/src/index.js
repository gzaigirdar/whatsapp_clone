import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// prover from redux to a provide the store
import {Provider} from 'react-redux';
import { store } from './ReduxStore/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


