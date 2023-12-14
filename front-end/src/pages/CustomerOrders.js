import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import Header from '../components/header';
import CustomerOrdersList from '../components/orders/CustomerOrdersList';
import { getAllSales } from '../service';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllSales()
      .then(setOrders);
  }, []);

  return (
    <>
      <Header />
      <table>
        <CustomerOrdersList
          orders={
            orders.map((order) => ({
              orderId: order.id,
              status: order.status,
              date: dateFormat(new Date(order.saleDate), 'dd/mm/yyyy'),
              price: order.totalPrice.replace('.', ','),
            }))
          }
        />
      </table>
    </>
  );
}

export default CustomerOrders;
