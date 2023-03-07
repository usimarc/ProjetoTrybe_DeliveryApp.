import { useEffect, useState } from 'react';
import { requestData, requestUpdate } from '../utils/apiConnection';

function Teste() {
  const [orders, setOrders] = useState([]);

  const correctDate = (date) => {
    const entryDate = new Date(date);
    const day = entryDate.getDate().toString().padStart(2, '0');
    const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = entryDate.getFullYear().toString().substring(2);
    return `${day}/${month}/${year}`;
  };

  const four = 4;
  const correctId = (paraId) => paraId.toString().padStart(four, '0');

  useEffect(() => {
    requestData('/sales')
      .then((response) => {
        setOrders(response);
      });
  }, [orders]);

  return (
    <div>
      <h1 data-testid="customer_products__page-title">Meus Pedidos</h1>
      <div>
        {orders.map((order) => (
          <div key={ order.id }>
            <div data-testid={ `customer_orders__element-order-id-${order.id}` }>
              <h3>
                Pedido #
                {correctId(order.id)}
              </h3>
            </div>
            <div>
              <div>
                <button
                  type="button"
                  onClick={ (() => requestUpdate('/sales', {
                    id: order.id, status: 'preparo' })) }
                >
                  preparando
                </button>
                <p data-testid={ `customer_products__element-order-status-${order.id}` }>
                  {' '}
                  {order.status}
                  {' '}
                </p>
                <button
                  type="button"
                  onClick={
                    (() => requestUpdate('/sales', {
                      id: order.id, status: 'saiu para entrega' }))
                  }
                >
                  saiu para entrega
                </button>
              </div>
              <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
                {' '}
                {correctDate(order.saleDate)}
                {' '}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {' '}
                R$
                {' '}
                {order.totalPrice.replace('.', ',')}
                {' '}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teste;
