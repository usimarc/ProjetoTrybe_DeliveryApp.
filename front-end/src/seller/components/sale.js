import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function SaleCard({ props }) {
  const navigate = useNavigate();

  const correctDate = (date) => {
    const entryDate = new Date(date);
    const day = entryDate.getDate().toString().padStart(2, '0');
    const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
    const year = entryDate.getFullYear().toString().substring(2);
    return `${day}/${month}/${year}`;
  };

  const handleClick = (id) => {
    navigate(`/seller/orders/${id}`);
  };

  return (
    <div
      role="button"
      tabIndex={ props.id }
      onClick={ () => handleClick(props.id) }
      onKeyDown={ handleClick }
    >
      <p data-testid={ `seller_orders__element-order-id-${props.id}` }>
        {`Pedido ${props.id}`}
      </p>

      <p data-testid={ `seller_orders__element-delivery-status-${props.id}` }>
        {props.status}
      </p>

      <p data-testid={ `seller_orders__element-order-date-${props.id}` }>
        {correctDate(props.saleDate)}
      </p>

      <p data-testid={ `seller_orders__element-card-price-${props.id}` }>
        {`R$ ${props.totalPrice}`}
      </p>

      <p data-testid={ `seller_orders__element-card-address-${props.id}` }>
        {`${props.deliveryAddress} ${props.deliveryNumber}`}
      </p>
    </div>
  );
}

SaleCard.propTypes = {
  props: PropTypes.shape.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default SaleCard;
