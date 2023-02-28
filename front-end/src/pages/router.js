import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A rota padrão (/) deve fazer redirecionamento para rota /login. */}
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
