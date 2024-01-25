const celsius = require('./celsius');
const fahrenheit = require('./fahrenheit');
const kelvin = require('./kelvin');

module.exports = [new celsius(), new fahrenheit(), new kelvin()];
