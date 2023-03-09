import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Navbar({ name }) {
  const [currentRoute, setCurrentRoute] = useState(false);
  const [currentRouteAdm, setCurrentRouteAdm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rotaAtual = window.location.pathname;
    if (rotaAtual.includes('customer')) setCurrentRoute(true);
    if (rotaAtual.includes('admin')) setCurrentRouteAdm(true);
  }, [currentRoute]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleProductsClick = () => {
    if (currentRoute) {
      navigate('/customer/products');
    } else {
      navigate('/seller/order');
    }
  };

  const handleOrdersClick = () => {
    if (currentRoute) {
      navigate('/customer/orders');
    } else {
      navigate('/seller/orders');
    }
  };

  return (
    <div>
      <nav>
        {
          currentRoute && (
            <button
              data-testid="customer_products__element-navbar-link-products"
              type="button"
              onClick={ handleProductsClick }
            >
              PRODUTOS

            </button>
          )
        }

        {
          !currentRouteAdm && (
            <button
              data-testid="customer_products__element-navbar-link-orders"
              type="button"
              onClick={ handleOrdersClick }
            >
              PEDIDOS

            </button>
          )
        }

        {
          currentRouteAdm && (
            <button
              data-testid="customer_products__element-navbar-link-orders"
              type="button"
            >
              GERENCIAR USUÁRIOS

            </button>
          )
        }

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
