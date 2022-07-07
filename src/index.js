import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './JS/App';
import reportWebVitals from './JS/reportWebVitals';

//THIS FILE NEEDS TO BE KEPT DIRECTLY IN THE SRC FOLDER (src/index.js) NOT IN JS (src/JS/index.js)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
