import { MultiUnitConverter } from '../src';

describe('text parsing', () => {
	const muc = new MultiUnitConverter();

	test('multiple units', () => {
		const parsed = muc.parse('I ran 2km in 20min');
		expect(parsed).toHaveLength(2);
		expect(parsed[0]).toMatchObject({
			value: 2,
			unit: 'km',
			unitName: 'kilometer',
			category: 'length',
			siValue: 2000,
			siUnit: 'm',
		});
		expect(parsed[1]).toMatchObject({
			value: 20,
			unit: 'min',
			unitName: 'minute',
			category: 'time',
			siValue: 1200,
			siUnit: 's',
		});
		expect(parsed[0].start).toBeGreaterThanOrEqual(0);
		expect(parsed[0].end).toBeGreaterThan(parsed[0].start);
	});

	test('decimal numbers', () => {
		const parsed = muc.parse('2.5 km');
		expect(parsed[0].value).toBe(2.5);
		expect(parsed[0].siValue).toBe(2500);
	});

	test('negative temperatures', () => {
		const parsed = muc.parse('stored at -20 °C');
		expect(parsed[0].value).toBe(-20);
		expect(parsed[0].category).toBe('temperature');
		expect(parsed[0].siValue).toBeCloseTo(253.15, 2);
	});

	test('unit aliases', () => {
		expect(muc.parse('5 centimetres')[0].unitName).toBe('centimeter');
		expect(muc.parse('5 lbs')[0].unitName).toBe('pound');
		expect(muc.parse('5 kWh')[0].unitName).toBe('kilowatthour');
	});

	test('plural units', () => {
		expect(muc.parse('3 meters')[0].unitName).toBe('meter');
		expect(muc.parse('2 cups')[0].unitName).toBe('cup');
	});

	test('compound units', () => {
		const parsed = muc.parse('60 km/h');
		expect(parsed[0].compound).toBe(true);
		expect(parsed[0].category).toBe('speed');
		expect(parsed[0].siValue).toBeCloseTo(16.6667, 3);
		expect(parsed[0].siUnit).toBe('m/s');
	});

	test('compound units in words', () => {
		const parsed = muc.parse('50 miles per hour');
		expect(parsed[0].category).toBe('speed');
		expect(parsed[0].siValue).toBeCloseTo(22.352, 3);
	});

	test('compound exponents', () => {
		expect(muc.parse('32 ft/s²')[0].category).toBe('acceleration');
		expect(muc.parse('32 ft/s2')[0].category).toBe('acceleration');
		expect(muc.parse('100 kg/m³')[0].category).toBe('density');
	});

	test('ambiguous units', () => {
		const attached = muc.parse('5m');
		expect(attached[0].unitName).toBe('meter');
		expect(attached[0].ambiguous).toBe(true);
		expect(attached[0].alternatives.some((alt) => alt.unit === 'minute')).toBe(true);

		const spaced = muc.parse('5 m');
		expect(spaced[0].unitName).toBe('meter');
		expect(spaced[0].ambiguous).toBe(false);
	});

	test('short aliases y, c, and t are ambiguous', () => {
		const yard = muc.parse('5 y');
		expect(yard[0].unitName).toBe('yard');
		expect(yard[0].ambiguous).toBe(true);

		const celsius = muc.parse('5 c');
		expect(celsius[0].unitName).toBe('celsius');
		expect(celsius[0].ambiguous).toBe(true);
		expect(celsius[0].alternatives.some((alt) => alt.unit === 'cup')).toBe(true);

		const tonne = muc.parse('5 t');
		expect(tonne[0].unitName).toBe('tonne');
		expect(tonne[0].ambiguous).toBe(true);
	});

	test('degree mark makes temperature unambiguous', () => {
		const parsed = muc.parse('30°C');
		expect(parsed[0].unitName).toBe('celsius');
		expect(parsed[0].ambiguous).toBe(false);
		expect(parsed[0].siValue).toBeCloseTo(303.15, 2);
	});

	test('strict mode refuses ambiguous matches', () => {
		expect(muc.parse('5m', { strict: true })).toHaveLength(0);
		expect(muc.parse('5 min', { strict: true })[0].unitName).toBe('minute');
		expect(muc.parse('30°C', { strict: true })[0].unitName).toBe('celsius');
	});

	test('units adjacent to punctuation', () => {
		expect(muc.parse('about 5km.')[0].siValue).toBe(5000);
		expect(muc.parse('(10 kg)')[0].unitName).toBe('kilogram');
		expect(muc.parse('5 km.')[0].unitName).toBe('kilometer');
	});

	test('units embedded in normal prose', () => {
		const parsed = muc.parse('The package weighs 5 lbs, is 20 inches long, and should be stored at 68°F.');
		expect(parsed).toHaveLength(3);
		expect(parsed[0].category).toBe('mass');
		expect(parsed[1].category).toBe('length');
		expect(parsed[2].category).toBe('temperature');
	});

	test('does not convert unknown units', () => {
		expect(muc.parse('The voltage is 120VAC')).toHaveLength(0);
	});

	test('skips preposition "in"', () => {
		expect(muc.parse('I put 5 in the box')).toHaveLength(0);
		expect(muc.parse('The board is 5 in wide')[0].unitName).toBe('inch');
		expect(muc.parse('5 in.')[0].unitName).toBe('inch');
	});

	test('feet and inches', () => {
		const quoted = muc.parse('He is 6\'2" tall');
		expect(quoted).toHaveLength(1);
		expect(quoted[0].category).toBe('length');
		expect(quoted[0].value).toBe(74);
		expect(quoted[0].siValue).toBeCloseTo(1.8796, 3);

		const words = muc.parse('He is 6 ft 2 in tall');
		expect(words).toHaveLength(1);
		expect(words[0].value).toBe(74);
	});

	test('throws if text is not a string', () => {
		expect(() => muc.parse(1 as unknown as string)).toThrow(TypeError);
		expect(() => muc.parse(1 as unknown as string)).toThrow('Text must be a string');
	});
});

describe('number parsing', () => {
	const muc = new MultiUnitConverter();

	test('thousands separators', () => {
		expect(muc.parse('2,500 km')[0].value).toBe(2500);
	});

	test('leading decimal', () => {
		expect(muc.parse('.5 kg')[0].value).toBe(0.5);
	});

	test('scientific notation', () => {
		expect(muc.parse('5e3 m')[0].value).toBe(5000);
		expect(muc.parse('1.2×10³ m')[0].value).toBe(1200);
		expect(muc.parse('5e-3 km')[0].value).toBe(0.005);
	});

	test('signed values', () => {
		expect(muc.parse('+5 °C')[0].value).toBe(5);
		expect(muc.parse('-20 °C')[0].value).toBe(-20);
	});

	test('fractions', () => {
		expect(muc.parse('1/2 mile')[0].value).toBe(0.5);
		expect(muc.parse('½ mile')[0].value).toBe(0.5);
		expect(muc.parse('2 1/2 miles')[0].value).toBe(2.5);
		expect(muc.parse('2½ miles')[0].value).toBe(2.5);
	});

	test('large slash numbers are not treated as fractions', () => {
		const parsed = muc.parse('1/1001 mile');
		expect(parsed.every((item) => item.value !== 1 / 1001)).toBe(true);
	});
});
