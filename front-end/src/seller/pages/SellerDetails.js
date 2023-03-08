import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestData, requestUpdate } from '../../utils/apiConnection';
import Navbar from '../../customers/components/navBar';

function SellerDetails() {
  const [sale, setSale] = useState({});
  const [name, setName] = useState('');
  const [isDisabledBtnPrepare, setIsDisabledBtnPrepare] = useState(true);
  const [isDisabledBtnDelivery, setIsDisabledBtnDelivery] = useState(true);
  const [orderStatus, setOrderStatus] = useState('');
  const { id } = useParams('');
  const prefix = 'seller_order_details__';

  const handleStatus = (status) => {
    setOrderStatus(status);
  };

  const getSaleById = async () => {
    const data = await requestData(`/sales/${id}`);
    setSale(data);
    return handleStatus(data.status);
  };

  const correctDate = (date) => {
    const entryDate = new Date(date);
    const day = entryDate.getDate().toString().padStart(2, '0');
    const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = entryDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const four = 4;
  const correctId = (paraId) => `${paraId}`.padStart(four, '0');

  useEffect(() => {
    getSaleById();
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) setName(getName.name);
  }, []);

  useEffect(() => {
    if (orderStatus === 'Pendente') {
      setIsDisabledBtnPrepare(false);
    } else {
      setIsDisabledBtnPrepare(true);
    }

    if (orderStatus === 'Preparando') {
      setIsDisabledBtnDelivery(false);
    } else {
      setIsDisabledBtnDelivery(true);
    }
  }, [orderStatus]);

  const handleUpdateStatus = async (status) => {
    await requestUpdate(id, { status });
    handleStatus(status);
  };

  return (
    <div>
      <Navbar name={ name } />
      <h1>Detalhes do Pedido</h1>
      <div data-testid={ `${prefix}element-order-details-label-order-id` }>
        { correctId(sale.id) }
      </div>
      <div
        data-testid={ `${prefix}element-order-details-label-order-date` }
      >
        { correctDate(sale.saleDate) }
      </div>
      <div
        data-testid={ `${prefix}element-order-details-label-delivery-status` }
      >
        { orderStatus }
      </div>
      <button
        type="button"
        disabled={ isDisabledBtnPrepare }
        onClick={ () => handleUpdateStatus('Preparando') }
        data-testid={ `${prefix}button-preparing-check` }
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        disabled={ isDisabledBtnDelivery }
        onClick={ () => handleUpdateStatus('Em Trânsito') }
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
          { sale.products && sale.products.map((item, index) => (
            <tr key={ item.id }>
              <td
                data-testid={ `${prefix}element-order-table-item-number-${index}` }
              >
                { item.id }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-name-${index}` }
              >
                { item.name }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-quantity-${index}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-unit-price-${index}` }
              >
                { `R$ ${item.price.replace('.', ',')}` }
              </td>
              <td
                data-testid={ `${prefix}element-order-table-sub-total-${index}` }
              >
                {`R$ ${(item.price * item.quantity).toFixed(2)}`.replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <p
          data-testid={ `${prefix}element-order-total-price` }
        >
          { `${sale.totalPrice}`.replace('.', ',') }
        </p>
      </footer>
    </div>
  );
}

export default SellerDetails;
