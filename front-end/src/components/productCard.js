import React from 'react';
import PropTypes from 'prop-types';
import AddOrRemoveProducts from './addRemoveProducts';

export default function ProductCard({ products, setParentProducts }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={ product.id }>
          <div>
            <h3
              className="product-card-price"
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              {product.price}
            </h3>
            <div className="image-section">
              <img
                className="product-card-image"
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
              />
            </div>
            <div className="info-section">
              <h5
                className="product-card-name"
                data-testid={ `customer_products__element-card-title-${product.id}` }
              >
                {product.name}
              </h5>
            </div>
            <div>
              <AddOrRemoveProducts
                product={ product }
                setParentProducts={ setParentProducts }
              />
            </div>
            <div />
          </div>
        </div>
      ))}
    </div>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  })).isRequired,
  setParentProducts: PropTypes.func.isRequired,
};
