import { InvalidUnitError, MultiUnitConverter } from '../src';

describe('convert()', () => {
	const muc = new MultiUnitConverter();

	test('converts between compatible units', () => {
		expect(muc.convert(2, 'km', 'm')).toBe(2000);
		expect(muc.convert(1, 'ft', 'm')).toBeCloseTo(0.3048, 6);
		expect(muc.convert(32, '°F', '°C')).toBeCloseTo(0, 6);
	});

	test('converts to the configured unit when target is omitted', () => {
		expect(muc.convert(2, 'km')).toBe(2000);
		muc.configure({ length: 'km' });
		expect(muc.convert(2000, 'm')).toBe(2);
	});

	test('converts volume and liquid volume to each other', () => {
		expect(muc.convert(1, 'L', 'm3')).toBeCloseTo(0.001, 9);
		expect(muc.convert(1, 'gallon', 'liter')).toBeCloseTo(3.785, 3);
	});

	test('throws for unknown units', () => {
		expect(() => muc.convert(1, 'banana', 'm')).toThrow(InvalidUnitError);
		expect(() => muc.convert(1, 'banana', 'm')).toThrow('not a valid unit');
		expect(() => muc.convert(1, 'm', 'banana')).toThrow(InvalidUnitError);
	});

	test('throws for incompatible units', () => {
		expect(() => muc.convert(1, 'km', 'kg')).toThrow(InvalidUnitError);
	});
});

describe('convertParsed()', () => {
	const muc = new MultiUnitConverter();

	test('converts structured parse results', () => {
		const parsed = muc.parse('I ran 2km');
		const converted = muc.convertParsed(parsed);
		expect(converted[0].convertedValue).toBe(2000);
		expect(converted[0].convertedUnit).toBe('m');
	});

	test('converts a single parse result', () => {
		const parsed = muc.parse('I ran 2km')[0];
		const converted = muc.convertParsed(parsed);
		expect(converted.convertedValue).toBe(2000);
		expect(converted.convertedUnit).toBe('m');
	});

	test('converts to an explicit target unit', () => {
		const parsed = muc.parse('I ran 2km');
		const converted = muc.convertParsed(parsed, 'cm');
		expect(converted[0].convertedValue).toBe(200000);
		expect(converted[0].convertedUnit).toBe('cm');
		expect(converted[0].convertedUnitName).toBe('centimeter');
	});
});

describe('convertText()', () => {
	test('converts multiple values and units in a string', () => {
		const muc = new MultiUnitConverter();
		const input = 'I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft.';
		const output = muc.convertText(input);
		expect(output).toContain('1.83 m');
		expect(output).toContain('79.4 kg.');
		expect(output).toContain('8050 m');
		expect(output).toContain('305 m.');
	});

	test('replaces several matches without dropping surrounding text', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('2km and 3min')).toBe('2000 m and 180 s');
	});

	test('converts uppercase units', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('2 CUPS AND 3 TEASPOONS')).toBe('0.000473 m³ AND 0.0000148 m³');
	});

	test('handles unknown units', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('The voltage is 120VAC')).toBe('The voltage is 120VAC');
	});

	test('converts units with different prefixes', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('I traveled 10 km and 500 m, and the temperature is 30 °C.')).toBe(
			'I traveled 10000 m and 500 m, and the temperature is 303 K.',
		);
	});

	test('converts uncommon symbols', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('The pressure is 100 psi, and the energy is 50 kJ.')).toBe(
			'The pressure is 689000 Pa, and the energy is 50000 J.',
		);
	});

	test('converts units with non-breaking space', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('The length is 10\u00A0meters, and the weight is 20\u00A0kilograms.')).toBe(
			'The length is 10 m, and the weight is 20 kg.',
		);
	});

	test('decimal numbers already in SI stay readable', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('I have 3.5 meters of fabric.')).toBe('I have 3.5 m of fabric.');
	});

	test('precision', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('I have 3.14159 meters of fabric.')).toBe('I have 3.14 m of fabric.');
		expect(muc.convertText('I have 0.00098765 cubic meters of water.')).toBe('I have 0.000988 m³ of water.');
		expect(muc.convertText('I have 3.14159 meters of fabric.', { precision: 5 })).toBe(
			'I have 3.1416 m of fabric.',
		);
	});

	test('negative temperatures convert as absolute values', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('The temperature dropped by 15.6789°C.')).toBe('The temperature dropped by 289 K.');
	});

	test('compound speed units convert to m/s by default', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('I was driving at 60 km/h')).toBe('I was driving at 16.7 m/s');
		expect(muc.convertText('I was driving at 60 km/h', { precision: 4 })).toBe('I was driving at 16.67 m/s');
	});

	test('density and acceleration compounds', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('100 kg/m³')).toBe('100 kg/m³');
		expect(muc.convertText('32 ft/s²', { precision: 4 })).toBe('9.754 m/s²');
	});

	test('preserveSpacing keeps attached units attached', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('I ran 2km', { preserveSpacing: true })).toBe('I ran 2000m');
		expect(muc.convertText('I ran 2 km', { preserveSpacing: true })).toBe('I ran 2000 m');
	});

	test('preserveNumberStyle keeps thousands separators', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('2,500 km', { preserveNumberStyle: true })).toBe('2,500,000 m');
	});

	test('long format uses unit names', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('I ran 2km', { format: 'long' })).toBe('I ran 2000 meters');
	});

	test('strict mode leaves ambiguous matches unchanged', () => {
		const muc = new MultiUnitConverter();
		expect(muc.convertText('5m', { strict: true })).toBe('5m');
		expect(muc.convertText('5 m', { strict: true })).toBe('5 m');
	});

	test('converts a whole sentence to metric via a preset', () => {
		const muc = new MultiUnitConverter();
		muc.usePreset('metric');
		const output = muc.convertText('The package weighs 5 lbs, is 20 inches long, and should be stored at 68°F.');
		expect(output).toContain('kg');
		expect(output).toContain('m');
		expect(output).toContain('°C');
	});

	test('throws if text is not a string', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.convertText(1 as unknown as string)).toThrow(TypeError);
	});
});
