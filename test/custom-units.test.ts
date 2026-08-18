import { InvalidUnitError, MultiUnitConverter } from '../src';

describe('custom units', () => {
	test('defineUnit adds a domain-specific unit', () => {
		const muc = new MultiUnitConverter();
		muc.defineUnit({
			name: 'banana',
			category: 'length',
			aliases: ['bananas'],
			toSI: 0.18,
			siUnit: 'm',
			symbol: 'banana',
		});
		expect(muc.convertText('The table is 10 bananas long')).toBe('The table is 1.8 m long');
		expect(muc.convert(10, 'banana', 'm')).toBeCloseTo(1.8, 6);
	});

	test('converts between two custom units', () => {
		const muc = new MultiUnitConverter();
		muc.defineUnit({
			name: 'banana',
			category: 'length',
			aliases: ['bananas'],
			toSI: 0.18,
			siUnit: 'm',
			symbol: 'banana',
		});
		muc.defineUnit({
			name: 'smoot',
			category: 'length',
			aliases: ['smoots'],
			toSI: 1.7018,
			siUnit: 'm',
			symbol: 'smoot',
		});
		expect(muc.convert(10, 'banana', 'smoot')).toBeCloseTo(1.0577, 3);
		expect(() => muc.convert(10, 'banana', 'kg')).toThrow(InvalidUnitError);
	});

	test('throws when name or category is missing', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.defineUnit({ name: '', category: 'length', toSI: 1, siUnit: 'm' })).toThrow(InvalidUnitError);
		expect(() => muc.defineUnit({ name: 'foo', category: '', toSI: 1, siUnit: 'm' })).toThrow(InvalidUnitError);
	});

	test('throws when a custom unit is missing toSI or siUnit', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.defineUnit({ name: 'foo', category: 'length' })).toThrow(
			'Custom units require numeric toSI and an siUnit',
		);
		expect(() => muc.defineUnit({ name: 'foo', category: 'length', toSI: 1 })).toThrow(
			'Custom units require numeric toSI and an siUnit',
		);
	});

	test('throws when the unit already exists', () => {
		const muc = new MultiUnitConverter();
		expect(() =>
			muc.defineUnit({
				name: 'meter',
				category: 'length',
				toSI: 1,
				siUnit: 'm',
			}),
		).toThrow('Unit "meter" is already defined');
	});
});
