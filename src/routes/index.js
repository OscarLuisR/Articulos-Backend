const { Router } = require('express');
const routes = Router();

// Routes
routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/articulos', require('./articulos.routes'));

module.exports = routes;