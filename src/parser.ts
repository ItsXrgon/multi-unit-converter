import { convertToSi, inspectQty } from './converter';
import { canStartNumber, parseNumber, skipSpace } from './numbers';
import { isUnitBoundary, UnitRegistry } from './registry';
import type {
	MatchAtResult,
	ParseOptions,
	ParsedMeasurement,
	ParsedNumber,
	UnitAlternative,
	UnitDefinition,
} from './types';

/** Marks accepted as feet in `6'2"` style matches. */
const FOOT_MARKS = ["'", '′', 'ft', 'foot', 'feet'];
/** Marks accepted as inches after a feet match. */
const INCH_MARKS = ['"', '″', 'in', 'inch', 'inches'];

/** Case-insensitive exact match of `literal` at `index`. */
function matchLiteral(text: string, index: number, literal: string): { alias: string; end: number } | null {
	const slice = text.slice(index, index + literal.length);
	if (slice.length !== literal.length) {
		return null;
	}
	if (slice.toLowerCase() !== literal.toLowerCase()) {
		return null;
	}
	return { alias: slice, end: index + literal.length };
}

/** Longest matching literal at `index`. */
function matchAnyLiteral(text: string, index: number, literals: string[]): { alias: string; end: number } | null {
	const sorted = [...literals].sort((a, b) => b.length - a.length);
	for (const literal of sorted) {
		const match = matchLiteral(text, index, literal);
		if (match) {
			return match;
		}
	}
	return null;
}

/** Map ²/³/`^2` forms to a plain exponent string. */
function normalizeExponent(raw: string): string {
	return raw.replace(/²/g, '2').replace(/³/g, '3').replace(/\^/g, '').replace(/\s+/g, '');
}

/** Parse `²`, `³`, `^2`, or a trailing `2`/`3` after a unit. */
function parseExponent(text: string, index: number): { value: string; end: number } | null {
	if (index >= text.length) {
		return null;
	}
	if (text[index] === '²' || text[index] === '³') {
		return { value: text[index] === '²' ? '2' : '3', end: index + 1 };
	}
	const caret = text.slice(index).match(/^\^(-?\d+)/);
	if (caret) {
		return { value: caret[1], end: index + caret[0].length };
	}
	const digits = text.slice(index).match(/^(-?[2-3])(?![.\d])/);
	if (digits) {
		return { value: digits[1], end: index + digits[0].length };
	}
	return null;
}

/** js-quantities token for a unit, with an optional exponent. */
function qtyToken(unit: UnitDefinition, exponent?: string): string {
	const base = unit.qty || unit.symbol || unit.name;
	if (!exponent || exponent === '1') {
		return base;
	}
	if (/[2-3]$/.test(String(base)) || /[²³]$/.test(String(base))) {
		return base;
	}
	return `${base}${exponent}`;
}

/**
 * Adjust confidence for short aliases: `5 m` is meters; `5m` is meters but marked ambiguous.
 */
function applySpacingConfidence(
	match: MatchAtResult,
	hadSpace: boolean,
	text: string,
	unitStart: number,
): MatchAtResult {
	const result = { ...match };
	const alias = match.alias.toLowerCase();

	if (alias === 'm') {
		if (hadSpace) {
			result.confidence = 0.98;
			result.ambiguous = false;
			result.alternatives = [];
		} else {
			result.confidence = 0.7;
			result.ambiguous = true;
			result.alternatives = [{ unit: 'minute', category: 'time', confidence: 0.3 }];
		}
	}

	if (alias === 'in') {
		if (!hadSpace) {
			result.confidence = 0.9;
			result.ambiguous = false;
		} else {
			result.confidence = 0.55;
			result.ambiguous = true;
		}
	}

	if (alias === "'" || alias === '′' || alias === '"' || alias === '″') {
		result.ambiguous = true;
		result.confidence = Math.min(result.confidence, 0.65);
	}

	if ((alias === 'c' || alias === 'f' || alias === 'k') && unitStart > 0) {
		const prev = text[unitStart - 1];
		if (prev === '°' || prev === '˚') {
			result.confidence = 0.99;
			result.ambiguous = false;
			result.alternatives = [];
		} else if (hadSpace && alias === 'c') {
			result.ambiguous = true;
			result.confidence = 0.55;
			result.alternatives = [{ unit: 'cup', category: 'liquidVolume', confidence: 0.4 }];
		}
	}

	if (alias === 'y') {
		result.ambiguous = true;
	}

	return result;
}

