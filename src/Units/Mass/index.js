const milligram = require('./milligram');
const gram = require('./gram');
const kilogram = require('./kilogram');
const ounce = require('./ounce');
const pound = require('./pound');
const ton = require('./ton');
const tonne = require('./tonne');

module.exports = [new milligram(), new gram(), new kilogram(), new ounce(), new pound(), new ton(), new tonne()];
