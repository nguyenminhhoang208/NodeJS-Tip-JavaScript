"use strict";
const mongoose = require('mongoose');
const countConnect = () => {
    const sumConnects = mongoose.connections.length;
    console.log('Number of connection: ' + sumConnects);
    return sumConnects;
};
module.exports = {
    countConnect,
};
