import builtInDefinitions from './definitions';
import { InvalidUnitError } from './errors';
import type {
	CustomUnitDefinition,
	MatchAtResult,
	ResolveResult,
	SiDisplay,
	UnitAlternative,
	UnitCategory,
	UnitDefinition,
} from './types';

/** Categories that may convert to each other. */
export const VOLUME_CATEGORIES = new Set<string>(['volume', 'liquidVolume']);

/** js-quantities `kind()` strings mapped to this library's categories. */
export const KIND_TO_CATEGORY: Record<string, UnitCategory | string> = {
	length: 'length',
	area: 'area',
	volume: 'volume',
	time: 'time',
	temperature: 'temperature',
	mass: 'mass',
	current: 'current',
	pressure: 'pressure',
	energy: 'energy',
	frequency: 'frequency',
	speed: 'speed',
	acceleration: 'acceleration',
	density: 'density',
};

/** Preferred SI unit for each category. */
export const SI_DISPLAY: Record<string, SiDisplay> = {
	length: { qty: 'm', symbol: 'm', long: 'meters', name: 'meter' },
	area: { qty: 'm2', symbol: 'm²', long: 'square meters', name: 'metersquared' },
	volume: { qty: 'm3', symbol: 'm³', long: 'cubic meters', name: 'metercubed' },
	liquidVolume: { qty: 'm3', symbol: 'm³', long: 'cubic meters', name: 'metercubed' },
	time: { qty: 's', symbol: 's', long: 'seconds', name: 'second' },
	temperature: { qty: 'tempK', symbol: 'K', long: 'kelvin', name: 'kelvin' },
	mass: { qty: 'kg', symbol: 'kg', long: 'kilograms', name: 'kilogram' },
	current: { qty: 'A', symbol: 'A', long: 'amperes', name: 'ampere' },
	pressure: { qty: 'Pa', symbol: 'Pa', long: 'pascals', name: 'pascal' },
	energy: { qty: 'J', symbol: 'J', long: 'joules', name: 'joule' },
	frequency: { qty: 'Hz', symbol: 'Hz', long: 'hertz', name: 'hertz' },
	speed: { qty: 'm/s', symbol: 'm/s', long: 'meters per second', name: 'mps' },
	acceleration: { qty: 'm/s2', symbol: 'm/s²', long: 'meters per second squared', name: 'mps2' },
	density: { qty: 'kg/m3', symbol: 'kg/m³', long: 'kilograms per cubic meter', name: 'kgm3' },
};

/** Short aliases that can mean more than one unit, with a preferred match first. */
const AMBIGUOUS_ALIASES: Record<string, Array<{ name: string; confidence: number }>> = {
	m: [
		{ name: 'meter', confidence: 0.7 },
		{ name: 'minute', confidence: 0.3 },
	],
	y: [
		{ name: 'yard', confidence: 0.55 },
		{ name: 'year', confidence: 0.45 },
	],
	c: [
		{ name: 'celsius', confidence: 0.6 },
		{ name: 'cup', confidence: 0.4 },
	],
	t: [
		{ name: 'tonne', confidence: 0.7 },
		{ name: 'ton', confidence: 0.3 },
	],
	kilo: [{ name: 'kilogram', confidence: 0.85 }],
	kilos: [{ name: 'kilogram', confidence: 0.9 }],
	in: [{ name: 'inch', confidence: 0.5 }],
	"'": [{ name: 'foot', confidence: 0.6 }],
	'′': [{ name: 'foot', confidence: 0.6 }],
	'"': [{ name: 'inch', confidence: 0.6 }],
	'″': [{ name: 'inch', confidence: 0.6 }],
};

/** Words after `in` that mean the English preposition, not inches. */
const PREPOSITION_AFTER_IN =
	/^(the|a|an|my|your|his|her|its|our|their|this|that|these|those|some|any|all|each|every|no|me|us|him|it|them|here|there|and|or|but|to|for|on|at|from|with|by|into|onto|upon)\b/i;

