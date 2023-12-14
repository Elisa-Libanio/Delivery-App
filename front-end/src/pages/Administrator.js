import React, { useState, useEffect } from 'react';
import NavAdmin from '../components/navAdmin';
import { admin } from '../service/index';

export default function Administrator() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswor] = useState('');
  const [buttons, setButtons] = useState(true);
  const [role, setRole] = useState('customer');
  const [displayError, setDisplayError] = useState(false);

  const { token } = JSON.parse(localStorage.getItem('user'));

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
        role,
      };

      const datas = await admin(userData, token);

      // const userDat = {
      //   name,
      //   email,
      //   password,
      //   role,
      //   token: user.token,
      // };
      console.log(datas, 'datas');
      // localStorage.setItem('user', JSON.stringify(userDat));
    } catch (err) {
      console.log(err, 'err');
      setDisplayError(true);
    }
  };

  return (
    <div>
      <NavAdmin />
      <form>
        <label htmlFor="input-name">
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            id="input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="input-email">
          Email
          <input
            data-testid="admin_manage__input-email"
            type="email"
            id="input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="input-senha">
          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            id="input-senha"
            value={ password }
            onChange={ ({ target }) => setPasswor(target.value) }
          />
        </label>

        <label htmlFor="select-role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            id="select-role"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="admin">Admin</option>
            <option value="customer">Cliente</option>
          </select>
        </label>

        <button
          type="button"
          className="register-button"
          data-testid="admin_manage__button-register"
          disabled={ buttons }
          onClick={ sendData }
        >
          CADASTRAR
        </button>
        { displayError && (
          <p data-testid="admin_manage__element-invalid-register">
            Deu erro!

          </p>)}
      </form>
    </div>

  );
}
