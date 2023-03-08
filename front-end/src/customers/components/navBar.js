import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ name }) {
  const [currentRoute, setcurrentRoute] = useState(false);
  const [currentRouteAdm, setcurrentRouteAdm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rotaAtual = window.location.pathname;
    if (rotaAtual.includes('customer')) setcurrentRoute(true);
    if (rotaAtual.includes('admin')) setcurrentRouteAdm(true);
  }, [currentRoute]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        {
          currentRoute && (
            <button
              data-testid="customer_products__element-navbar-link-products"
              type="button"
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
              onClick={ (() => navigate('/customer/orders')) }
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
          {
            name
          }

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
