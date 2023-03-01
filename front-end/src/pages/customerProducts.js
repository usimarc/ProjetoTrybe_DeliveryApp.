import React, { useState, useEffect } from 'react';
import { requestData } from '../ApiCall';
import Navbar from '../components/navBar';

function CustomerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => (
    requestData('/products')
      .then((result) => {
        setProducts(result);
      })
  ), [setProducts]);

  return (
    <>
      <>
        <Navbar />
        {products.map((element) => (
          <div key={ element.id }>
            <p data-testid={ `customer_products__element-card-price-${element.id}` }>
              {element.price}
            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${element.id}` }
              src={ element.urlImage }
              alt={ element.name }
            />
            <p data-testid={ `customer_products__element-card-title-${element.id}` }>
              {element.name}
            </p>
            <button
              data-testid={ `customer_products__button-card-rm-item-${element.id}` }
              type="button"
            >
              -

            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${element.id}` }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${element.id}` }
              type="button"
            >
              +
            </button>
          </div>
        ))}
      </>
      <div>
        <button
          data-testid="customer_products__button-cart"
          type="button"
        >
          <p data-testid="customer_products__checkout-bottom-value">
            Ver Carrinho: R$

          </p>
        </button>
      </div>
    </>
  );
}

export default CustomerProducts;
