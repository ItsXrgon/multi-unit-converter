const acre = require('./acre');
const hectare = require('./hectare');
const footsquared = require('./footsquared');
const inchsquared = require('./inchsquared');
const kilometersquared = require('./kilometersquared');
const metersquared = require('./metersquared');
const centimetersquared = require('./centimetersquared');
const millimetersquared = require('./millimetersquared');
const yardsquared = require('./yardsquared');

module.exports = [
	new acre(),
	new hectare(),
	new footsquared(),
	new inchsquared(),
	new kilometersquared(),
	new metersquared(),
	new centimetersquared(),
	new millimetersquared(),
	new yardsquared(),
];
