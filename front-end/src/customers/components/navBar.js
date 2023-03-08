import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Navbar({ name }) {
  const [currentRoute, setCurrentRoute] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('customer')) {
      setCurrentRoute('customer');
    } else if (currentPath.includes('seller')) {
      setCurrentRoute('seller');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleProductsClick = () => {
    if (currentRoute === 'customer') {
      navigate('/customer/order');
    } else if (currentRoute === 'seller') {
      navigate('/seller/order');
    }
  };

  const handleOrdersClick = () => {
    if (currentRoute === 'customer') {
      navigate('/customer/orders');
    } else if (currentRoute === 'seller') {
      navigate('/seller/orders');
    }
  };

  return (
    <div>
      <nav>
        {currentRoute === 'customer' && (
          <button
            data-testid="customer_products__element-navbar-link-products"
            type="button"
            onClick={ handleProductsClick }
          >
            PRODUTOS
          </button>
        )}
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ handleOrdersClick }
        >
          PEDIDOS
        </button>
        <button
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
        >
          {name}
        </button>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Navbar;
