// 17 - Crie uma tela de checkout do cliente com elementos com os data-testids disponíveis no protótipo
// Observações técnicas
// Se oriente pela seguinte tela do protótipo: Comum / Checkout;
import { useEffect, useState } from 'react';
import Navbar from '../components/navBar';

function CustomerCheckout() {
  const [cart, setCart] = useState();
  const [quantity, setQuantity] = useState();

  // A quantidade de itens no checkout deve corresponder à quantidade de itens no recorte aleatório de produtos utilizados no teste;
  //   ┌───────────┬───────────────────────────┬──────────┬───────────┬──────────┐
  //   │ productId │           name            │ quantity │ unitPrice │ subTotal │
  //   ├───────────┼───────────────────────────┼──────────┼───────────┼──────────┤
  //   │     2     │     'Heineken 600ml'      │    4     │  '7,50'   │ '30,00'  │
  //   │     3     │ 'Antarctica Pilsen 300ml' │    1     │  '2,49'   │  '2,49'  │
  //   │     5     │       'Skol 269ml'        │    2     │  '2,19'   │  '4,38'  │
  //   │     6     │ 'Skol Beats Senses 313ml' │    2     │  '4,49'   │  '8,98'  │
  //   │    11     │   'Stella Artois 275ml'   │    1     │  '3,49'   │  '3,49'  │
  //   └───────────┴───────────────────────────┴──────────┴───────────┴──────────┘

  function getCartItems() {
    const local = JSON.parse(localStorage.getItem('cart'));
    const getCart = local.filter((element) => element.quantity > 0);
    setCart(getCart);

    const result = cart
      .reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)), 0);
    setQuantity(result.toFixed(2).replace('.', ','));
  }

  //   const attPrice = () => {
  //     const local = JSON.parse(localStorage.getItem('cart'));
  //     const getPrice = local
  //       .reduce((acc, curr) => acc + Number(curr.price) * Number(curr.quantity), 0);
  //     const result = `${getPrice.toFixed(2)}`.replace('.', ',');
  //     setTotalPrice(result);
  //     if (Number(getPrice) > 0) setDisabledBtn(false);
  //   };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        Finalizar Pedido
        <table>
          <thead>
            <tr>
              Item
            </tr>
            <tr>
              Descrição
            </tr>
            <tr>
              Quantidade
            </tr>
            <tr>
              Valor Unitário
            </tr>
            <tr>
              Sub-total
            </tr>
            <tr>
              Remover Item
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
