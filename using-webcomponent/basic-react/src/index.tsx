import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { defineCustomElements } from 'rar-webcomponents/loader'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

defineCustomElements(window)