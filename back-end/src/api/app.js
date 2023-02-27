const express = require('express');
const fluxoComum = require('../routes/user.routes')

const app = express();

// app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', fluxoComum)


module.exports = app;
