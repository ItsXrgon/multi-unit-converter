import { convertValue, siInfo } from './converter';
import { InvalidPresetError, InvalidUnitError } from './errors';
import { formatNumberWithStyle, formatUnit, joinValueAndUnit } from './formatter';
import { parseText } from './parser';
import presets from './presets';
import { SI_DISPLAY, UnitRegistry } from './registry';
import {
	UNIT_CATEGORIES,
	type ConvertedMeasurement,
	type ConverterOptions,
	type ConvertTextOptions,
	type CustomUnitDefinition,
	type ParsedMeasurement,
	type ParseOptions,
	type PresetName,
	type UnitCategory,
	type UnitDefinition,
} from './types';

/** Human-readable category names for error messages. */
const CATEGORY_LABELS: Record<string, string> = {
	time: 'time',
	length: 'length',
	mass: 'mass',
	area: 'area',
	volume: 'volume',
	liquidVolume: 'liquid volume',
	temperature: 'temperature',
	current: 'current',
	pressure: 'pressure',
	energy: 'energy',
	frequency: 'frequency',
	speed: 'speed',
	acceleration: 'acceleration',
	density: 'density',
};

/**
 * Finds measurements in text and converts them to configured target units.
 * Conversion math is delegated to js-quantities.
 */
export class MultiUnitConverter {
	/** Alias and unit lookup used by parse and convert. */
	registry = new UnitRegistry();
	/** Significant figures used by `convertText()`. Default 3. */
	precision = 3;
	/** Target unit per category. */
	units: Record<string, UnitDefinition> = {};

	/** Create a converter. Options match `configure()`. Default preset is SI. */
	constructor(options: ConverterOptions = {}) {
		this.configure({ ...presets.SI, ...options });
	}

	/** Resolve `name` or throw if it is not a unit of `category`. */
	private requireUnit(name: string, category: string): UnitDefinition {
		const resolved = this.registry.resolve(name);
		if (!resolved) {
			throw new InvalidUnitError(`"${name}" is not a ${CATEGORY_LABELS[category] || category} unit`);
		}
		return resolved.unit;
	}

	/** Set the target unit for a category. */
	private setUnit(category: string, unitName: string): void {
		if (typeof unitName !== 'string') {
			throw new TypeError('Unit must be a string');
		}
		const resolved = this.registry.resolve(unitName);
		if (!resolved || !this.registry.isCompatibleCategory(resolved.unit.category, category)) {
			throw new InvalidUnitError(`"${unitName}" is not a ${CATEGORY_LABELS[category] || category} unit`);
		}
		this.units[category] = resolved.unit;
	}

	/** Configured target for this category, or the category SI unit. */
	private targetFor(measurement: { category: string }): UnitDefinition {
		const category = measurement.category;
		if (this.units[category]) {
			return this.units[category];
		}
		const si = SI_DISPLAY[category] || siInfo(category);
		return (
			this.registry.get(si.name) || {
				name: si.name,
				category,
				qty: si.qty,
				symbol: si.symbol,
				long: si.long,
				aliases: [si.symbol, si.name],
			}
		);
	}

	/** Unit attached by the parser, or a fresh lookup of `item.unit`. */
	private resolveFromMeasurement(item: ParsedMeasurement): UnitDefinition {
		if (item._unit) {
			return item._unit;
		}
		const resolved = this.registry.resolve(item.unitName || item.unit);
		if (!resolved) {
			throw new InvalidUnitError(`"${item.unit}" is not a valid unit`);
		}
		return resolved.unit;
	}

	/** Set significant figures. Must be 0 or more. */
	private setPrecision(precision: number): void {
		if (typeof precision !== 'number' || Number.isNaN(precision)) {
			throw new TypeError('Precision must be a number');
		}
		if (precision < 0) {
			throw new RangeError('Precision must be 0 or more');
		}
		this.precision = precision;
	}

	/** Set target units and/or precision. Returns this instance. */
	configure(config: ConverterOptions = {}): this {
		if (config.precision != null) {
			this.setPrecision(config.precision);
		}
		for (const [key, value] of Object.entries(config)) {
			if (key === 'precision') {
				continue;
			}
			if (!UNIT_CATEGORIES.includes(key as UnitCategory)) {
				throw new InvalidUnitError(`Unknown category "${key}"`);
			}
			if (value == null) {
				continue;
			}
			if (typeof value !== 'string') {
				throw new TypeError('Unit must be a string');
			}
			this.setUnit(key, value);
		}
		return this;
	}

