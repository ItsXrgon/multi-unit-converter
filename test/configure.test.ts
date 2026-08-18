import { InvalidPresetError, InvalidUnitError, MultiUnitConverter } from '../src';

describe('configuration', () => {
	test('configure sets target units', () => {
		const muc = new MultiUnitConverter();
		muc.configure({ time: 'min' });
		expect(muc.units.time.name).toBe('minute');
	});

	test('configure accepts unit aliases', () => {
		const muc = new MultiUnitConverter();
		muc.configure({ length: 'miles' });
		expect(muc.units.length.name).toBe('mile');
	});

	test('configure throws for a unit in the wrong category', () => {
		const muc = new MultiUnitConverter();
		expect(() => {
			muc.configure({ length: 'day' });
		}).toThrow('"day" is not a length unit');
	});

	test('configure throws for an unknown category', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.configure({ flavour: 'm' } as never)).toThrow(InvalidUnitError);
		expect(() => muc.configure({ flavour: 'm' } as never)).toThrow('Unknown category "flavour"');
	});

	test('configure throws if a unit is not a string', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.configure({ length: 1 as unknown as string })).toThrow(TypeError);
		expect(() => muc.configure({ length: 1 as unknown as string })).toThrow('Unit must be a string');
	});

	test('configure sets several units at once', () => {
		const muc = new MultiUnitConverter();
		muc.configure({ length: 'km', mass: 'lb', temperature: 'celsius' });
		expect(muc.units.length.name).toBe('kilometer');
		expect(muc.units.mass.name).toBe('pound');
		expect(muc.units.temperature.name).toBe('celsius');
		expect(muc.convertText('The car traveled 50 miles')).toBe('The car traveled 80.5 km');
	});

	test('volume and liquid volume accept each other', () => {
		const muc = new MultiUnitConverter();
		muc.configure({ volume: 'liter', liquidVolume: 'm3' });
		expect(muc.units.volume.name).toBe('liter');
		expect(muc.units.liquidVolume.name).toBe('metercubed');
	});

	test('constructor options are the same as configure', () => {
		const muc = new MultiUnitConverter({ length: 'km', precision: 4 });
		expect(muc.units.length.name).toBe('kilometer');
		expect(muc.precision).toBe(4);
		expect(muc.convertText('The car traveled 50 miles.')).toBe('The car traveled 80.47 km.');
	});

	test('configure returns the instance', () => {
		const muc = new MultiUnitConverter();
		expect(muc.configure({ length: 'km' })).toBe(muc);
	});

	test('precision must be a non-negative number', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.configure({ precision: -1 })).toThrow(RangeError);
		expect(() => muc.configure({ precision: Number.NaN })).toThrow(TypeError);
		expect(() => muc.configure({ precision: '3' as unknown as number })).toThrow(TypeError);
	});

	test('usePreset("imperial") converts to imperial units', () => {
		const muc = new MultiUnitConverter();
		muc.usePreset('imperial');
		expect(muc.convertText('The rope is 2 m long')).toMatch(/6\.56 ft/);
	});

	test('usePreset("recipe") sets cooking units', () => {
		const muc = new MultiUnitConverter();
		muc.usePreset('recipe');
		expect(muc.units.mass.name).toBe('gram');
		expect(muc.units.liquidVolume.name).toBe('cup');
	});

	test('usePreset names are case-insensitive', () => {
		const muc = new MultiUnitConverter({ length: 'km' });
		muc.usePreset('si');
		expect(muc.units.length.name).toBe('meter');
		muc.usePreset('US');
		expect(muc.units.length.name).toBe('foot');
	});

	test('rejects unknown presets', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.usePreset('martian')).toThrow(InvalidPresetError);
		expect(() => muc.usePreset('martian')).toThrow('Unknown preset "martian"');
	});

	test('usePreset throws if the name is not a string', () => {
		const muc = new MultiUnitConverter();
		expect(() => muc.usePreset(1 as unknown as string)).toThrow(TypeError);
	});
});
