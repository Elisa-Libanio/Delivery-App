import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import Header from '../components/header';
import SellerOrdersList from '../components/orders/SellerOrdersList';
import { getAllSales } from '../service';

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllSales()
      .then(setOrders);
  }, []);

  return (
    <>
      <Header />
      <table>
        <SellerOrdersList
          orders={
            orders.map((order) => ({
              orderId: order.id,
              status: order.status,
              date: dateFormat(new Date(order.saleDate), 'dd/mm/yyyy'),
              price: order.totalPrice.replace('.', ','),
              address: `${order.deliveryAddress}, ${order.deliveryNumber}`,
            }))
          }
        />
      </table>
    </>
  );
}

export default SellerOrders;
