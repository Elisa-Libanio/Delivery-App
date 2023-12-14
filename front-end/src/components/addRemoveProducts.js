import React from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js';

Decimal.set({ precision: 20, rounding: 2 });

function AddOrRemoveProducts({ product, setParentProducts }) {
  const setQuantity = (quantity) => {
    setParentProducts((parentProducts) => parentProducts.map((p) => {
      if (p.id === product.id) {
        return ({
          ...p,
          quantity: parseInt(quantity, 10),
          subTotal: new Decimal(p.price.replace(',', '.'))
            .mul(parseInt(quantity, 10))
            .toFixed(2)
            .replace('.', ','),
        });
      }
      return p;
    }));
  };

  const setQuantityManualy = (e) => {
    setQuantity(e.target.value);
  };

  const decrementQuantity = () => {
    if (product.quantity > 0) setQuantity(product.quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(product.quantity + 1);
  };

  return (
    <>
      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          onClick={ decrementQuantity }
        >
          -
        </button>
      </div>
      <div>
        <input
          type="text"
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
          value={ product.quantity }
          onChange={ setQuantityManualy }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          onClick={ incrementQuantity }

        >
          +
        </button>
      </div>
    </>
  );
}

AddOrRemoveProducts.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  setParentProducts: PropTypes.func.isRequired,
};

export default AddOrRemoveProducts;
