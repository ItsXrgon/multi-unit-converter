'use strict';
const InvalidUnitException =
	require('./Exceptions/InvalidUnitException').InvalidUnitException;
const InvalidPrecisionValueException =
	require('./Exceptions/InvalidPrecisionValueException').InvalidPrecisionValueException;
const InvalidTemplateException =
	require('./Exceptions/InvalidTemplateException').InvalidTemplateException;

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
		this.units = {
			time,
			length,
			mass,
			area,
			volume,
			liquidVolume,
			//speed,
			//acceleration,
			temperature,
			electricCurrent,
			pressure,
			energy,
			frequency,
		};
		this.siUnits = {
			time: 'second',
			length: 'meter',
			mass: 'kilogram',
			area: 'metersquared',
			volume: 'metercubed',
			liquidVolume: 'metercubed',
			//speed: 'meterpersecond',
			//acceleration: 'meterpersecondsquare',
			temperature: 'kelvin',
			electricCurrent: 'ampere',
			pressure: 'pascal',
			energy: 'joule',
			frequency: 'hertz',
		};

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
			this.units.time = this.#resolveAliasesTime(time.toLowerCase()).name;
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
			this.units.length = this.#resolveAliasesLength(length.toLowerCase()).name;
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
			this.units.mass = this.#resolveAliasesmass(mass.toLowerCase()).name;
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
			this.units.liquidVolume = this.#resolveAliasesLiquidVolume(
				liquidVolume.toLowerCase()
			).name;
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
			this.units.temperature = this.#resolveAliasesTemperature(
				temperature.toLowerCase()
			).name;
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
			this.units.electricCurrent = this.#resolveAliasesElectricCurrent(
				electricCurrent.toLowerCase()
			).name;
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
			this.units.pressure = this.#resolveAliasesPressure(
				pressure.toLowerCase()
			).name;
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
			this.units.energy = this.#resolveAliasesEnergy(energy.toLowerCase()).name;
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
			this.units.frequency = this.#resolveAliasesFrequency(
				frequency.toLowerCase()
			).name;
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
			this.units.area = this.#resolveAliasesArea(area.toLowerCase()).name;
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
			this.units.volume = this.#resolveAliasesVolume(volume.toLowerCase()).name;
		}
	}

	#resolveAliasesTime(unit) {
		for (const [, unitObject] of Object.entries(this.timeUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesLength(unit) {
		for (const [, unitObject] of Object.entries(this.lengthUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesmass(unit) {
		for (const [, unitObject] of Object.entries(this.massUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesLiquidVolume(unit) {
		for (const [, unitObject] of Object.entries(this.liquidVolumeUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesTemperature(unit) {
		for (const [, unitObject] of Object.entries(this.temperatureUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesElectricCurrent(unit) {
		for (const [, unitObject] of Object.entries(this.electricCurrentUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesPressure(unit) {
		for (const [, unitObject] of Object.entries(this.pressureUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesEnergy(unit) {
		for (const [, unitObject] of Object.entries(this.energyUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesFrequency(unit) {
		for (const [, unitObject] of Object.entries(this.frequencyUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesArea(unit) {
		for (const [, unitObject] of Object.entries(this.areaUnits)) {
			if (unitObject.aliases.includes(unit)) {
				return unitObject;
			}
		}
	}

	#resolveAliasesVolume(unit) {
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
		const numberAndUnit = unit;
		unit = unit.replace(/[0-9\.°']/g, '').trim();
		let output = 0;

		if (this.timeAliases.includes(unit)) {
			// case time units
			const timeUnit = this.#resolveAliasesTime(unit);
			const selectedUnit = this.#resolveAliasesTime(this.units.time);

			output = value * timeUnit.toSI;
			if (this.units.time !== this.siUnits.time) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.lengthAliases.includes(unit)) {
			// case length units
			const lengthUnit = this.#resolveAliasesLength(unit);
			const selectedUnit = this.#resolveAliasesLength(this.units.length);

			output = value * lengthUnit.toSI;
			if (this.units.length !== this.siUnits.length) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.massAliases.includes(unit)) {
			// case mass units
			const massUnit = this.#resolveAliasesmass(unit);
			const selectedUnit = this.#resolveAliasesmass(this.units.mass);

			output = value * massUnit.toSI;
			if (this.units.mass !== this.siUnits.mass) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.liquidVolumeAliases.includes(unit)) {
			// case liquid volume units
			const liquidUnit = this.#resolveAliasesLiquidVolume(unit);
			const selectedUnit = this.#resolveAliasesLiquidVolume(
				this.units.liquidVolume
			);

			output = value * liquidUnit.toSI;
			if (this.units.liquidVolume !== this.siUnits.liquidVolume) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.temperatureAliases.includes(unit)) {
			// case temperature units
			const temperatureUnit = this.#resolveAliasesTemperature(unit);
			const selectedUnit = this.#resolveAliasesTemperature(
				this.units.temperature
			);

			output = value * temperatureUnit.toSI;
			if (this.units.temperature !== this.siUnits.temperature) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.electricCurrentAliases.includes(unit)) {
			// case electric current units
			const currentUnit = this.#resolveAliasesElectricCurrent(unit);
			const selectedUnit = this.#resolveAliasesElectricCurrent(
				this.units.electricCurrent
			);

			output = value * currentUnit.toSI;
			if (this.units.electricCurrent !== this.siUnits.electricCurrent) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.pressureAliases.includes(unit)) {
			// case pressure units
			const pressureUnit = this.#resolveAliasesPressure(unit);
			const selectedUnit = this.#resolveAliasesPressure(this.units.pressure);

			output = value * pressureUnit.toSI;
			if (this.units.pressure !== this.siUnits.pressure) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.energyAliases.includes(unit)) {
			// case energy units
			const energyUnit = this.#resolveAliasesEnergy(unit);
			const selectedUnit = this.#resolveAliasesEnergy(this.units.energy);

			output = value * energyUnit.toSI;
			if (this.units.energy !== this.siUnits.energy) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.frequencyAliases.includes(unit)) {
			// case frequency units
			const frequencyUnit = this.#resolveAliasesFrequency(unit);
			const selectedUnit = this.#resolveAliasesFrequency(this.units.frequency);

			output = value * frequencyUnit.toSI;
			if (this.units.frequency !== this.siUnits.frequency) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.volumeAliases.includes(unit)) {
			// case volume units
			const volumeUnit = this.#resolveAliasesVolume(unit);
			const selectedUnit = this.#resolveAliasesVolume(this.units.volume);

			output = value * volumeUnit.toSI;
			if (this.units.volume !== this.siUnits.volume) {
				output = value / selectedUnit.toSI;
			}
			return output + ' ' + selectedUnit.symbol;
		}
		if (this.areaAliases.includes(unit)) {
			// case area units
			const areaUnit = this.#resolveAliasesArea(unit);
			const selectedUnit = this.#resolveAliasesArea(this.units.area);

			output = value * areaUnit.toSI;
			if (this.units.area !== this.siUnits.area) {
				output = value / selectedUnit.toSI;
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
