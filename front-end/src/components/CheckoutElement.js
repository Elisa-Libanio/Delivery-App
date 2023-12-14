import React from 'react';
import PropTypes from 'prop-types';

function CheckoutElement(
  { cartItem: { id, name, quantity, price, subTotal },
    setCart,
    keyValue },
) {
  const deleteThis = () => {
    setCart((current) => (
      current.map((curEl) => (
        (curEl.id === id) ? null : curEl
      )).filter((x) => x)
    ));
  };

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${keyValue}` }
      >
        { keyValue + 1 }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-name-${keyValue}` }>
        { name }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-quantity-${keyValue}` }>
        { quantity }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-unit-price-${keyValue}` }>
        { price }
      </td>
      <td data-testid={ `customer_checkout__element-order-table-sub-total-${keyValue}` }>
        { subTotal }
      </td>
      <td>
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${keyValue}` }
          type="button"
          onClick={ deleteThis }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

CheckoutElement.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
  }).isRequired,
  setCart: PropTypes.func.isRequired,
  keyValue: PropTypes.number.isRequired,
};

export default CheckoutElement;
