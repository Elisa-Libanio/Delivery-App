import React from 'react';
import Header from './header';

function SellerOrderCard() {
  return (
    <div>
      <div>
        <Header />
        {' '}
      </div>
      <p>Detalhe do Pedido </p>
      <div>
        <tr
          data-testid={
            `customer_order_details__element-order-table-item-number-${itemId}`
          }
        >
          { number }
        </tr>
        <tr data-testid={ `customer_order_details__element-order-table-name--${itemId}` }>
          Name
        </tr>
        <tr
          data-testid={ `customer_order_details__element-order-table-quantity-${itemId}` }
        >
          { quantity }
        </tr>
        <tr
          data-testid={
            `customer_order_details__element-order-table-sub-total-${itemId}`
          }
        >
          { partialSum }
        </tr>
        <tr>
          <button
            data-testid={ `customer_order_details__element-order-total-price--${itemId}` }
            type="button"
          >
            Total
          </button>
        </tr>
      </div>
    </div>
  );
}

export default SellerOrderCard;
