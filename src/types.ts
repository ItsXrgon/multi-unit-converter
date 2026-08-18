/** Measurement categories the converter can target. */
export const UNIT_CATEGORIES = [
	'time',
	'length',
	'mass',
	'area',
	'volume',
	'liquidVolume',
	'temperature',
	'current',
	'pressure',
	'energy',
	'frequency',
	'speed',
	'acceleration',
	'density',
] as const;

/** A physical quantity category, e.g. length or speed. */
export type UnitCategory = (typeof UNIT_CATEGORIES)[number];

/** Named target-unit bundles: `SI`, `metric`, `imperial`, `us`, `recipe`. */
export type PresetName = 'SI' | 'metric' | 'imperial' | 'us' | 'recipe';

/** `short` uses symbols (`m`); `long` uses names (`meters`). */
export type FormatStyle = 'short' | 'long';

/** Target unit per category, plus output precision. Unit values may be names or aliases. */
export interface ConverterOptions {
	time?: string;
	length?: string;
	mass?: string;
	area?: string;
	volume?: string;
	liquidVolume?: string;
	temperature?: string;
	current?: string;
	pressure?: string;
	energy?: string;
	frequency?: string;
	speed?: string;
	acceleration?: string;
	density?: string;
	/** Significant figures for `convertText()`. Default 3. */
	precision?: number;
}

export interface ParseOptions {
	/** Skip matches the parser marks as ambiguous, such as `5m`. Default `false`. */
	strict?: boolean;
}

export interface ConvertTextOptions extends ParseOptions {
	/** Significant figures. Falls back to the instance precision. */
	precision?: number;
	/** Keep the original gap (or lack of one) between number and unit. */
	preserveSpacing?: boolean;
	/** Keep thousands separators and similar number styling from the input. */
	preserveNumberStyle?: boolean;
	/** Unit display form. Default `short`. */
	format?: FormatStyle;
}

/** How a parsed number was written in the source text. */
export interface NumberStyle {
	thousandsComma?: boolean;
	decimalPlaces?: number;
	scientific?: boolean;
	fraction?: boolean;
	mixedFraction?: boolean;
	unicodeFraction?: boolean;
	signed?: boolean;
	leadingDot?: boolean;
}

/** A number match inside text. */
export interface ParsedNumber {
	value: number;
	start: number;
	end: number;
	raw: string;
	style: NumberStyle;
}

/** Another unit the same alias could mean. */
export interface UnitAlternative {
	unit: string;
	category: UnitCategory | string;
	confidence: number;
}

/** A unit the parser and converter know about. */
export interface UnitDefinition {
	name: string;
	category: UnitCategory | string;
	/** js-quantities unit id. `null` for custom units converted via `toSI`. */
	qty?: string | null;
	symbol: string;
	long?: string;
	system?: string;
	aliases: string[];
	/** True for ratio units such as `km/h`. */
	compound?: boolean;
	/** True when conversion uses `toSI` instead of js-quantities. */
	custom?: boolean;
	/** Factor to the category SI unit. Required for custom units. */
	toSI?: number;
	/** Added after `value * toSI` for custom temperature-style units. */
	offset?: number;
	/** SI unit id `toSI` converts into. */
	siUnit?: string;
}

/** Input for `defineUnit()`. Custom units need `toSI` and `siUnit`; others need `qty`. */
export interface CustomUnitDefinition {
	name: string;
	category: UnitCategory | string;
	aliases?: string[];
	/** Factor to the category SI unit. Required when `qty` is omitted. */
	toSI?: number;
	siUnit?: string;
	symbol?: string;
	long?: string;
	/** js-quantities unit id. If set, conversion uses that instead of `toSI`. */
	qty?: string;
}

/** Preferred SI unit for a category. */
export interface SiDisplay {
	qty: string;
	symbol: string;
	long: string;
	name: string;
}

/** A measurement found in text. */
export interface ParsedMeasurement {
	raw: string;
	value: number;
	/** Unit text as matched, e.g. `km`. */
	unit: string;
	/** Canonical unit name, e.g. `kilometer`. */
	unitName: string;
	category: UnitCategory | string;
	/** Value in the category SI unit. */
	siValue: number;
	/** Category SI unit symbol, e.g. `m`. */
	siUnit: string;
	start: number;
	end: number;
	/** 0–1; higher means the parser is more sure of the unit. */
	confidence: number;
	/** True when more than one unit could match this alias. */
	ambiguous: boolean;
	alternatives: UnitAlternative[];
	/** True for ratio units such as `km/h`. */
	compound: boolean;
	/** Whether the source had a space between number and unit. */
	hadSpace?: boolean;
	numberStyle?: NumberStyle;
	/** @internal Resolved unit used by conversion. */
	_unit?: UnitDefinition;
}

/** A parsed measurement after conversion to a target unit. */
export interface ConvertedMeasurement extends ParsedMeasurement {
	convertedValue: number;
	convertedUnit: string;
	convertedUnitName: string;
}

/** Result of looking up a unit name or alias. */
export interface ResolveResult {
	unit: UnitDefinition;
	alias: string;
	confidence: number;
	ambiguous: boolean;
	alternatives: UnitAlternative[];
}

/** A unit alias match at a text offset. */
export interface MatchAtResult extends ResolveResult {
	/** Index after the matched alias. */
	end: number;
}
