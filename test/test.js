'use strict';
const MultiUnitConverter = require('../src/index.js');

describe('multi-unit-converter', () => {
	// Test case for a string with a single value and unit 1
	test('converts multiple values and units in a string - 1', () => {
		const muc = new MultiUnitConverter();
		const input =
			'I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft.';
		const expectedOutput =
			'I have a 1.83 m tall friend who weighs 79.4 kg. Yesterday, we hiked for 8046.72 m and climbed 304.8 m.';

		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for a string with multiple values and units 2
	test('converts multiple values and units in an UPPERSCORE string - 2', () => {
		const muc = new MultiUnitConverter();
		const input = '2 CUPS AND 3 TEASPOONS';
		const expectedOutput = '0.000473 m³ AND 0.0000148 m³';
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

	// Test case for converting units with uncommon symbols
	test('converts units with uncommon symbols', () => {
		const muc = new MultiUnitConverter();
		const input = 'The pressure is 100 psi, and the energy is 50 kJ.';
		const expectedOutput =
			'The pressure is 689000 Pa, and the energy is 50000 J.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for converting units with non-breaking space
	test('converts units with non-breaking space', () => {
		const muc = new MultiUnitConverter();
		const input =
			'The length is 10\u00A0meters, and the weight is 20\u00A0kilograms.';
		const expectedOutput = 'The length is 10 m, and the weight is 20 kg.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling decimal numbers with units
	test('handles decimal numbers with units', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 3.5 meters of fabric.';
		const expectedOutput = 'I have 3.5 m of fabric.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for handling units with no conversion
	test('handles units with no conversion', () => {
		const muc = new MultiUnitConverter();
		const input = 'The voltage is 120VAC.';
		const expectedOutput = 'The voltage is 120VAC.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	test('rounds conversion to 3 significant figures', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 3.14159 meters of fabric.';
		const expectedOutput = 'I have 3.14 m of fabric.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for rounding up to 3 significant figures
	test('rounds up conversion to 3 significant figures', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 0.00098765 cubic meters of water.';
		const expectedOutput = 'I have 0.000988 m³ of water.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for rounding with negative numbers
	test('rounds conversion of negative numbers to 3 significant figures', () => {
		const muc = new MultiUnitConverter();
		const input = 'The temperature dropped by 15.6789°C.';
		const expectedOutput = 'The temperature dropped by 289 K.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for rounding large numbers
	test('rounds conversion of large numbers to 3 significant figures', () => {
		const muc = new MultiUnitConverter();
		const input = 'The distance to the nearest star is 4.5678 light years.';
		const expectedOutput =
			'The distance to the nearest star is 4.5678 light years.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for rounding mixed units
	test('rounds conversion of mixed units to 3 significant figures', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 2.5 meters of fabric and 0.75 kilograms of sugar.';
		const expectedOutput = 'I have 2.5 m of fabric and 0.75 kg of sugar.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});

	// Test case for rounding units with spaces between numbers and symbols
	test('rounds conversion of units with spaces to 3 significant figures', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have 5.678 m of rope and 2.123 kg of sugar.';
		const expectedOutput = 'I have 5.678 m of rope and 2.123 kg of sugar.';
		expect(muc.convertText(input)).toBe(expectedOutput);
	});
});
