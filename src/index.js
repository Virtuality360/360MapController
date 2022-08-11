import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './JS/App';
import reportWebVitals from './JS/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/**
     * The leaflet map MUST go into a container with a defined height
     * In this case, the internal leaflet map will inherit the height
     * of the App-Container div.
     * When importing the app into another project, ensure that hieght 
     * is defined explicitly.
     */}
    <div className='App-Container'>
        <App />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
