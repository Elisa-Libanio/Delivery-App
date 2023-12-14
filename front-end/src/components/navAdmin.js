import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function NavAdmin() {
  const [nameAdmin, setNameAdmin] = useState('');
  const history = useHistory();

  function removeLocalStorage() {
    localStorage.clear();// Limpa localStorage e redireciona para a tela principal(Login)
    history.push('/');
  }

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('user'));
    setNameAdmin(results.name);
  }, []);

  return (
    <header>
      <h3
        data-testid="customer_productselement-navbar-link-orders"
      >
        GERENCIAR USUÁRIOS
      </h3>
      <span
        data-testid="customer_productselement-navbar-user-full-name"
      >
        {nameAdmin}
      </span>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ removeLocalStorage }
      >
        Sair
      </button>
    </header>
  );
}
