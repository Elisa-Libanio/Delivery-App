import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

import { createNewUserRegister } from '../service/index';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttons, setButtons] = useState(true);

  const [displayError, setDisplayError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const doze = 12;
    const six = 6;
    if (password.length < six) return setButtons(true);

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    if (!emailCheck.test(email)) return setButtons(true);
    if (name.length < doze) return setButtons(true);
    setButtons(false);
  }, [email, password, name]);

  const sendData = async () => {
    try {
      const userData = {
        name,
        email,
        password,
      };

      const { data: { user } } = await createNewUserRegister(userData).then((res) => res);

      const userDat = {
        name,
        email,
        password,
        token: user.token,
      };

      localStorage.setItem('user', JSON.stringify(userDat));
      history.push('/customer/products');
    } catch (err) {
      console.log(err, 'err');
      setDisplayError(true);
    }
  };
  return (
    <main className="main">
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            placeholder="Seu nome"
            value={ name }
            id="name-input"
            data-testid="common_register__input-name"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email-input">
          Email
          <input
            type="text"
            placeholder="email@gmail.com"
            value={ email }
            id="email-input"
            data-testid="common_register__input-email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            placeholder="*******"
            value={ password }
            id="password-input"
            data-testid="common_register__input-password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ buttons }
          onClick={ sendData }
        >
          Cadastrar
        </button>
        { displayError && (
          <p data-testid="common_register__element-invalid_register">
            Deu erro!

          </p>)}
      </form>
    </main>
  );
}
