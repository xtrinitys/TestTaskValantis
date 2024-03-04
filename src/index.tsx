import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {attachAuthorizationHeader} from "./utils/API";

attachAuthorizationHeader();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);