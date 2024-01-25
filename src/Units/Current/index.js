const ampere = require('./ampere');
const milliampere = require('./milliampere');
const kiloampere = require('./kiloampere');

module.exports = [new ampere(), new milliampere(), new kiloampere()];
