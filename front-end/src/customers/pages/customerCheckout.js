// 17 - Crie uma tela de checkout do cliente com elementos com os data-testids disponíveis no protótipo
// Observações técnicas
// Se oriente pela seguinte tela do protótipo: Comum / Checkout;
import { useEffect, useState } from 'react';
import Navbar from '../components/navBar';

function CustomerCheckout() {
  const [cart, setCart] = useState();
  const [quantity, setQuantity] = useState();
  const [name, setName] = useState('usuario');

  function getCartItems() {
    const local = JSON.parse(localStorage.getItem('cart'));
    const getCart = local.filter((element) => element.quantity > 0);
    setCart(getCart);
  }

  function setNameFunc() {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  }

  useEffect(() => {
    if (cart) {
      const result = cart
        .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
      setQuantity(result.toFixed(2).replace('.', ','));
    }
    setNameFunc();
  }, [cart]);

  useEffect(() => {
    getCartItems();
  }, []);

  // refatorar pouco cabecalho da tabela
  const items = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover Item',
  ];

  return (
    <div>
      <Navbar name={ name } />
      <div>
        Finalizar Pedido
        <table>
          <thead>
            <tr>
              {items.map((element, index) => (
                <th key={ index }>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Aqui, a referência de identificação dos campos das linhas da tabela deve ser o índice (index) da matriz (array) dos produtos no carrinho de compras. Por exemplo:
                element-order-table-name-0; element-order-table-name-1; ...; element-order-table-name-x.
                */}
            { cart.map((element, index) => (
              // customer_checkout__element-order-table-item-number-<index>
              <tr key={ index }>
                <th
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </th>
                <th
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {element.name}
                </th>
                <th
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {element.quantity}
                </th>
                <th
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {element.price}
                </th>
                <th
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {(element.price * element.quantity)}
                </th>
                <th>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    type="button"
                  >
                    Remover
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* customer_checkout__element-order-total-price */}
        <div>
          <span>
            Total: R$
          </span>
          <span data-testid="customer_checkout__element-order-total-price">
            {quantity}
          </span>
        </div>
      </div>
      {/* customer_checkout__select-seller */}
      <div>
        P. Vendedora Responsável:
        <select data-testid="customer_checkout__select-seller">
          <option>Fulana Pereira</option>
        </select>
        Endereço
        <input data-testid="customer_checkout__input-address" />
        Número
        <input data-testid="customer_checkout__input-address-number" />
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}

export default CustomerCheckout;
