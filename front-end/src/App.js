import React from 'react';
// 1 - Crie uma tela de login que deve ser acessível pelos endpoints / e /login no navegador
import Router from './pages/router';

import './App.css';
import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div className="App">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>

      <Router />

    </div>
  );
}

export default App;
