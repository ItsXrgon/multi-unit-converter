const centimetercubed = require('./centimetercubed');
const footcubed = require('./footcubed');
const inchcubed = require('./inchcubed');
const kilometercubed = require('./kilometercubed');
const metercubed = require('./metercubed');
const millimetercubed = require('./millimetercubed');
const yardcubed = require('./yardcubed');

module.exports = [
	new centimetercubed(),
	new footcubed(),
	new inchcubed(),
	new kilometercubed(),
	new metercubed(),
	new millimetercubed(),
	new yardcubed(),
];
