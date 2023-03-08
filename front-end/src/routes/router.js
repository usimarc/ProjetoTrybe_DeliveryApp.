import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerProducts from '../customers/pages/customerProducts';
import Login from '../auth/login';
import Register from '../auth/register';
import CustomerCheckout from '../customers/pages/customerCheckout';
import CustomerOrders from '../customers/pages/CustomerOrders';
import SellerOrder from '../seller/pages/sellerOrder';
import CustomerOrderDetails from '../customers/pages/customerOrderDetails';
import SellerDetails from '../seller/pages/SellerDetails';
import AdminManageUsers from '../admin/pages/adminManageUsers';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route exact path="/customer/sales" element={ <CustomerOrders /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
      <Route exact path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
      <Route exact path="/seller/orders" element={ <SellerOrder /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerDetails /> } />
      <Route exact path="/admin/manage" element={ <AdminManageUsers /> } />
    </Routes>
  );
}

export default Router;
