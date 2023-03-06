/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

function ProductTable({ product, index, cart, setCart }) {
  const items = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover Item',
  ];

  const handleRemoveButton = (event) => {
    event.preventDefault();
    const productId = Number(event.target.name);
    const newCart = cart.filter((element) => element.id !== productId);
    setCart([...newCart]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {items.map((element, i) => (
              <th key={ i }>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={ index }>
            <th
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-name-${index}`
              }
            >
              {product.name}
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-quantity-${index}`
              }
            >
              {product.quantity}
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
            >
              {product.price.replace('.', ',')}
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              {`${(product.price * product.quantity).toFixed(2)}`.replace('.', ',')}
            </th>
            <button
              type="button"
              name={ product.id }
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              onClick={ handleRemoveButton }
            >
              Remover
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ProductTable.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default ProductTable;
