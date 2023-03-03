import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerProducts from '../customers/pages/customerProducts';
import Login from '../auth/login';
import Register from '../auth/register';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
    </Routes>
  );
}

export default Router;
