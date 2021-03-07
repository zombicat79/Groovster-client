import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import { AuthProvider } from './context/auth-context';
import { ModeProvider } from './context/mode-context';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <ModeProvider>
        <App />
      </ModeProvider>
    </AuthProvider>
  </Router>
, document.getElementById('root'));
