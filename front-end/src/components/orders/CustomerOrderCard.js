import React/* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CustomerOrderCard({ order: { orderId, status, date, price }, keyVal }) {
  const history = useHistory();

  const link = () => {
    history.push(`/customer/orders/${orderId}`);
  };

  return (
    <tr onClick={ link }>
      <td data-testid={ `customer_orders__element-order-id-${orderId}` }>
        { keyVal }
      </td>
      <td data-testid={ `customer_orders__element-delivery-status-${orderId}` }>
        { status }
      </td>
      <td data-testid={ `customer_orders__element-order-date-${orderId}` }>
        { date }
      </td>
      <td data-testid={ `customer_orders__element-card-price-${orderId}` }>
        { price }
      </td>
    </tr>
  );
}

CustomerOrderCard.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  keyVal: PropTypes.number.isRequired,
};

export default CustomerOrderCard;
