import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// 11 - Crie uma tela de produtos do cliente contendo uma barra de navegação - navbar -, que servirá também para demais telas das pessoas usuárias
import CustomerProducts from './customerProducts';
import Login from './login';
import Register from './register';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
