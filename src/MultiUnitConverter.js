'use strict';
const InvalidUnitException =
	require('./Exceptions/InvalidUnitException').InvalidUnitException;
const InvalidPrecisionValueException =
	require('./Exceptions/InvalidPrecisionValueException').InvalidPrecisionValueException;
const InvalidTemplateException =
	require('./Exceptions/InvalidTemplateException').InvalidTemplateException;
/**
 * Class to convert units
 * @class
 * @property {number} precision The sig figs of the numbers that convertText() outputs
 * @property {object} units The units to convert to
 * @property {string} units.time The unit of time
 * @property {string} units.length The unit of length
 * @property {string} units.mass The unit of mass
 * @property {string} units.liquidVolume The unit of liquid volume
 * @property {string} units.temperature The unit of temperature
 * @property {string} units.electricCurrent The unit of electric current
 * @property {string} units.pressure The unit of pressure
 * @property {string} units.energy The unit of energy
 * @property {string} units.frequency The unit of frequency
 * @property {string} units.volume The unit of volume
 * @property {string} units.area The unit of area
 * @property {object} siUnits The SI units
 * @property {string} siUnits.time The SI unit of time
 * @property {string} siUnits.length The SI unit of length
 * @property {string} siUnits.mass The SI unit of mass
 * @property {string} siUnits.liquidVolume The SI unit of liquid volume
 * @property {string} siUnits.temperature The SI unit of temperature
 * @property {string} siUnits.electricCurrent The SI unit of electric current
 * @property {string} siUnits.pressure The SI unit of pressure
 * @property {string} siUnits.energy The SI unit of energy
 * @property {string} siUnits.frequency The SI unit of frequency
 * @property {string} siUnits.volume The SI unit of volume
 * @property {string} siUnits.area The SI unit of area
 * @property {object} lengthUnits The length units
 * @property {object} massUnits The mass units
 * @property {object} liquidVolumeUnits The liquid volume units
 * @property {object} timeUnits The time units
 * @property {object} temperatureUnits The temperature units
 * @property {object} electricCurrentUnits The electric current units
 * @property {object} pressureUnits The pressure units
 * @property {object} energyUnits The energy units
 * @property {object} frequencyUnits The frequency units
 * @property {object} volumeUnits The volume units
 * @property {object} areaUnits The area units
 * @property {object} lengthAliases The length aliases
 * @property {object} massAliases The mass aliases
 * @property {object} liquidVolumeAliases The liquid volume aliases
 * @property {object} timeAliases The time aliases
 * @property {object} temperatureAliases The temperature aliases
 * @property {object} electricCurrentAliases The electric current aliases
 * @property {object} pressureAliases The pressure aliases
 * @property {object} energyAliases The energy aliases
 * @property {object} frequencyAliases The frequency aliases
 * @property {object} volumeAliases The volume aliases
 * @property {object} areaAliases The area aliases
 * @property {object} lengthAliases The length aliases
 * @property {object} massAliases The mass aliases
 * @property {object} liquidVolumeAliases The liquid volume aliases
 * @property {object} timeAliases The time aliases
 * @property {object} temperatureAliases The temperature aliases
 * @property {object} electricCurrentAliases The electric current aliases
 */
class MultiUnitConverter {
	/**
	 * Creates an instance of MultiUnitConverter class
	 */

