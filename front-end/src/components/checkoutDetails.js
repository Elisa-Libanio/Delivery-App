import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { registerSale, getAllSellers } from '../service';

export default function CheckoutDetails({ totalPrice, products }) {
  const [sellers, setSellers] = useState([]);
  const [user, setUser] = useState('');
  const [currentSeller, setCurrentSeller] = useState(0);
  const [deliveryAddress, setDeliveryAddres] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  useEffect(() => {
    // setCurrentSeller(parseInt(localStorage.getItem('currentSeller'), 10));
    getAllSellers()
      .then(setSellers);
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const history = useHistory();
  async function confirmSale() {
    const request = await registerSale(
      {
        userId: user.id,
        sellerId: currentSeller,
        totalPrice: totalPrice.replace(',', '.'),
        deliveryAddress,
        deliveryNumber,
      },
      products,
      user.token,
    );
    history.push(`/customer/orders/${request.data.saleId}`);
  }

  const changeSeller = (event) => {
    setCurrentSeller(event.target.options[event.target.selectedIndex].value);
  };

  const changeAddress = (event) => {
    setDeliveryAddres(event.target.value);
  };

  const changeNumber = (event) => {
    setDeliveryNumber(event.target.value);
  };

  return (
    <div>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form>
        <label htmlFor="sellerId">
          P. Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            defaultValue="Selecione..."
            name="sellerId"
            onChange={ changeSeller }
            type="select"
          >
            <option disabled>Selecione...</option>
            { sellers.map((seller) => (
              <option
                key={ seller.id }
                value={ seller.id }
              >
                { seller.name }
              </option>))}
            ;
          </select>
        </label>
        <label htmlFor="deliveryAddress">
          Endereço
          <input
            type="text"
            data-testid="customer_checkout__input-address"
            name="deliveryAddress"
            onChange={ changeAddress }
            placeholder="Rua, Avenida"
          />
        </label>
        <label htmlFor="deliveryNumber">
          Número
          <input
            type="number"
            data-testid="customer_checkout__input-addressNumber"
            name="deliveryNumber"
            onChange={ changeNumber }
            placeholder="0"
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ confirmSale }
        id="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

CheckoutDetails.propTypes = {
  totalPrice: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};
