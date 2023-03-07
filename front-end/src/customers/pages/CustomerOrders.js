import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    setNameFunc();
  }, []);

  return (
    <div>
      <Navbar name={ name } />
      <h1 data-testid="customer_products__page-title">Meus Pedidos</h1>
      <div>
        {orders.map((order) => (
          <Link key={ order.id } to={ `/customer/orders/${order.id}` }>
            <div>
              <div data-testid={ `customer_orders__element-order-id-${order.id}` }>
                <h3>
                  Pedido #
                  {correctId(order.id)}
                </h3>
              </div>
              <div>
                <p data-testid={ `customer_products__element-order-status-${order.id}` }>
                  {' '}
                  {order.status}
                  {' '}
                </p>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CustomerOrders;