/** Shallow-copy a definition so registry mutations stay local. */
function cloneDef(def: UnitDefinition): UnitDefinition {
	return {
		...def,
		aliases: [...(def.aliases || [])],
	};
}

/** True if `index` is not in the middle of a word or number. */
export function isUnitBoundary(text: string, index: number): boolean {
	if (index >= text.length) {
		return true;
	}
	return !/[A-Za-z0-9]/.test(text[index]);
}

/** Alias index used by the parser. */
interface AliasEntry {
	alias: string;
	key: string;
	unit: UnitDefinition;
	length: number;
}

/** Lookup table for unit names, aliases, and custom units. */
export class UnitRegistry {
	/** All known units, including custom ones. */
	units: UnitDefinition[];
	private byName = new Map<string, UnitDefinition>();
	private aliasList: AliasEntry[] = [];
	private aliasMap = new Map<string, UnitDefinition[]>();

	constructor() {
		this.units = builtInDefinitions.map(cloneDef);
		this.rebuild();
	}

	/** Rebuild name and alias indexes after units change. */
	private rebuild(): void {
		this.byName = new Map();
		this.aliasList = [];
		this.aliasMap = new Map();

		for (const unit of this.units) {
			this.byName.set(unit.name.toLowerCase(), unit);
			const aliases = new Set([unit.name, unit.symbol, ...(unit.aliases || [])].filter(Boolean));
			unit.aliases = [...aliases];
			for (const alias of aliases) {
				const key = alias.toLowerCase();
				if (!this.aliasMap.has(key)) {
					this.aliasMap.set(key, []);
				}
				const bucket = this.aliasMap.get(key)!;
				if (!bucket.includes(unit)) {
					bucket.push(unit);
				}
				this.aliasList.push({ alias, key, unit, length: alias.length });
			}
		}

		this.aliasList.sort((a, b) => b.length - a.length);
	}

	/** Canonical unit by name, case-insensitive. */
	get(name?: string | null): UnitDefinition | undefined {
		if (!name) {
			return undefined;
		}
		return this.byName.get(String(name).toLowerCase());
	}

	/** Look up a name or alias. Returns `null` if unknown. */
	resolve(input?: string | null): ResolveResult | null {
		if (input == null) {
			return null;
		}
		const raw = String(input).trim();
		if (!raw) {
			return null;
		}
		const byName = this.get(raw);
		if (byName) {
			return { unit: byName, alias: raw, confidence: 1, ambiguous: false, alternatives: [] };
		}
		const key = raw.toLowerCase();
		const matches = this.aliasMap.get(key);
		if (!matches || matches.length === 0) {
			return null;
		}
		const ambiguousInfo = AMBIGUOUS_ALIASES[key];
		if (ambiguousInfo) {
			const primary = matches.find((unit) => unit.name === ambiguousInfo[0].name) || matches[0];
			const alternatives: UnitAlternative[] = matches
				.filter((unit) => unit !== primary)
				.map((unit) => {
					const info = ambiguousInfo.find((item) => item.name === unit.name);
					return {
						unit: unit.name,
						category: unit.category,
						confidence: info ? info.confidence : 0.4,
					};
				});
			const primaryInfo = ambiguousInfo.find((item) => item.name === primary.name);
			return {
				unit: primary,
				alias: raw,
				confidence: primaryInfo ? primaryInfo.confidence : 0.6,
				ambiguous: matches.length > 1 || Boolean(ambiguousInfo),
				alternatives,
			};
		}
		return {
			unit: matches[0],
			alias: raw,
			confidence: matches.length > 1 ? 0.6 : 1,
			ambiguous: matches.length > 1,
			alternatives: matches.slice(1).map((unit) => ({
				unit: unit.name,
				category: unit.category,
				confidence: 0.4,
			})),
		};
	}

	/** Units in this category. */
	unitsByCategory(category: string): UnitDefinition[] {
		return this.units.filter((unit) => unit.category === category);
	}

