import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/productTable';
import Navbar from '../components/navBar';

function CustomerCheckout() {
  const [name, setName] = useState('usuario');
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  function getCartItems() {
    const local = JSON.parse(localStorage.getItem('cart')) || [];
    const getCart = local.filter((element) => element.quantity > 0);
    setCart(getCart);

    if (local) {
      const result = local
        .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
      setQuantity(result.toFixed(2).replace('.', ','));
    }

    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  const handleInput = ({ target }) => setQuantity(target.value);

  const handleButton = () => {
    setOrder([
      { quantity: 10, productId: 2 },
      { quantity: 50, productId: 7 },
    ]);
    requestLogin('/sales', {
      sellerId, totalPrice, deliveryAddress, deliveryNumber, order,
    })
      .then((response) => {
        navigate(`/customer/orders/${response}`);
      });
  };

  return (
    <>
      <div>
        <Navbar name={ name } />
        {
          cart.map((element, index) => (
            <ProductTable
              product={ element }
              index={ index }
              key={ element.id }
            />
          ))
        }

        <div>
          <span>
            Total: R$
          </span>
          <span data-testid="customer_checkout__element-order-total-price">
            {quantity}
          </span>
        </div>
      </div>
      <div>
        P. Vendedora Responsável:
        <select data-testid="customer_checkout__select-seller">
          <option>Fulana Pereira</option>
        </select>
        Endereço
        <input
          data-testid="customer_checkout__input-address"
          onChange={ handleInput }
        />
        Número
        <input
          data-testid="customer_checkout__input-address-number"
          onChange={ handleInput }
        />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleButton }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </>

  );
}

export default CustomerCheckout;
