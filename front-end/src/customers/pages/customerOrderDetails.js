import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../components/navBar';

function CustomerOrderDetails() {
  const [name, setName] = useState('');
  const [product, setProducts] = useState({});
  const { id } = useParams('');
  const items = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
  ];

  const correctDate = (e) => {
    const entryDate = new Date(e);
    const day = entryDate.getDate().toString().padStart(2, '0');
    const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = entryDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getSaleById = async () => {
    const data = await requestData(`/sales/${id}`);
    setProducts(data);
  };

  const four = 4;
  const correctId = (paraId) => paraId.toString().padStart(four, '0');

  useEffect(() => {
    getSaleById();
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  }, []);

  return (
    <div>
      <Navbar name={ name } />
      <h1>Detalhe do Pedido</h1>
      <h1
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        PEDIDO
        {' '}
        { correctId(id) }

      </h1>
      <h1 data-testid="customer_order_details__element-order-details-label-seller-name">
        { product.sellerName }
      </h1>
      <h1
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { correctDate(product.saleDate) }
      </h1>
      <h1
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        { product.status }
      </h1>

      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled
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
          {product.products && product.products.map((element, index) => (
            <tr key={ element.id }>
              <th
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {element.name}

              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {element.quantity}

              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                {element.price.replace('.', ',')}

              </th>

              <th
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`${(element.price * element.quantity).toFixed(2)}`.replace('.', ',')}

              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <span>Total: R$</span>
      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        {`${product.totalPrice}`.replace('.', ',')}

      </span>
    </div>
  );
}

export default CustomerOrderDetails;
