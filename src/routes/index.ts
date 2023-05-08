import { Express } from 'express';
const homeRoute = require('./home.route');
const accessRoute = require('./access');

const routes = (app: Express): void => {
	app.use('/v1/shop/', accessRoute);
	app.use('/', homeRoute);
};

module.exports = routes;