/** Attach the resolved unit as a non-enumerable `_unit` for later conversion. */
function attachUnit(result: ParsedMeasurement, unit: UnitDefinition): ParsedMeasurement {
	Object.defineProperty(result, '_unit', { enumerable: false, value: unit });
	return result;
}

/** Parse `6'2"` / `6 ft 2 in` as a single length in inches. */
function tryFeetInches(text: string, index: number, registry: UnitRegistry): ParsedMeasurement | null {
	const n1 = parseNumber(text, index);
	if (!n1) {
		return null;
	}
	let j = skipSpace(text, n1.end);
	const footMark = matchAnyLiteral(text, j, FOOT_MARKS);
	if (!footMark) {
		return null;
	}
	j = footMark.end;
	const afterFoot = skipSpace(text, j);
	const n2 = parseNumber(text, afterFoot);
	if (!n2) {
		return null;
	}
	j = skipSpace(text, n2.end);
	const inchMark = matchAnyLiteral(text, j, INCH_MARKS);
	const usedQuoteFeet = footMark.alias === "'" || footMark.alias === '′';
	if (inchMark) {
		j = inchMark.end;
	} else if (!usedQuoteFeet) {
		return null;
	}

	if (!isUnitBoundary(text, j)) {
		return null;
	}

	const inchUnit = registry.get('inch');
	if (!inchUnit) {
		return null;
	}
	const totalInches = n1.value * 12 + n2.value;
	const si = convertToSi(totalInches, inchUnit);

	return attachUnit(
		{
			raw: text.slice(index, j),
			value: totalInches,
			unit: 'in',
			unitName: 'inch',
			category: 'length',
			siValue: si.value,
			siUnit: si.symbol,
			start: index,
			end: j,
			confidence: 0.97,
			ambiguous: false,
			alternatives: [],
			compound: false,
			numberStyle: n1.style,
			hadSpace: n1.end !== footMark.end - footMark.alias.length && text[n1.end] !== "'",
		},
		inchUnit,
	);
}

/** Build a `ParsedMeasurement` and attach the resolved unit. */
function measurement(args: {
	text: string;
	start: number;
	end: number;
	number: ParsedNumber;
	unitAlias: string;
	unit: UnitDefinition;
	hadSpace: boolean;
	confidence: number;
	ambiguous: boolean;
	alternatives: UnitAlternative[];
	compound: boolean;
	si: { value: number; symbol: string };
}): ParsedMeasurement {
	return attachUnit(
		{
			raw: args.text.slice(args.start, args.end),
			value: args.number.value,
			unit: args.unitAlias,
			unitName: args.unit.name,
			category: args.unit.category,
			siValue: args.si.value,
			siUnit: args.si.symbol,
			start: args.start,
			end: args.end,
			confidence: args.confidence,
			ambiguous: args.ambiguous,
			alternatives: args.alternatives || [],
			compound: args.compound,
			numberStyle: args.number.style,
			hadSpace: args.hadSpace,
		},
		args.unit,
	);
}

/** Named compounds (`mph`) or `unit/unit` and `unit per unit` forms. */
function tryCompoundFromParts(
	text: string,
	index: number,
	number: ParsedNumber,
	registry: UnitRegistry,
	options: ParseOptions,
): ParsedMeasurement | null {
	let j = skipSpace(text, number.end);
	const hadSpace = j !== number.end;

	const named = registry.matchAt(text, j, { allowAmbiguous: !options.strict });
	if (named && named.unit.compound) {
		const adjusted = applySpacingConfidence(named, hadSpace, text, j);
		if (options.strict && adjusted.ambiguous) {
			return null;
		}
		const si = convertToSi(number.value, named.unit);
		return measurement({
			text,
			start: index,
			end: named.end,
			number,
			unitAlias: named.alias,
			unit: named.unit,
			hadSpace,
			confidence: adjusted.confidence,
			ambiguous: adjusted.ambiguous,
			alternatives: adjusted.alternatives,
			compound: true,
			si,
		});
	}

	const first = registry.matchAt(text, j, { allowAmbiguous: !options.strict });
	if (!first || first.unit.compound) {
		return null;
	}

	let k = first.end;
	const exp1 = parseExponent(text, k);
	if (exp1) {
		k = exp1.end;
	}

	const afterFirst = skipSpace(text, k);
	let separator: { type: string; end: number } | null = null;
	if (text[afterFirst] === '/') {
		separator = { type: '/', end: afterFirst + 1 };
	} else if (text.slice(afterFirst, afterFirst + 3).toLowerCase() === 'per' && isUnitBoundary(text, afterFirst + 3)) {
		separator = { type: 'per', end: afterFirst + 3 };
	}
	if (!separator) {
		return null;
	}

	const afterSep = skipSpace(text, separator.end);
	const second = registry.matchAt(text, afterSep, { allowAmbiguous: true });
	if (!second) {
		return null;
	}
	let end = second.end;
	const exp2 = parseExponent(text, end);
	if (exp2) {
		end = exp2.end;
	}
	if (!isUnitBoundary(text, end)) {
		return null;
	}

	const qtyName = `${qtyToken(first.unit, exp1?.value)}/${qtyToken(second.unit, exp2?.value)}`;
	const normalized = normalizeExponent(qtyName);

	try {
		const inspected = inspectQty(number.value, normalized);
		const synthetic: UnitDefinition = {
			name: normalized,
			category: inspected.category,
			qty: normalized,
			symbol: text.slice(j, end).replace(/\s+/g, ''),
			long: `${first.unit.long} per ${second.unit.long}`,
			compound: true,
			aliases: [normalized],
		};
		return measurement({
			text,
			start: index,
			end,
			number,
			unitAlias: text.slice(j, end),
			unit: synthetic,
			hadSpace,
			confidence: 0.95,
			ambiguous: false,
			alternatives: [],
			compound: true,
			si: { value: inspected.siValue, symbol: inspected.siUnit },
		});
	} catch {
		return null;
	}
}

