import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import App from './components/App';
import { BrowserRouter as Router} from 'react-router-dom'; 

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
