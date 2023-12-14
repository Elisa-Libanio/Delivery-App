import React, { useState, useEffect } from 'react';
import Decimal from 'decimal.js';

import Header from '../components/header';
import CheckoutList from '../components/CheckoutList';
import CheckoutDetails from '../components/checkoutDetails';

function Checkout() {
  const [cart, setCart] = useState([]);

  const getCart = () => {
    let localCart = [];
    const localData = localStorage.getItem('cart');
    if (localData) {
      localCart = JSON.parse(localData);
    }
    return localCart;
  };

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalPrice = cart.reduce(
    (acc, element) => acc.plus(new Decimal(element.subTotal.replace(',', '.'))),
    new Decimal('0.00'),
  ).toFixed(2).replace('.', ',');

  const products = cart.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

  return (
    <>
      <Header />
      <h1>Finalizar Pedido</h1>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub Total</th>
          <th>Remover Item</th>
        </tr>
        <CheckoutList cartItems={ cart } setCart={ setCart } />
        <CheckoutDetails totalPrice={ totalPrice } products={ products } />
        <h2 data-testid="customer_checkout__element-order-total-price">

          { `Total: ${totalPrice}` }
        </h2>
      </table>
    </>
  );
}

export default Checkout;
