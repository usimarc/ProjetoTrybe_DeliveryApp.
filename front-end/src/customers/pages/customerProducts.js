import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../components/navBar';
import ProductCard from '../components/products';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('usuario');
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const navigate = useNavigate();

  const setNameFunc = () => {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  };

  const attPrice = () => {
    const local = JSON.parse(localStorage.getItem('cart'));
    const getPrice = local
      .reduce((acc, curr) => acc + Number(curr.price) * Number(curr.quantity), 0);
    const result = `${getPrice.toFixed(2)}`.replace('.', ',');
    localStorage.setItem('totalprice', result);
    setTotalPrice(result);
    if (Number(getPrice) > 0) setDisabledBtn(false);
  };

  useEffect(() => {
    requestData('/products')
      .then((result) => {
        setProducts(result);
      });
    setNameFunc();
  }, [setProducts]);

  return (
    <>
      <Navbar name={ name } />
      {
        products.map((element) => (
          <ProductCard
            props={ element }
            totalPrice={ attPrice }
            key={ element.id }
          />
        ))
      }
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ disabledBtn }
        onClick={ () => navigate('/customer/checkout') }
      >
        <span>
          Ver Carrrinho: R$
        </span>
        <span data-testid="customer_products__checkout-bottom-value">
          { totalPrice }
        </span>
      </button>
    </>
  );
}

export default CustomerProducts;
