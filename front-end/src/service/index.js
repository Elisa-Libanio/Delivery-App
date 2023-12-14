import api from './service';

const UserLogin = async ({ email, password }) => {
  try {
    const user = await api.post('/login', { email, password },
      { validateStatus: () => true }).then((res) => res.data);
    return user;
  } catch (err) {
    return err;
  }
};

const createNewUserRegister = async ({ name, email, password }) => {
  try {
    const userData = {
      name,
      email,
      password,
    };

    const login = await api.post('/register', userData);
    return login;
  } catch (err) {
    return err;
  }
};

const getAllProducts = async () => {
  try {
    const products = await api.get('/products')
      .then((res) => res.data)
      .then((result) => result.map((element) => (
        { ...element, price: element.price.replace('.', ',') }
      )));

    return products;
  } catch (err) {
    return err;
  }
};

const getAllUsers = async (token) => {
  try {
    const response = await api.get('/users', { headers: { Authorization: token } });
    return response;
  } catch (err) {
    console.log(err.response);
    return err;
    // return null;
  }
};

const getAllSellers = async () => {
  const { data } = await api.get('/sellers');
  return data;
};

const registerSale = async (incomingSale, products, token) => {
  const sale = { ...incomingSale };
  const response = await api.post(
    '/sales',
    {
      sale,
      products,
    },
    { headers: { Authorization: token }, validateStatus: () => true },
  );
  return response;
};

const getAllSales = async () => {
  const response = await api.get(
    '/sales',
    { validateStatus: () => true },
  );
  return response.data;
};

const getSaleById = async (id) => {
  try {
    // console.log('getSaleById -> id, token', id, token);
    const response = await api.get(
      `/sales/${id}`,
    );
    // console.log('getSaleById -> response', response);
    return response;
  } catch (error) {
    console.log(error.response);
    return err;
  }
};

const updateStatusSale = async (saleId, status) => {
  try {
    const response = await api.put(`/sales/${saleId}`,
      { status });
    return response;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

const admin = async ({ name, email, password, role }, token) => {
  const adminData = {
    name,
    email,
    password,
    role,
  };

  const cadastra = await api.post(
    '/admin/manage', adminData,
    { headers: { Authorization: token } },
  );
  console.log(cadastra, 'cadastra');
  return cadastra;
};

export {
  getAllProducts,
  UserLogin,
  createNewUserRegister,
  getAllUsers,
  getAllSellers,
  registerSale,
  getAllSales,
  getSaleById,
  updateStatusSale,
  admin,
};
