const hertz = require('./hertz');
const kilohertz = require('./kilohertz');
const megahertz = require('./megahertz');
const gigahertz = require('./gigahertz');

module.exports = [
	new hertz(),
	new kilohertz(),
	new megahertz(),
	new gigahertz(),
];
