import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import V360MapController from './JS/V360MapController';
import reportWebVitals from './JS/BOILERPLATE/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <div id="v360Container">
            <V360MapController />
        </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
