import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import CustomerOrders from './pages/CustomerOrders';
import Products from './pages/products';
import Checkout from './pages/checkoutPage';
import SellerOrders from './pages/SellerOrders';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import Administrator from './pages/Administrator';
import SellerOrderDetails from './pages/SellerOrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/customer/orders/:id" component={ CustomerOrderDetails } />
        <Route path="/customer/orders" component={ CustomerOrders } />
        <Route path="/customer/products" component={ Products } />
        <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
        <Route path="/seller/orders" component={ SellerOrders } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route exact path="/admin/manage" component={ Administrator } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
