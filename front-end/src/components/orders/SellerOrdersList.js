import React/* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
import SellerOrderCard from './SellerOrderCard';

function SellerOrdersList({ orders }) {
  return (
    orders.map((order, index) => (
      <SellerOrderCard
        key={ index }
        keyVal={ (index + 1).toString() }
        order={ order }
      />
    ))
  );
}

SellerOrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    keyVal: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  })).isRequired,
};

export default SellerOrdersList;
