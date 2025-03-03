/**
 * Generates a regular expression that matches any unit of measure using the aliases of all units available in the library.
 * @returns {RegExp} - Regular expression to match units.
 */
function generateRegex() {
	this.lengthUnits = require('./Units/Length/index.js');
	this.massUnits = require('./Units/Mass/index.js');
	this.liquidVolumeUnits = require('./Units/Liquid/index.js');
	this.timeUnits = require('./Units/Time/index.js');
	this.temperatureUnits = require('./Units/Temperature/index.js');
	this.electricCurrentUnits = require('./Units/Current/index.js');
	this.pressureUnits = require('./Units/Pressure/index.js');
	this.energyUnits = require('./Units/Energy/index.js');
	this.frequencyUnits = require('./Units/Frequency/index.js');
	this.volumeUnits = require('./Units/Volume/index.js');
	this.areaUnits = require('./Units/Area/index.js');

	const length = this.lengthUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const mass = this.massUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const liquidVolume = this.liquidVolumeUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const time = this.timeUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const temperature = this.temperatureUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const electricCurrent = this.electricCurrentUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const pressure = this.pressureUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const energy = this.energyUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const frequency = this.frequencyUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const volume = this.volumeUnits.flatMap((unit) => unit.aliases.join('|')).join('|');
	const area = this.areaUnits.flatMap((unit) => unit.aliases.join('|')).join('|');

	const regexString = `(\\d*\\.?\\d+)(?:\\s*)(${length}|${mass}|${liquidVolume}|${time}|${temperature}|${electricCurrent}|${pressure}|${energy}|${frequency}|${volume}|${area}|(\\d*)(?:'(\\d+)(?:"|in|inch|inches)?|ft|foot|feet))(?!\\w)`;
	return new RegExp(regexString, 'gi');
}

module.exports = generateRegex;
