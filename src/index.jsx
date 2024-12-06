import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
    console.log('start app');
    return <h1>Hallo allemaal</h1>;
}
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
console.log('init');