import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserLogin } from '../service/index';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttons, setButtons] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [reload, setReload] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const six = 6;
    if (password.length < six) return false;

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    if (!emailCheck.test(email)) return false;

    if (email && password) return setButtons(false);
  }, [email, password]);

  useEffect(() => {
    console.log('Está executando o useEffect');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'customer') {
      history.push('/customer/products');
    }

    if (user && user.role === 'seller') {
      history.push('/seller/orders');
    }

    if (user && user.role === 'administrator') {
      history.push('/admin/manage');
    }
  }, [history, reload]);

  async function handleClick() {
    const request = await UserLogin({ email, password });

    if (request.message) {
      const { message } = request;

      setDisplayError(true);
      setErrorMessage(message);
    } else {
      localStorage.setItem('user', JSON.stringify(request));
    }

    setReload(!reload);
  }

  return (
    <form className="loginPage">
      <div
        className="loginInput"
      >
        Login
        <input
          type="email"
          data-testid="common_login__input-email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
        />
      </div>
      <div
        className="loginInput"
      >
        Senha
        <input
          type="password"
          value={ password }
          data-testid="common_login__input-password"
          onChange={ (event) => setPassword(event.target.value) }
        />
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ buttons }
          onClick={ handleClick }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        {
          displayError && (
            <p data-testid="common_login__element-invalid-email">
              { errorMessage }
            </p>
          )
        }
      </div>
    </form>
  );
}

export default Login;