	constructor({
		time = 'second',
		length = 'meter',
		mass = 'kilogram',
		area = 'metersquared',
		volume = 'metercubed',
		liquidVolume = 'metercubed',
		//speed = 'meterpersecond',
		//acceleration = 'meterpersecondsquare',
		temperature = 'kelvin',
		electricCurrent = 'ampere',
		pressure = 'pascal',
		energy = 'joule',
		frequency = 'hertz',
		precision = 3,
	} = {}) {
		this.precision = precision;

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

		this.lengthAliases = this.lengthUnits.map((unit) => unit.aliases).flat();
		this.massAliases = this.massUnits.map((unit) => unit.aliases).flat();
		this.liquidVolumeAliases = this.liquidVolumeUnits
			.map((unit) => unit.aliases)
			.flat();
		this.timeAliases = this.timeUnits.map((unit) => unit.aliases).flat();
		this.temperatureAliases = this.temperatureUnits
			.map((unit) => unit.aliases)
			.flat();
		this.electricCurrentAliases = this.electricCurrentUnits
			.map((unit) => unit.aliases)
			.flat();
		this.pressureAliases = this.pressureUnits
			.map((unit) => unit.aliases)
			.flat();
		this.energyAliases = this.energyUnits.map((unit) => unit.aliases).flat();
		this.frequencyAliases = this.frequencyUnits
			.map((unit) => unit.aliases)
			.flat();
		this.volumeAliases = this.volumeUnits.map((unit) => unit.aliases).flat();
		this.areaAliases = this.areaUnits.map((unit) => unit.aliases).flat();

		this.siUnits = {
			time: this.timeUnits.find((unit) => unit.name === 'second'),
			length: this.lengthUnits.find((unit) => unit.name === 'meter'),
			mass: this.massUnits.find((unit) => unit.name === 'kilogram'),
			liquidVolume: this.liquidVolumeUnits.find(
				(unit) => unit.name === 'metercubed'
			),
			temperature: this.temperatureUnits.find((unit) => unit.name === 'kelvin'),
			electricCurrent: this.electricCurrentUnits.find(
				(unit) => unit.name === 'a'
			),
			pressure: this.pressureUnits.find((unit) => unit.name === 'pascal'),
			energy: this.energyUnits.find((unit) => unit.name === 'joule'),
			frequency: this.frequencyUnits.find((unit) => unit.name === 'hertz'),
			volume: this.volumeUnits.find((unit) => unit.name === 'metercubed'),
			area: this.areaUnits.find((unit) => unit.name === 'metersquared'),
		};

		this.units = {
			time: this.timeUnits.find((unit) => unit.name === time.toLowerCase()),
			length: this.lengthUnits.find(
				(unit) => unit.name === length.toLowerCase()
			),
			mass: this.massUnits.find((unit) => unit.name === mass.toLowerCase()),
			liquidVolume: this.liquidVolumeUnits.find(
				(unit) => unit.name === liquidVolume.toLowerCase()
			),
			temperature: this.temperatureUnits.find(
				(unit) => unit.name === temperature.toLowerCase()
			),
			electricCurrent: this.electricCurrentUnits.find(
				(unit) => unit.name === electricCurrent.toLowerCase()
			),
			pressure: this.pressureUnits.find(
				(unit) => unit.name === pressure.toLowerCase()
			),
			energy: this.energyUnits.find(
				(unit) => unit.name === energy.toLowerCase()
			),
			frequency: this.frequencyUnits.find(
				(unit) => unit.name === frequency.toLowerCase()
			),
			volume: this.volumeUnits.find(
				(unit) => unit.name === volume.toLowerCase()
			),
			area: this.areaUnits.find((unit) => unit.name === area.toLowerCase()),
		};
	}
	// Functions to change the units convertText(text) changes the units to
	// Units should be a string and included in the available list of units

	/**
	 * Sets the sig figs of the numbers that convertText() outputs
	 * @param {number} precision  The sig figs
	 */
	setPrecision(precision) {
		if (typeof precision != 'number') {
			throw new InvalidPrecisionValueException('Precision should be a number!');
		} else if (precision < 0) {
			throw new InvalidPrecisionValueException('Precision should 0 or more!');
		} else {
			this.precision = precision;
		}
	}

