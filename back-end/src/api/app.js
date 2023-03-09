const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const errorHandler = require('../middleware/errorHandle');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/users', routes.userRoute);
app.use('/sales', routes.saleRoute);
app.use('/sellers', routes.sellerRoute);
app.use('/products', routes.productRoute);
app.use('/admin', routes.adminRoute);
app.use(routes.userRoute);

app.use(errorHandler);

module.exports = app;
