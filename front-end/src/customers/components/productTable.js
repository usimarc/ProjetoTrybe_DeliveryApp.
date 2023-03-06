import PropTypes from 'prop-types';

function ProductTable({ product, index, quantity }) {
  const items = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
    'Remover Item',
  ];

  return (
    <div>
      Finalizar Pedido
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
              {product.price}
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              {(product.price * product.quantity)}
            </th>
            <button
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            >
              Remover
            </button>
          </tr>
        </tbody>
      </table>
      <div>
        <span>
          Total: R$
        </span>
        <span data-testid="customer_checkout__element-order-total-price">
          {quantity}
        </span>
      </div>
    </div>
  );
}

ProductTable.propTypes = {
  name: PropTypes.number,
  quantity: PropTypes.number,
  price: PropTypes.number,
}.isRequired;

export default ProductTable;