	/**
	 * Sets a template for the units that convertText() should convert to
	 * @param {string} template The template
	 */
	setAllUnits(template) {
		switch (template.toLowerCase()) {
			case 'metric':
				this.length = 'meter';
				this.mass = 'kilogram';
				this.liquidVolume = 'metercubed';
				this.area = 'metersquared';
				this.volume = 'metercubed';
				this.speed = 'meterpersecond';
				this.acceleration = 'meterpersecondsquare';
				break;
			case 'imperial':
				this.length = 'in';
				this.mass = 'lb';
				this.liquidVolume = 'fl_oz';
				this.area = 'ft2';
				this.volume = 'ft3';
				this.speed = 'mph';
				break;
			case 'us':
				this.length = 'ft';
				this.mass = 'lb';
				this.liquidVolume = 'fl_oz';
				this.area = 'ft2';
				this.speed = 'mph';
				break;
			case 'recipe':
				this.spoon = 'tbsp';
				this.mass = 'g';
				this.liquidVolume = 'cup';
				break;
			default:
				throw new InvalidTemplateException('Not an available template!');
		}
	}

	/**
	 * Sets the unit of time that convertText() should convert to
	 * @param {string} time  The unit of time
	 */
	setUnitTime(time) {
		if (typeof time != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.timeAliases.includes(time.toLowerCase())) {
			throw new InvalidUnitException(`Input ${time} is not a time unit!`);
		} else {
			this.units.time = this.resolveAliasesTime(time.toLowerCase());
		}
	}

	/**
	 * Sets the unit of length that convertText() should convert to
	 * @param {string} length  The unit of length
	 */
	setUnitLength(length) {
		if (typeof length != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.lengthAliases.includes(length.toLowerCase())) {
			throw new InvalidUnitException(`Input ${length} is not a length unit!`);
		} else {
			this.units.length = this.resolveAliasesLength(length.toLowerCase());
		}
	}

	/**
	 * Sets the unit of mass that convertText() should convert to
	 * @param {string} mass  The unit of mass
	 */
	setUnitmass(mass) {
		if (typeof mass != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.massAliases.includes(mass.toLowerCase())) {
			throw new InvalidUnitException(`Input ${mass} is not a mass unit!`);
		} else {
			this.units.mass = this.resolveAliasesMass(mass.toLowerCase());
		}
	}

	/**
	 * Sets the unit of liquid volume that convertText() should convert to
	 * @param {string} liquidVolume The unit of liquid volume
	 */
	setUnitLiquidVolume(liquidVolume) {
		if (typeof liquidVolume != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.liquidVolumeAliases.includes(liquidVolume.toLowerCase())) {
			throw new InvalidUnitException(
				`Input ${liquidVolume} is not a liquid volume unit!`
			);
		} else {
			this.units.liquidVolume = this.resolveAliasesLiquidVolume(
				liquidVolume.toLowerCase()
			);
		}
	}

	/**
	 * Sets the unit of temperature volume that convertText() should convert to
	 * @param {string} temperature The unit of temperature
	 */
	setUnitTemperature(temperature) {
		if (typeof temperature != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.temperatureAliases.includes(temperature.toLowerCase())) {
			throw new InvalidUnitException(
				`Input ${temperature} is not a temperature unit!`
			);
		} else {
			this.units.temperature = this.resolveAliasesTemperature(
				temperature.toLowerCase()
			);
		}
	}

	/**
	 * Sets the unit of electric current volume that convertText() should convert to
	 * @param {string} electricCurrent The unit of electric current
	 */
	setUnitElectricCurrent(electricCurrent) {
		if (typeof electricCurrent != 'string') {
			throw 'Unit should be a string!';
		} else if (
			!this.electricCurrentAliases.includes(electricCurrent.toLowerCase())
		) {
			throw new InvalidUnitException(
				`Input ${electricCurrent} is not an electric current unit!`
			);
		} else {
			this.units.electricCurrent = this.resolveAliasesElectricCurrent(
				electricCurrent.toLowerCase()
			);
		}
	}

	/**
	 * Sets the unit of pressure volume that convertText() should convert to
	 * @param {string} spoon The unit of pressure
	 */
	setUnitPressure(pressure) {
		if (typeof pressure != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.pressureAliases.includes(pressure.toLowerCase())) {
			throw new InvalidUnitException(`Input ${pressure} is not a spoon unit!`);
		} else {
			this.units.pressure = this.resolveAliasesPressure(pressure.toLowerCase());
		}
	}

