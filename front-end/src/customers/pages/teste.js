/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../../utils/apiConnection';

function Test() {
  const [sellerId, setSellerId] = useState(Number);
  const [totalPrice, setTotalPrice] = useState(Number);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [order, setOrder] = useState('');
  const navigate = useNavigate();

  const handleTestButton = () => {
    setSellerId(2);
    setTotalPrice(200);
    setDeliveryAddress('Rua dos Maias');
    setDeliveryNumber('420');
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
      <div>teste....</div>
      <button
        type="button"
        onClick={ handleTestButton }
      >
        CLIQUE AQUI
      </button>
    </>
  );
}

export default Test;
