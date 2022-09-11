import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//setup base styles
import "./nulling.styles.css";
import "./fonts.setup.css";
import "./base.page.style.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <App />
);


