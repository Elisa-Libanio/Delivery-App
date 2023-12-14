require('dotenv').config(); // import dotenv to use .env file
const express = require('express');
 // import express module
const app = express(); 
const path = require('path');
const cors = require('cors'); 
const router = require('../routes');
const errorHandler = require('../middlewares/errorHandler'); 
const productRouter = require('../routes/productRoute');
const salesRoute = require('../routes/salesRoute');

// app.use((req, _res, next) => {
//   console.log('body   ', req.body);
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use(router); 
app.use(productRouter);
app.use(salesRoute);
app.use(errorHandler);

module.exports = app;
