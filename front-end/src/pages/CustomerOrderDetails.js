import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';
import dateFormat from 'dateformat';
import Header from '../components/header';
import { getSaleById, getAllSellers, updateStatusSale } from '../service';

function CustomerOrderDetails({ match: { params } }) {
  const { id } = params;
  // seria pegar o id da rota
  console.log(id, 'id');
  const [sale, setSale] = useState({});
  const [seller, setSeller] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getSaleById(id).then((response) => {
      setSale(
        {
          id: response.data.id,
          sellerId: response.data.sellerId,
          saleDate: dateFormat(new Date(response.data.saleDate), 'dd/mm/yyyy'),
          status: response.data.status,
          totPrice: response.data.totalPrice.replace('.', ','),
        },
      );
      setProducts(response.data.products.map((product) => ({
        id: product.id,
        nome: product.name,
        quantidade: product.SaleProduct.quantity,
        valorUnit: product.price.replace('.', ','),
        subTotal: new Decimal(product.price)
          .mul(product.SaleProduct.quantity).toFixed(2).replace('.', ','),
      })));
      return response.data.sellerId;
    }).then((sellerId) => {
      getAllSellers().then((res) => {
        setSeller(res.find((sel) => sel.id === sellerId).name);
      });
    });
  }, [id]);

  const handleClick = async () => {
    await updateStatusSale();
  };

  const someStr = 'customer_order_details'
  + '__element-order-details-label-seller-name-';
  const str2 = 'customer_order_details'
  + '__element-order-details-label-delivery-status-';
  const ddd = 'customer_order_details'
  + '__element-order-details-label-order-date';

  return (
    <div>
      <Header />
      <h2>Detalhe do Pedido </h2>

      <h2
        data-testid={
          `customer_order_details__element-order-details-label-order-id-${sale.id}`
        }
      >
        {sale.id}
        {' '}

      </h2>
      <h2
        data-testid={
          `${someStr}${seller}`
        }
      >
        {seller}
      </h2>
      <h2
        data-testid={
          `${ddd}${sale.id}`
        }
      >
        {sale.saleDate}
      </h2>
      <h2 data-testid={ `${str2}${sale.id}` }>
        {' '}
        {sale.status}
      </h2>

      { products.map((item, index) => (
        <tr key={ index }>
          <td
            data-testid={
              `customer_checkout__element-order-table-item-number-${item.id}`
            }
          >
            {`${index + 1}` }
          </td>
          <td data-testid={ `customer_checkout__element-order-table-name-${item.id}` }>
            { item.nome}
          </td>
          <td
            data-testid={ `customer_checkout__element-order-table-quantity-${item.id}` }
          >
            { item.quantidade }
          </td>
          <td
            data-testid={
              `customer_checkout__element-order-table-unit-price-${item.id}`
            }
          >
            { item.valorUnit }
          </td>
          <td
            data-testid={
              `customer_checkout__element-order-table-sub-total-${item.id}`
            }
          >
            { item.subTotal }
          </td>
        </tr>))}
      <div
        data-testid="customer_order_details__element-order-total-price"
      >
        { `Preço total: ${sale.totPrice}` }
      </div>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled
        onClick={ handleClick }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

CustomerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CustomerOrderDetails;
