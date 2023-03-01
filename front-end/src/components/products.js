import PropTypes from 'prop-types';

function ProductCard({ props }) {
  const { id, name, price, urlImage } = props;

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
      >
        -

      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
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