/** Number plus a single unit, including `°C`. */
function trySimple(
	text: string,
	index: number,
	number: ParsedNumber,
	registry: UnitRegistry,
	options: ParseOptions,
): ParsedMeasurement | null {
	const j = skipSpace(text, number.end);
	const hadSpace = j !== number.end;

	if (text[j] === '°' || text[j] === '˚') {
		const afterDegree = skipSpace(text, j + 1);
		const temp = registry.matchAt(text, afterDegree, { allowAmbiguous: !options.strict });
		if (temp && temp.unit.category === 'temperature') {
			const si = convertToSi(number.value, temp.unit);
			return measurement({
				text,
				start: index,
				end: temp.end,
				number,
				unitAlias: text.slice(j, temp.end),
				unit: temp.unit,
				hadSpace,
				confidence: 0.99,
				ambiguous: false,
				alternatives: [],
				compound: false,
				si,
			});
		}
	}

	const match = registry.matchAt(text, j, { allowAmbiguous: true });
	if (!match) {
		return null;
	}

	const adjusted = applySpacingConfidence(match, hadSpace, text, j);
	if (options.strict && adjusted.ambiguous) {
		return null;
	}

	const si = convertToSi(number.value, match.unit);
	return measurement({
		text,
		start: index,
		end: match.end,
		number,
		unitAlias: match.alias,
		unit: match.unit,
		hadSpace,
		confidence: adjusted.confidence,
		ambiguous: adjusted.ambiguous,
		alternatives: adjusted.alternatives,
		compound: Boolean(match.unit.compound),
		si,
	});
}

/** True if the two spans overlap. */
function overlaps(a: ParsedMeasurement, b: ParsedMeasurement): boolean {
	return a.start < b.end && b.start < a.end;
}

/** Scan `text` left to right and return non-overlapping measurements. */
export function parseText(text: string, registry: UnitRegistry, options: ParseOptions = {}): ParsedMeasurement[] {
	if (typeof text !== 'string') {
		throw new TypeError('Text must be a string');
	}

	const opts: ParseOptions = { strict: false, ...options };
	const found: ParsedMeasurement[] = [];

	let i = 0;
	while (i < text.length) {
		if (!canStartNumber(text, i) && text[i] !== "'" && text[i] !== '′') {
			i += 1;
			continue;
		}

		const feet = tryFeetInches(text, i, registry);
		if (feet && !found.some((item) => overlaps(item, feet))) {
			found.push(feet);
			i = feet.end;
			continue;
		}

		const number = parseNumber(text, i);
		if (!number) {
			i += 1;
			continue;
		}

		const compound = tryCompoundFromParts(text, i, number, registry, opts);
		if (compound && !found.some((item) => overlaps(item, compound))) {
			found.push(compound);
			i = compound.end;
			continue;
		}

		const simple = trySimple(text, i, number, registry, opts);
		if (simple && !found.some((item) => overlaps(item, simple))) {
			found.push(simple);
			i = simple.end;
			continue;
		}

		i = number.start + 1;
	}

	found.sort((a, b) => a.start - b.start);
	return found;
}
