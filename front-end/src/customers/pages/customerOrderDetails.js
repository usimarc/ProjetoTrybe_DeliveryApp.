import React, { useEffect, useState } from 'react';
// https://javascript.plainenglish.io/react-router-how-to-use-the-useparams-hook-321a6461732
import { useParams } from 'react-router-dom';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../components/navBar';

function CustomerOrderDetails() {
  const [cart, setCart] = useState();
  console.log(cart);
  const { id } = useParams();
  const [date, setDate] = useState();
  const items = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
  ];
  const [totalPrice, setTotalPrice] = useState(0);

  const setNameFunc = () => {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  };

  useEffect(() => {
    const getSale = async () => {
      const { data } = await requestData(`/sales/${id}`);
      const cartMAP = data.products.map(({ name, price, SaleProduct }) => ({
        name, price, quantity: SaleProduct.quantity }));
      setCart(cartMAP);
      setTotalPrice(data.totalPrice);
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate
      // var today = new Date();
      // var day = today.getUTCDate();
      const day = new Date(data.saleDate).getUTCDate();
      const month = new Date(data.saleDate).getUTCMonth();
      const year = new Date(data.saleDate).getFullYear();
      const noMagic = 9;
      setDate(`${day}/${month + 1 < noMagic ? `0${month + 1}` : month + 1}/${year}`);
    };
    getSale();
    setNameFunc();
  }, []);

  //   useEffect(() => {
  //     requestData('/sales')
  //       .then((response) => {
  //         setCart(response);
  //       });

  //     setNameFunc();
  //   }, []);

  return (
    <div>
      <Navbar />
      <h1>Detalhe do Pedido</h1>
      <h1
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        PEDIDO
        {' '}
        { id }

      </h1>
      <h1 data-testid="customer_order_details__element-order-details-label-seller-name">
        tenho que pegar sellerName
      </h1>
      <h1
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { date }
      </h1>
      <h1
        data-testid="customer_order_details__element-
        order-details-label-delivery-status<index>"
      >
        ENTREGUE
      </h1>

      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled="true"
      >
        MARCAR COMO ENTREGUE
      </button>
      <table>
        <thead>
          <tr>
            {items.map((element, i) => (
              <th key={ i }>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={ index }>
              <th
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </th>
              <th
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {product.name}

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {product.quantity}

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {product.price.replace('.', ',')}

              </th>

              <th
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {`${(product.price * product.quantity).toFixed(2)}`.replace('.', ',')}

              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <span>Total: R$</span>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        {totalPrice.toFixed(2).replace('.', ',')}

      </span>
    </div>
  );
}

export default CustomerOrderDetails;
