const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouer = require('./launches/launches.router');

const api = express.Router();


api.use('/planets',planetsRouter);
api.use('/launches', launchesRouer);

module.exports = {
    api
};