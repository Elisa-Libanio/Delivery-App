import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';
import dateFormat from 'dateformat';
import Header from '../components/header';
import { getAllSellers, getSaleById, updateStatusSale } from '../service';

function SellerOrderDetails({ match: { params } }) {
  const { id } = params;

  const [sale, setSale] = useState({});
  const [products, setProducts] = useState([]);
  const setUpdate = useState({})[1];

  useEffect(() => {
    getSaleById(id).then((response) => {
      setSale(
        {
          id: response.data.id,
          sellerId: response.data.sellerId,
          saleDate: dateFormat(new Date(response.data.saleDate), 'dd/mm/yyyy'),
          status: response.data.status,
          totalPrice: response.data.totalPrice.replace('.', ','),
        },
      );
      setProducts(response.data.products.map((product) => ({
        id: product.id,
        name: product.name,
        quantity: product.SaleProduct.quantity,
        unitPrice: product.price.replace('.', ','),
        subTotal: new Decimal(product.price)
          .mul(product.SaleProduct.quantity).toFixed(2).replace('.', ','),
      })));
      return response.data.sellerId;
    });
  }, [id]);

  useEffect(() => {
    getAllSellers().then((response) => setSeller(response));
  }, [sale]);

  const signalPreparing = async () => {
    await updateStatusSale(sale.id, 'Preparando');
    setUpdate({});
  };

  const signalDispatching = async () => {
    await updateStatusSale(sale.id, 'Em Trânsito');
    setUpdate({});
  };

  return (
    <div>
      <Header />
      <p
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        { sale.id }
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { sale.status }
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { sale.saleDate }
      </p>
      <button
        type="button"
        disabled={ sale.status !== 'Pendente' }
        data-testid="seller_order_details__button-preparing-check"
        onClick={ signalPreparing }
      >
        Vou começar a preparar
      </button>
      <button
        type="button"
        disabled={ sale.status !== 'Preparando' }
        data-testid="seller_order_details__button-dispatch-check"
        onClick={ signalDispatching }
      >
        Enviei pra sua casa
      </button>
      {
        products.map((product, index) => (
          <>
            <p
              data-testid={
                `seller_order_details__element-order-table-item-number-${product.id}`
              }
            >
              { `${index + 1}` }
            </p>
            <p
              data-testid={
                `seller_order_details__element-order-table-name-${product.id}`
              }
            >
              { product.name }
            </p>
            <p
              data-testid={
                `seller_order_details__element-order-table-quantity-${product.id}`
              }
            >
              { product.quantity }
            </p>
            <p
              data-testid={
                `seller_order_details__element-order-table-unit-price-${product.id}`
              }
            >
              { product.unitPrice }
            </p>
            <p
              data-testid={
                `seller_order_details__element-order-table-sub-total-${product.id}`
              }
            >
              { product.subTotal }
            </p>
          </>
        ))
      }
      <p
        data-testid="seller_order_details__element-order-total-price"
      >
        { sale.totalPrice }
      </p>
    </div>
  );
}

SellerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SellerOrderDetails;

// INFOS NECESSÁRIAS: numero do pedido.
// {
// "id": 1,
// "userId": null,
// "sellerId": 2,
// "totalPrice": "27.42",
// "deliveryAddress": "av cinco",
// "deliveryNumber": "23",
// "saleDate": "2022-03-15T14:53:02.000Z",
// "status": "Pendente"
// }
