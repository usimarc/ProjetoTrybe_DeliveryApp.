import React from 'react';
// 1 - Crie uma tela de login que deve ser acessível pelos endpoints / e /login no navegador
import Router from './pages/router';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
