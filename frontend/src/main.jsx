import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authenticator } from "@aws-amplify/ui-react";
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>,
)
