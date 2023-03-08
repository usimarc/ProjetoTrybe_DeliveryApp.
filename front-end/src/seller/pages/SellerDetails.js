import React, { useState } from 'react';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../../customers/components/navBar';

function SellerDetails() {
  const prefix = 'seller_order_details__';
  const pref = 'seller_order_details__';

  const [sales, setSales] = useState([]);
  const [name, setName] = useState('');

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
        setSales(response);
      });
    setNameFunc();
  }, []);

  return (
    <div>
      <Navbar name={ name } />
      <h1>Detalhes do Pedido</h1>
      <div data-testid={ `${prefix}element-order-details-label-order-id` }>
        { correctId(sales.id) }
      </div>
      <div
        data-testid={ `${prefix}element-order-details-label-order-date` }
      >
        { correctDate(sales.date) }
      </div>
      <div
        data-testid={ `${prefix}element-order-details-label-delivery-status` }
      >
        { sales.status }
      </div>
      <button
        type="button"
        data-testid={ `${prefix}button-preparing-check` }
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        data-testid={ `${prefix}button-dispatch-check` }
      >
        SAIU PARA ENTREGA
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            sales.map((sale) => (
              <tr key={ sale.id }>
                <td
                  data-testid={ `${pref}element-order-table-item-number-${sale.id}` }
                >
                  { sale.id }
                </td>
                <td
                  data-testid={ `${pref}element-order-table-name-${sale.id}` }
                >
                  { sale.name }
                </td>
                <td
                  data-testid={ `${pref}element-order-table-quantity-${sale.id}` }
                >
                  { sale.quantity }
                </td>
                <td
                  data-testid={ `${pref}element-order-table-unit-price-${sale.id}` }
                >
                  { sale.value }
                </td>
                <td
                  data-testid={ `${pref}element-order-table-sub-total-${sale.id}` }
                >
                  { sale.total }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <footer>
        <p
          data-testid="seller_order_details__element-order-total-price"
        >
          { sales.totalPrice }
        </p>
      </footer>
    </div>
  );
}

export default SellerDetails;
