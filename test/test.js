'use strict';
const MultiUnitConverter = require('../src/MultiUnitConverter.js');

describe('multi-unit-converter', () => {
	// Test case for a string with a single value and unit 1
	test('converts multiple values and units in a string - 1', () => {
		const muc = new MultiUnitConverter();
		const input =
			'I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft. Today, the temperature is 72°F. I am 5\'11" and my weight is 160lbs. We drank 2 gallons of water and 1.5 liters of soda. I also took 2 teaspoons of sugar in my coffee this morning. The length of the room is 12 feet and the width is 10 feet. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
		const expectedOutput =
			'I have a 1.83 m tall friend who weighs 79.3787 kg. Yesterday, we hiked for 8046.72 m and climbed 304.8 m. Today, the temperature is 295.15 K. I am 1.8 m and my weight is 72.5748 kg. We drank 0.00757 m³ of water and 0.0015 m³ of soda. I also took 0.00035521 m³ of sugar in my coffee this morning. The length of the room is 3.6576 m and the width is 3.048 m. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kg.';

		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for a string with multiple values and units 2
	test('converts multiple values and units in a string - 2', () => {
		const muc = new MultiUnitConverter();
		const input =
			'I have a 7ft long sofa that weighs 200lbs. Yesterday, I ran for 10 kilometers and climbed 500 meters. Today, the temperature is 20°C. I am 6 feet tall and my weight is 170lbs. I drank 1 gallon of water and 500 millilitres of juice. I also took 3 tablespoons of sugar in my tea this morning. The length of the kitchen is 15 feet and the width is 8 feet. The height of the ceiling is 3 meters. The weight of the water bottle is 1 kilogram. I have a 60-inch TV that weighs 50 pounds. The length of the garden hose is 50 feet and the width is 0.5 inches. The speed of the car is 60 miles per hour (mph), and it is traveling for 3 hours. The distance it covers is 180 miles';
		const expectedOutput =
			'I have a 2.1336 m long sofa that weighs 90.7185 kg. Yesterday, I ran for 10000 m and climbed 500 m. Today, the temperature is 293.15 K. I am 1.8288 m tall and my weight is 77.1107 kg. I drank 0.00378541 m³ of water and 0.0005 m³ of juice. I also took 0.0000443603 m³ of sugar in my tea this morning. The length of the kitchen is 4.572 m and the width is 2.4384 m. The height of the ceiling is 3 meters. The weight of the water bottle is 1 kg. I have a 60-inch TV that weighs 22.6796 kg. The length of the garden hose is 15.24 m and the width is 0.0127 m. The speed of the car is 26.8224 m per second (mps), and it is traveling for 10800 s. The distance it covers is 289620 m';

		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for a string with multiple values and units 3
	test('converts multiple values and units in an UPPERSCORE string - 3', () => {
		const muc = new MultiUnitConverter();
		const input = '2 CUPS AND 3 TEASPOONS';
		const expectedOutput = '0.000473 m³ AND 0.0000148 m³';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for a string with a single value and unit
	test('converts single value and unit in string', () => {
		const muc = new MultiUnitConverter();
		muc.setUnitTemperature('C');
		const input = 'The temperature is 68 °F';
		const expectedOutput = 'The temperature is 20 °C';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for a string with unknown units
	test('handles unknown units', () => {
		const muc = new MultiUnitConverter();
		const input = 'The voltage is 120VAC';
		const expectedOutput = 'The voltage is 120VAC';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for switching the default unit
	test('function switches the default unit', () => {
		const muc = new MultiUnitConverter();
		muc.setUnitTime('min');
		expect(muc.units.time).toBe('minute');
	});

	// Test case for handling aliases of units
	test('function can handle aliases of units', () => {
		const muc = new MultiUnitConverter();
		muc.setUnitLength('miles');
		expect(muc.units.length).toBe('mile');
	});

	// Test case for throwing an InvalidUnitError
	test('function throws an InvalidUnitError', () => {
		const muc = new MultiUnitConverter();
		expect(() => {
			muc.setUnitLength('day');
		}).toThrow('Input day is not a length unit!');
	});

	// Test case for converting units with different prefixes
	test('converts units with different prefixes', () => {
		const muc = new MultiUnitConverter();
		const input = 'I traveled 10 km and 500 m, and the temperature is 30 °C.';
		const expectedOutput =
			'I traveled 10000 m and 500 m, and the temperature is 303.15 K.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with scientific notation
	test('converts units with scientific notation', () => {
		const muc = new MultiUnitConverter();
		const input =
			'The speed of light is approximately 3 x 10^8 meters per second (m/s).';
		const expectedOutput =
			'The speed of light is approximately 300000000 m per second (mps).';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with uncommon symbols
	test('converts units with uncommon symbols', () => {
		const muc = new MultiUnitConverter();
		const input = 'The pressure is 100 psi, and the energy is 50 kJ.';
		const expectedOutput =
			'The pressure is 689476 Pa, and the energy is 50000 J.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with multiple occurrences in a single sentence
	test('converts units with multiple occurrences in a single sentence', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have a 5-meter-long rope and a 2-meter-long pole.';
		const expectedOutput = 'I have a 5 m long rope and a 2 m long pole.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with both uppercase and lowercase letters
	test('converts units with both uppercase and lowercase letters', () => {
		const muc = new MultiUnitConverter();
		const input = 'My weight is 150Lb, and I have a 2-gallon water bottle.';
		const expectedOutput =
			'My weight is 68.1818 kg, and I have a 0.00757 m³ water bottle.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with non-breaking space
	test('converts units with non-breaking space', () => {
		const muc = new MultiUnitConverter();
		const input =
			'The length is 10\u00A0meters, and the weight is 20\u00A0kilograms.';
		const expectedOutput = 'The length is 10 m and the weight is 20 kg.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling decimal numbers with units
	test('handles decimal numbers with units', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 3.5 meters of fabric.';
		const expectedOutput = 'I have 3.5 m of fabric.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling negative numbers with units
	test('handles negative numbers with units', () => {
		const muc = new MultiUnitConverter();
		const input = 'The temperature dropped by 10°C.';
		const expectedOutput = 'The temperature dropped by 10 °K.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling fractions with units
	test('handles fractions with units', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 1/2 cup of sugar.';
		const expectedOutput = 'I have 0.000118 m³ of sugar.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling units with no conversion
	test('handles units with no conversion', () => {
		const muc = new MultiUnitConverter();
		const input = 'The voltage is 120VAC.';
		const expectedOutput = 'The voltage is 120VAC.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling units with underscores
	test('handles units with underscores', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 2 feet and 3 teaspoons.';
		const expectedOutput = 'I have 0.6096 m and 0.0000148 m³.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with alternative names
	test('converts units with alternative names', () => {
		const muc = new MultiUnitConverter();
		const input = 'The room is 3 fathoms long and 2 chains wide.';
		const expectedOutput = 'The room is 5.4864 m long and 40.2336 m wide.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with spaces between numbers and symbols
	test('converts units with spaces between numbers and symbols', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 5 m of rope and 2 kg of sugar.';
		const expectedOutput = 'I have 5 m of rope and 2 kg of sugar.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});
});
