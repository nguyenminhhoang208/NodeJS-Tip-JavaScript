'use strict';

import compression from 'compression';
import express, { Express } from 'express';
require('dotenv').config();
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const app: Express = express();

const routes = require('./routes');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// connect database
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

// init middlewares

app.use(morgan('dev')); // log request

app.use(helmet()); // bảo vệ những thông tin riêng tư

app.use(compression()); // giảm kích thước dữ liệu vận chuyển

// routes

routes(app);

module.exports = app;
