const centimetercubed = require('./centimetercubed');
const cup = require('./cup');
const fluidounce = require('./fluidounce');
const gallon = require('./gallon');
const kilometercubed = require('./kilometercubed');
const metercubed = require('./metercubed');
const millilitre = require('./millilitre');
const microliter = require('./microliter');
const liter = require('./liter');
const millimetercubed = require('./millimetercubed');
const tablespoon = require('./tablespoon');
const teaspoon = require('./teaspoon');

module.exports = [
	new centimetercubed(),
	new cup(),
	new fluidounce(),
	new gallon(),
	new kilometercubed(),
	new metercubed(),
	new millilitre(),
	new microliter(),
	new liter(),
	new millimetercubed(),
	new tablespoon(),
	new teaspoon(),
];
