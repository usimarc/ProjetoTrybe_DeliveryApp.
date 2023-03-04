import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../components/navBar';
import ProductCard from '../components/products';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('usuario');
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [disabledBtn, setDisabledBtn] = useState(true);

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
      <Link to="/customer/checkout">
        <button
          data-testid="customer_products__button-cart"
          type="button"
          disabled={ disabledBtn }
        >

          <button
            type="button"
            disabled={ disabledBtn }
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice }
          </button>
        </button>
      </Link>
    </>
  );
}

export default CustomerProducts;
