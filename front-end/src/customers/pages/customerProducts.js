import React, { useState, useEffect } from 'react';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../components/navBar';
import ProductCard from '../components/products';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('usuario');

  const setNameFunc = () => {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
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
          <ProductCard props={ element } key={ element.id } />
        ))
      }
      <button
        data-testid="customer_products__button-cart"
        type="button"
      >
        <p data-testid="customer_products__checkout-bottom-value">
          Ver Carrinho: R$

        </p>
      </button>
    </>
  );
}

export default CustomerProducts;
