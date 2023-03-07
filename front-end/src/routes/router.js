import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerProducts from '../customers/pages/customerProducts';
import Login from '../auth/login';
import Register from '../auth/register';
import CustomerCheckout from '../customers/pages/customerCheckout';
import CustomerOrders from '../customers/pages/CustomerOrders';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
    </Routes>
  );
}

export default Router;