	/** Aliases for units in this category. */
	aliasesByCategory(category: string): string[] {
		return this.unitsByCategory(category).flatMap((unit) => unit.aliases);
	}

	/**
	 * Longest alias starting at `index`. Skips `in` when the next word is a preposition.
	 * With `{ allowAmbiguous: false }`, skip ambiguous aliases.
	 */
	matchAt(text: string, index: number, { allowAmbiguous = true } = {}): MatchAtResult | null {
		if (index >= text.length) {
			return null;
		}

		for (const entry of this.aliasList) {
			const slice = text.slice(index, index + entry.length);
			if (slice.length !== entry.length) {
				continue;
			}
			if (slice.toLowerCase() !== entry.key) {
				continue;
			}
			if (!isUnitBoundary(text, index + entry.length)) {
				continue;
			}

			const key = entry.key;
			const ambiguousInfo = AMBIGUOUS_ALIASES[key];
			const matches = this.aliasMap.get(key) || [entry.unit];
			const primary = ambiguousInfo
				? matches.find((unit) => unit.name === ambiguousInfo[0].name) || entry.unit
				: entry.unit;

			let confidence = 1;
			let ambiguous = matches.length > 1 || Boolean(ambiguousInfo);
			if (ambiguousInfo) {
				const info = ambiguousInfo.find((item) => item.name === primary.name);
				confidence = info ? info.confidence : 0.6;
			}

			if (key === 'in') {
				const after = text.slice(index + entry.length).replace(/^[\s\u00A0]+/, '');
				if (PREPOSITION_AFTER_IN.test(after)) {
					continue;
				}
			}

			if (!allowAmbiguous && ambiguous) {
				continue;
			}

			const alternatives: UnitAlternative[] = matches
				.filter((unit) => unit !== primary)
				.map((unit) => {
					const info = ambiguousInfo && ambiguousInfo.find((item) => item.name === unit.name);
					return {
						unit: unit.name,
						category: unit.category,
						confidence: info ? info.confidence : 0.4,
					};
				});

			if (key === 'm' && matches.every((unit) => unit.name !== 'minute')) {
				alternatives.push({ unit: 'minute', category: 'time', confidence: 0.3 });
				ambiguous = true;
				if (confidence > 0.7) {
					confidence = 0.7;
				}
			}

			return {
				unit: primary,
				alias: slice,
				end: index + entry.length,
				confidence,
				ambiguous,
				alternatives,
			};
		}

		return null;
	}

	/** Add a unit. Custom units need `toSI` and `siUnit`; others need a js-quantities `qty`. */
	defineUnit({
		name,
		category,
		aliases = [],
		toSI,
		siUnit,
		symbol,
		long,
		qty,
	}: CustomUnitDefinition): UnitDefinition {
		if (!name || !category) {
			throw new InvalidUnitError('defineUnit requires name and category');
		}
		const existing = this.get(name);
		if (existing) {
			throw new InvalidUnitError(`Unit "${name}" is already defined`);
		}
		const isCustom = !qty;
		if (isCustom && (typeof toSI !== 'number' || !siUnit)) {
			throw new InvalidUnitError('Custom units require numeric toSI and an siUnit');
		}
		const def: UnitDefinition = {
			name,
			category,
			qty: qty || null,
			symbol: symbol || name,
			long: long || name,
			aliases: [name, symbol, ...aliases].filter((item): item is string => Boolean(item)),
			custom: isCustom,
			toSI,
			siUnit: siUnit || SI_DISPLAY[category]?.qty,
		};
		this.units.push(def);
		this.rebuild();
		return def;
	}

	/** True if the two categories are the same, or both volume kinds. */
	isCompatibleCategory(unitCategory: string, targetCategory: string): boolean {
		if (unitCategory === targetCategory) {
			return true;
		}
		return VOLUME_CATEGORIES.has(unitCategory) && VOLUME_CATEGORIES.has(targetCategory);
	}
}
