import React/* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function SellerOrderCard({ order: { orderId, status, date, price, address }, keyVal }) {
  const history = useHistory();

  const link = () => {
    history.push(`/seller/orders/${orderId}`);
  };

  return (
    <tr onClick={ link }>
      <td data-testid={ `seller_orders__element-order-id-${orderId}` }>
        { keyVal }
      </td>
      <td data-testid={ `seller_orders__element-delivery-status-${orderId}` }>
        { status }
      </td>
      <td data-testid={ `seller_orders__element-order-date-${orderId}` }>
        { date }
      </td>
      <td data-testid={ `seller_orders__element-card-price-${orderId}` }>
        { price }
      </td>
      <td data-testid={ `seller_orders__element-card-address-${orderId}` }>
        { address }
      </td>
    </tr>
  );
}

SellerOrderCard.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  keyVal: PropTypes.number.isRequired,
};

export default SellerOrderCard;
