const centimeter = require('./centimeter');
const foot = require('./foot');
const inch = require('./inch');
const kilometer = require('./kilometer');
const meter = require('./meter');
const millimeter = require('./millimeter');
const mile = require('./mile');
const yard = require('./yard');
const lightyear = require('./lightyear');

module.exports = [
	new centimeter(),
	new foot(),
	new inch(),
	new kilometer(),
	new meter(),
	new millimeter(),
	new mile(),
	new yard(),
	new lightyear(),
];
