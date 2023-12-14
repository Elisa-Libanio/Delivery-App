import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const { name } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/'); // verificar
  };

  return (
    <navigator>
      <div>
        <div>
          <h3
            data-testid="customer_products__element-navbar-link-products"
          >
            <Link
              to="/customer/products"
            >
              PRODUTOS
            </Link>
          </h3>
        </div>
        <div>
          <h3>
            <Link
              data-testid="customer_products__element-navbar-link-orders"
              to="/customer/orders"
            >
              PEDIDOS
            </Link>
          </h3>
        </div>
      </div>
      <div className="box-nav">
        <div>
          <h3
            data-testid="customer_products__element-navbar-user-full-name"
          >
            <h1>{name}</h1>
          </h3>
        </div>
        <div>
          <h3>
            <button
              type="button"
              data-testid="customer_products__element-navbar-link-logout"
              onClick={ handleLogout }
            >
              sair
            </button>
          </h3>
        </div>
      </div>
    </navigator>
  );
}
export default Header;
