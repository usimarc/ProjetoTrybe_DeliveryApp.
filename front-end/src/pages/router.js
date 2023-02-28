// 1 - Crie uma tela de login que deve ser acessível pelos endpoints / e /login no navegador
// Observações técnicas
// Aqui deve-se garantir que a aplicação possui acesso a uma rota /login;
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A rota padrão (/) deve fazer redirecionamento para rota /login. */}
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
