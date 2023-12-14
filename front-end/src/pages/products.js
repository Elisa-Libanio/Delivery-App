import Decimal from 'decimal.js';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import Context from '../context/Context';
import Header from '../components/header';
import Loading from '../components/loading';
import ProductCard from '../components/productCard';
import { getAllProducts } from '../service/index';

Decimal.set({ precision: 20, rounding: 2 });

export default function Products() {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  const getCart = () => {
    let cart = [];
    const localData = localStorage.getItem('cart');
    if (localData) {
      cart = JSON.parse(localData);
      console.log(localData, 'localData');
    }
    return Object.fromEntries(cart.map((item) => [item.id, item]));
  };

  useEffect(() => {
    const cart = getCart();
    getAllProducts()
      .then((response) => response.map((item) => ({
        ...item,
        quantity: (cart[item.id] && cart[item.id].quantity) || 0,
        subTotal: new Decimal(item.price.replace(',', '.'))
          .mul(parseInt((cart[item.id] && cart[item.id].quantity) || 0, 10))
          .toFixed(2)
          .replace('.', ','),
      })))
      .then((response) => setProducts(response));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(products.filter((product) => product.quantity)),
    );
  }, [products]);

  if (!products.length) {
    return (
      <Loading />
    );
  }

  const total = products.reduce((acc, val) => {
    if (val.subTotal) {
      return acc.plus(new Decimal(val.subTotal.replace(',', '.')));
    }
    return acc;
  }, new Decimal('0.00'))
    .toFixed(2)
    .replace('.', ',');

  return (
    <div>
      <div data-testid="customer_products__element-navbar-link-products">
        <Header />
        <ProductCard products={ products } setParentProducts={ setProducts } />
      </div>
      <div>
        <button
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ () => { history.push('/customer/checkout'); } }
          disabled={ products.every((p) => !p.quantity) }
        >
          Ver Carrinho:
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {
              total
            }
          </span>
        </button>
      </div>
    </div>
  );
}
