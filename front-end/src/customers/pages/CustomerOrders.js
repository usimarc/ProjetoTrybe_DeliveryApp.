import { useEffect, useState } from 'react';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../components/navBar';

function CustomerOrders() {
  const [name, setName] = useState('usuario');
  const [orders, setOrders] = useState([]);

  const setNameFunc = () => {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  };

  function correctDate(date) {
    const entryDate = new Date(date);
    const day = entryDate.getDate().toString().padStart(2, '0');
    const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = entryDate.getFullYear().toString().substring(2);
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    requestData('/sales')
      .then((response) => {
        setOrders(response);
      });
    setNameFunc();
  }, []);

  console.log(orders);

  return (
    <div>
      <Navbar name={ name } />
      <h1 data-testid="customer_products__page-title">Meus Pedidos</h1>
      <table>
        <thead>
          <tr>
            <th>Data do Pedido</th>
            <th>Status</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={ order.id }>
              <td
                data-testid={ `customer_orders__element-order-id-${order.id}` }
              >
                {order.id}

              </td>
              <td
                data-testid={ `customer_products__element-order-status-${order.id}` }
              >
                {order.status}

              </td>
              <td
                data-testid={ `customer_products__element-order-date-${order.id}` }
              >
                {correctDate(order.saleDate)}

              </td>
              <td
                data-testid={ `customer_products__element-order-total-price-${order.id}` }
              >
                R$
                {' '}
                {order.totalPrice.replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrders;
