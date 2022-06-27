import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//npx json-server --watch react-image-hosting/data/db.json --port 8000

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);