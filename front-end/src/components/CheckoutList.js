import React from 'react';

import CheckoutElement from './CheckoutElement';

function CheckoutList({ cartItems, setCart }) {
  return (
    cartItems.map((item, index) => (
      <CheckoutElement
        key={ index }
        keyValue={ index }
        cartItem={ item }
        setCart={ setCart }
      />
    ))
  );
}

export default CheckoutList;
