import React/* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
import CustomerOrderCard from './CustomerOrderCard';

function CustomerOrdersList({ orders }) {
  return (
    orders.map((order, index) => (
      <CustomerOrderCard
        key={ index }
        keyVal={ (index + 1).toString() }
        order={ order }
      />
    ))
  );
}

CustomerOrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    keyVal: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default CustomerOrdersList;