	/**
	 * Sets the unit of spoon volume that convertText() should convert to
	 * @param {string} spoon The unit of spoon
	 */
	setUnitEnergy(energy) {
		if (typeof energy != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.energyAliases.includes(energy.toLowerCase())) {
			throw new InvalidUnitException(`Input ${energy} is not a spoon unit!`);
		} else {
			this.units.energy = this.resolveAliasesEnergy(energy.toLowerCase());
		}
	}

	/**
	 * Sets the unit of spoon volume that convertText() should convert to
	 * @param {string} spoon The unit of spoon
	 */
	setUnitFrequency(frequency) {
		if (typeof frequency != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.frequencyUnits.includes(frequency.toLowerCase())) {
			throw new InvalidUnitException(`Input ${frequency} is not a spoon unit!`);
		} else {
			this.units.frequency = this.resolveAliasesFrequency(
				frequency.toLowerCase()
			);
		}
	}

	/**
	 * Sets the unit of spoon volume that convertText() should convert to
	 *
	 * @param {string} spoon The unit of spoon
	 */
	setUnitArea(area) {
		if (typeof area != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.areaAliases.includes(area.toLowerCase())) {
			throw new InvalidUnitException(`Input ${area} is not a spoon unit!`);
		} else {
			this.units.area = this.resolveAliasesArea(area.toLowerCase());
		}
	}

	/**
	 * Sets the unit of spoon volume that convertText() should convert to
	 *
	 * @param {string} spoon The unit of spoon
	 */
	setUnitVolume(volume) {
		if (typeof volume != 'string') {
			throw 'Unit should be a string!';
		} else if (!this.volumeAliases.includes(volume.toLowerCase())) {
			throw new InvalidUnitException(`Input ${volume} is not a spoon unit!`);
		} else {
			this.units.volume = this.resolveAliasesVolume(volume.toLowerCase());
		}
	}

