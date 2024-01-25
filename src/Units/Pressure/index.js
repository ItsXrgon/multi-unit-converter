const atmosphere = require('./atmosphere');
const bar = require('./bar');
const pascal = require('./pascal');
const kilopascal = require('./kilopascal');
const megapascal = require('./megapascal');
const psi = require('./psi');

module.exports = [
	new atmosphere(),
	new bar(),
	new pascal(),
	new kilopascal(),
	new megapascal(),
	new psi(),
];
