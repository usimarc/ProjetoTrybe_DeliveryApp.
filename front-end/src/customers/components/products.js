import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

function ProductCard({ props, totalPrice }) {
  const { id, name, price, urlImage } = props;
  const [quantity, setQuantity] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      const productInLocalstorage = JSON.parse(localStorage.getItem('cart')) || [];
      const updateLocalstorage = productInLocalstorage
        .filter((element) => element.id !== id);
      updateLocalstorage.push({
        id,
        name,
        price,
        urlImage,
        quantity,
      });
      localStorage.setItem('cart', JSON.stringify(updateLocalstorage));

      totalPrice();
    } else {
      isFirstRender.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const handleMinusInput = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusInput = () => setQuantity(Number(quantity) + 1);

  const handleInput = ({ target }) => setQuantity(target.value);

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
        min={ 0 }
        value={ quantity }
        onChange={ handleInput }
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
