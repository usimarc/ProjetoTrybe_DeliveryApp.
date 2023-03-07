import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Navbar({ name }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
        >
          PRODUTOS

        </button>
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ (() => navigate('/customer/orders')) }
        >
          MEUS PEDIDOS

        </button>
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
