import PropTypes from 'prop-types';
import { useState } from 'react';

function ProductCard({ props }) {
  const { id, name, price, urlImage } = props;
  const [quantity, setQuantity] = useState(0);

  const handleMinusInput = () => {
    if (quantity < 0) setQuantity(0);
    if (quantity > 0) {
      setQuantity(quantity - 1);
      const product = {
        id,
        name,
        price,
        urlImage,
        quantity: quantity - 1,
      };
      const productInLocalstorage = JSON.parse(localStorage.getItem('cart')) || [];
      const updateLocalstorage = productInLocalstorage
        .filter((element) => element.id !== id);
      if (product.quantity > 0) {
        updateLocalstorage.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(updateLocalstorage));
    }
  };

  const handlePlusInput = () => {
    setQuantity(quantity + 1);
    const product = {
      id,
      name,
      price,
      urlImage,
      quantity: quantity + 1,
    };
    const productInLocalstorage = JSON.parse(localStorage.getItem('cart')) || [];
    const updateLocalstorage = productInLocalstorage
      .filter((element) => element.id !== id);
    updateLocalstorage.push(product);
    localStorage.setItem('cart', JSON.stringify(updateLocalstorage));
  };

  return (
    <div key={ id }>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        style={ { width: 100 } }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ handleMinusInput }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ (event) => setQuantity(event.target.value) }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ handlePlusInput }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.string,
  urlImage: PropTypes.string,
}.isRequired;

export default ProductCard;