	/** Apply a named target-unit bundle: `SI`, `metric`, `imperial`, `us`, or `recipe`. */
	usePreset(name: PresetName | string): this {
		if (typeof name !== 'string') {
			throw new TypeError('Preset must be a string');
		}
		const key = (Object.keys(presets) as PresetName[]).find((item) => item.toLowerCase() === name.toLowerCase());
		if (!key) {
			throw new InvalidPresetError(`Unknown preset "${name}"`);
		}
		return this.configure(presets[key]);
	}

	/** Register a custom unit. Needs `toSI` and `siUnit` unless `qty` is a js-quantities id. */
	defineUnit(definition: CustomUnitDefinition): UnitDefinition {
		return this.registry.defineUnit(definition);
	}

	/**
	 * Convert a single value. If `to` is omitted, uses the configured target for that category.
	 */
	convert(value: number, from: string, to?: string): number {
		const fromResolved = this.registry.resolve(from);
		if (!fromResolved) {
			throw new InvalidUnitError(`"${from}" is not a valid unit`);
		}
		let toUnit: UnitDefinition | undefined;
		if (to == null) {
			toUnit = this.units[fromResolved.unit.category] || this.targetFor(fromResolved.unit);
		} else {
			const toResolved = this.registry.resolve(to);
			if (!toResolved) {
				throw new InvalidUnitError(`"${to}" is not a valid unit`);
			}
			toUnit = toResolved.unit;
		}
		return convertValue(Number(value), fromResolved.unit, toUnit);
	}

	/** Find measurements in `text`. With `{ strict: true }`, skip ambiguous matches. */
	parse(text: string, options: ParseOptions = {}): ParsedMeasurement[] {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}
		return parseText(text, this.registry, options);
	}

	/** Convert `parse()` results to `targetUnit`, or to each item's configured target. */
	convertParsed(parsed: ParsedMeasurement, targetUnit?: string): ConvertedMeasurement;
	convertParsed(parsed: ParsedMeasurement[], targetUnit?: string): ConvertedMeasurement[];
	convertParsed(
		parsed: ParsedMeasurement | ParsedMeasurement[],
		targetUnit?: string,
	): ConvertedMeasurement | ConvertedMeasurement[] {
		const items = Array.isArray(parsed) ? parsed : [parsed];
		const converted = items.map((item) => {
			const fromUnit = this.resolveFromMeasurement(item);
			const target = targetUnit ? this.requireUnit(targetUnit, fromUnit.category) : this.targetFor(item);
			const value = convertValue(item.value, fromUnit, target);
			return {
				...item,
				convertedValue: value,
				convertedUnit: target.symbol,
				convertedUnitName: target.name,
			};
		});
		return Array.isArray(parsed) ? converted : converted[0];
	}

	/** Replace each measurement in `text` with its converted value and unit. */
	convertText(text: string, options: ConvertTextOptions = {}): string {
		if (typeof text !== 'string') {
			throw new TypeError('Text must be a string');
		}

		const precision = options.precision != null ? options.precision : this.precision;
		const format = options.format || 'short';
		const preserveSpacing = Boolean(options.preserveSpacing);
		const preserveNumberStyle = Boolean(options.preserveNumberStyle);
		const parsed = this.parse(text, options);

		let output = text;
		for (const item of [...parsed].sort((a, b) => b.start - a.start)) {
			const fromUnit = this.resolveFromMeasurement(item);
			const target = this.targetFor(item);
			const converted = convertValue(item.value, fromUnit, target);
			const numberText = formatNumberWithStyle(converted, precision, item.numberStyle, {
				preserveNumberStyle,
			});
			const unitText = formatUnit(target, format);
			const spacing = preserveSpacing && !item.hadSpace ? '' : ' ';
			const replacement = joinValueAndUnit(numberText, unitText, spacing);
			output = output.slice(0, item.start) + replacement + output.slice(item.end);
		}
		return output;
	}
}