	resolveAliasesTime(unit) {
		for (const [, unitObject] of Object.entries(this.timeUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesLength(unit) {
		for (const [, unitObject] of Object.entries(this.lengthUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesMass(unit) {
		for (const [, unitObject] of Object.entries(this.massUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesLiquidVolume(unit) {
		for (const [, unitObject] of Object.entries(this.liquidVolumeUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesTemperature(unit) {
		for (const [, unitObject] of Object.entries(this.temperatureUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesElectricCurrent(unit) {
		for (const [, unitObject] of Object.entries(this.electricCurrentUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesPressure(unit) {
		for (const [, unitObject] of Object.entries(this.pressureUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesEnergy(unit) {
		for (const [, unitObject] of Object.entries(this.energyUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesFrequency(unit) {
		for (const [, unitObject] of Object.entries(this.frequencyUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesArea(unit) {
		for (const [, unitObject] of Object.entries(this.areaUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	resolveAliasesVolume(unit) {
		for (const [, unitObject] of Object.entries(this.volumeUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	/**
	 * Converts the values
	 * @param {number} value The value of the input
	 * @param {string} unit The unit of the input
	 * @returns {string} converted unit string
	 */
	#convertUnitsToSelected(value, unit) {
		unit = unit.replace(/[0-9\.°']/g, '').trim();
		let output = 0;

		if (this.timeAliases.includes(unit)) {
			// case time units
			const timeUnit = this.resolveAliasesTime(unit);
			const selectedUnit = this.units.time;

			output = value * timeUnit.toSI + timeUnit.offset;
			if (this.units.time !== this.siUnits.time) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.lengthAliases.includes(unit)) {
			// case length units
			const lengthUnit = this.resolveAliasesLength(unit);
			const selectedUnit = this.units.length;

			output = value * lengthUnit.toSI + lengthUnit.offset;
			if (this.units.length !== this.siUnits.length) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.massAliases.includes(unit)) {
			// case mass units
			const massUnit = this.resolveAliasesMass(unit);
			const selectedUnit = this.units.mass;

			output = value * massUnit.toSI + massUnit.offset;
			if (this.units.mass !== this.siUnits.mass) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.liquidVolumeAliases.includes(unit)) {
			// case liquid volume units
			const liquidUnit = this.resolveAliasesLiquidVolume(unit);
			const selectedUnit = this.units.liquidVolume;

			output = value * liquidUnit.toSI + liquidUnit.offset;
			if (this.units.liquidVolume !== this.siUnits.liquidVolume) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.temperatureAliases.includes(unit)) {
			// case temperature units
			const temperatureUnit = this.resolveAliasesTemperature(unit);
			const selectedUnit = this.units.temperature;

			output = value * temperatureUnit.toSI + temperatureUnit.offset;
			if (this.units.temperature !== this.siUnits.temperature) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.electricCurrentAliases.includes(unit)) {
			// case electric current units
			const currentUnit = this.resolveAliasesElectricCurrent(unit);
			const selectedUnit = this.units.electricCurrent;

			output = value * currentUnit.toSI + currentUnit.offset;
			if (this.units.electricCurrent !== this.siUnits.electricCurrent) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.pressureAliases.includes(unit)) {
			// case pressure units
			const pressureUnit = this.resolveAliasesPressure(unit);
			const selectedUnit = this.units.pressure;

			output = value * pressureUnit.toSI + pressureUnit.offset;
			if (this.units.pressure !== this.siUnits.pressure) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.energyAliases.includes(unit)) {
			// case energy units
			const energyUnit = this.resolveAliasesEnergy(unit);
			const selectedUnit = this.units.energy;

			output = value * energyUnit.toSI + energyUnit.offset;
			if (this.units.energy !== this.siUnits.energy) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.frequencyAliases.includes(unit)) {
			// case frequency units
			const frequencyUnit = this.resolveAliasesFrequency(unit);
			const selectedUnit = this.units.frequency;

			output = value * frequencyUnit.toSI + frequencyUnit.offset;
			if (this.units.frequency !== this.siUnits.frequency) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.volumeAliases.includes(unit)) {
			// case volume units
			const volumeUnit = this.resolveAliasesVolume(unit);
			const selectedUnit = this.units.volume;

			output = value * volumeUnit.toSI + volumeUnit.offset;
			if (this.units.volume !== this.siUnits.volume) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.areaAliases.includes(unit)) {
			// case area units
			const areaUnit = this.resolveAliasesArea(unit);
			const selectedUnit = this.units.area;

			output = value * areaUnit.toSI + areaUnit.offset;
			if (this.units.area !== this.siUnits.area) {
				output = value / selectedUnit.toSI - selectedUnit.offset;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		throw new InvalidUnitException(`Input ${unit} is not a valid unit!`); // if unit is not found
	}

	/**
	 * Rounds numbers to decimal 3 places
	 * @param {number} value  The number to round
	 * @returns {number} Rounded number
	 */
	#roundNumbers(value) {
		const regex = /(\d+\.\d{4,})/g;
		const matches = String(value).match(regex);
		if (matches) {
			matches.forEach((num) => {
				const rounded = parseFloat(parseFloat(num).toPrecision(this.precision));
				value = value.replace(num, rounded);
			});
		}
		return value;
	}

	/* CODE TO GET REGEX
    let regExUnits = "/(\d*\.?\d+)(?:\s*)"
    regExUnits += `(${Object.values(this.timeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.lengthUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.massUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.liquidVolumeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.temperatureUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.electricCurrentUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.spoonUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.pressureUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.energyUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.frequencyUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.volumeUnits).flat().join('|')}`
    regExUnits += `|${Object.values(this.areaUnits).flat().join('|')}`
    regExUnits += "|(\d*)(?:'(\d+)(?:\"|in|inch|inches)?|ft|foot|feet))(?!\w)/g"
    console.log(regExUnits)
    */

	/**
	 * Converts text to specified units
	 * @param {string} text  The text to convert
	 * @returns {string} Text with converted values and units
	 */
	convertText(text) {
		if (typeof text != 'string') {
			throw 'Text should be a string!';
		}

		// regex to detect numbers followed by units
		// find all the units in the text using the regex pattern
		const regex = new RegExp(
			/(\d*\.?\d+)(?:\s*)(miliseconds|milisecond|ms|seconds|second|s|sec|secs|minutes|minute|min|hours|hour|h|days|day|d|milimeters|milimeter|mm|mms|centimeters|centimeter|cm|cms|yards|yard|yd|meters|meter|m|kilometers|kilometer|km|miles|mile|mi|miligrams|miligram|mg|grams|gram|g|ounces|ounce|ozs|oz|pounds|pound|lbs|lb|kilograms|kilogram|kg|tonnes|tonne|tn|tons|ton|t|milimeters cubed|milimeter cubed|mm3|mm³|centimeters cubed|centimeter cubed|cm3|cm³|meters cubed|meter cubed|m3|m³|milliliters|milliliter|ml|liters|liter|l|fluid ounces|fluid ounce|fl ozs|fl oz|cups|cup|gallons|gallon|gal|milliamperes|milliampere|ma|amperes|ampere|a|kiloamperes|kiloampere|ka|teaspoons|teaspoon|tea spoon|tsp|tablespoons|tablespoons|table spoon|tbsp|pascals|Pascal|pa|kilopascals|Kilopascal|kpa|megapascals|Megapascal|mpa|atmospheres|atmosphere|atm|pounds per square inch|pound per square inch|psi|bar|joules|joule|j|kilojoules|kilojoule|kJ|megajoules|megajoule|mJ|kilowatt-hours|kilowatt-hour|kwh|hertz|hertz|Hz|kilohertz|kilohertz|khz|megahertz|megahertz|mhz|gigahertz|gigahertz|ghz|cubic millimeters|cubic millimeter|millimeter cubed|millimeters cubed|mm3|mm³|cubic centimeters|cubic centimeter|centimeter cubed|centimeters cubed|cm3|cm³|cubic meters|cubic meter|meter cubed|meters cubed|m3|m³|cubic inches|cubic inch|inch cubed|inches cubed|in3|in³|cubic feet|cubic foot|ft3|ft³|cubic yards|cubic yard|yard cubed|yards cubed|yd3|yd³|square millimeters|square millimeter|millimeter squared|millimeters squared|mm2|mm²|square centimeters|square centimeter|centimeter squared|centimeters squared|cm²|cm²|square meters|square meter|meter squared|meters squared|m2|m²|square kilometers|square kilometer|kilometers squared|kilometerss squared|km²|km²|square inches|square inch|inche squared|inches squared|in2|in²|square feet|square foot|ft2|ft²|square yards|square yard|yd²2|yd²|acres|acre|ac|hectares|hectare|ha|°C|°F|°K|C|F|K|in|inch|inches|ft|foot|feet|(\d*)(?:'(\d+)(?:\"|in|inch|inches)?|ft|foot|feet))(?!\w)/gi
		);
		const units = text.match(regex);
		// if no units are found, return the original text
		if (!units) {
			return text;
		}

		// loop through each unit found and convert it to its equivalent unit value
		units.forEach((unit) => {
			// extract the numeric value and unit without the plural suffix
			let value = parseFloat(unit);
			if (unit.includes('"') && unit.includes("'")) {
				const measurements = unit.split("'");
				value = parseFloat(measurements[0]) * 12 + parseFloat(measurements[1]);
			}

			// convert the unit to its equivalent SI value using the conversion factor dictionary
			let newValue = this.#convertUnitsToSelected(value, unit.toLowerCase());

			newValue = this.#roundNumbers(newValue);

			// replace the original unit with the SI unit in the text
			text = text.replace(unit, newValue);
		});
		return text;
	}
}

module.exports = MultiUnitConverter;
