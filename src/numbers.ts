import type { NumberStyle, ParsedNumber } from './types';

/** Unicode vulgar fractions to numeric values. */
export const UNICODE_FRACTIONS: Record<string, number> = {
	'½': 1 / 2,
	'⅓': 1 / 3,
	'⅔': 2 / 3,
	'¼': 1 / 4,
	'¾': 3 / 4,
	'⅕': 1 / 5,
	'⅖': 2 / 5,
	'⅗': 3 / 5,
	'⅘': 4 / 5,
	'⅙': 1 / 6,
	'⅚': 5 / 6,
	'⅛': 1 / 8,
	'⅜': 3 / 8,
	'⅝': 5 / 8,
	'⅞': 7 / 8,
};

/** Unicode superscript digits and signs to ASCII. */
export const SUPERSCRIPTS: Record<string, string> = {
	'⁰': '0',
	'¹': '1',
	'²': '2',
	'³': '3',
	'⁴': '4',
	'⁵': '5',
	'⁶': '6',
	'⁷': '7',
	'⁸': '8',
	'⁹': '9',
	'⁺': '+',
	'⁻': '-',
};

/** Character class of unicode fraction glyphs for the mixed-fraction regex. */
const FRACTION_CHARS = Object.keys(UNICODE_FRACTIONS).join('');

/** Read a run of superscript digits starting at `index`. */
export function readSuperscript(text: string, index: number): { raw: string; value: number; end: number } | null {
	let raw = '';
	let mapped = '';
	let i = index;
	while (i < text.length && SUPERSCRIPTS[text[i]] !== undefined) {
		raw += text[i];
		mapped += SUPERSCRIPTS[text[i]];
		i += 1;
	}
	if (!raw) {
		return null;
	}
	return { raw, value: Number(mapped), end: i };
}

function applySign(sign: string, value: number): number {
	return sign === '-' ? -value : value;
}

/** Index after any whitespace at `index`. */
export function skipSpace(text: string, index: number): number {
	let i = index;
	while (i < text.length && /[\s\u00A0]/.test(text[i])) {
		i += 1;
	}
	return i;
}

/**
 * Parse a number at `index`: decimals, commas, scientific, fractions, mixed numbers, unicode fractions.
 */
export function parseNumber(text: string, index: number): ParsedNumber | null {
	if (index >= text.length) {
		return null;
	}

	let i = index;
	let sign = '';
	if (text[i] === '+' || text[i] === '-') {
		if (i + 1 < text.length && (/\d/.test(text[i + 1]) || text[i + 1] === '.' || UNICODE_FRACTIONS[text[i + 1]])) {
			sign = text[i];
			i += 1;
		} else {
			return null;
		}
	}

	const rest = text.slice(i);

	let match = rest.match(new RegExp(`^(\\d+)\\s*([${FRACTION_CHARS}])`));
	if (match) {
		const whole = Number(match[1]);
		const frac = UNICODE_FRACTIONS[match[2]];
		const end = i + match[0].length;
		return styleResult(applySign(sign, whole + frac), index, end, text, { mixedFraction: true });
	}

	if (UNICODE_FRACTIONS[text[i]]) {
		const end = i + 1;
		return styleResult(applySign(sign, UNICODE_FRACTIONS[text[i]]), index, end, text, { unicodeFraction: true });
	}

	match = rest.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)/);
	if (match && Number(match[3]) !== 0) {
		const value = Number(match[1]) + Number(match[2]) / Number(match[3]);
		const end = i + match[0].length;
		return styleResult(applySign(sign, value), index, end, text, { mixedFraction: true });
	}

	match = rest.match(/^(\d+(?:\.\d+)?|\.\d+)\s*[×xX]\s*10(?:\^([+-]?\d+)|([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+))/);
	if (match) {
		const base = Number(match[1]);
		let exp: number;
		if (match[2] !== undefined) {
			exp = Number(match[2]);
		} else {
			exp = Number([...match[3]].map((ch) => SUPERSCRIPTS[ch]).join(''));
		}
		const end = i + match[0].length;
		return styleResult(applySign(sign, base * Math.pow(10, exp)), index, end, text, { scientific: true });
	}

	match = rest.match(/^(\d+(?:\.\d+)?|\.\d+)[eE]([+-]?\d+)/);
	if (match) {
		const end = i + match[0].length;
		return styleResult(applySign(sign, Number(match[0])), index, end, text, { scientific: true });
	}

	match = rest.match(/^(\d+)\s*\/\s*(\d+)/);
	if (match && Number(match[2]) !== 0) {
		const numerator = Number(match[1]);
		const denominator = Number(match[2]);
		if (denominator <= 1000) {
			const end = i + match[0].length;
			return styleResult(applySign(sign, numerator / denominator), index, end, text, { fraction: true });
		}
	}

	match = rest.match(/^(\d{1,3}(?:,\d{3})+)(\.\d+)?/);
	if (match) {
		const end = i + match[0].length;
		const value = Number(match[0].replace(/,/g, ''));
		return styleResult(applySign(sign, value), index, end, text, {
			thousandsComma: true,
			decimalPlaces: match[2] ? match[2].length - 1 : 0,
		});
	}

	match = rest.match(/^(\d+\.\d*|\.\d+|\d+)/);
	if (match) {
		const end = i + match[0].length;
		const rawNumber = match[1];
		const decimalIndex = rawNumber.indexOf('.');
		return styleResult(applySign(sign, Number(rawNumber)), index, end, text, {
			decimalPlaces: decimalIndex === -1 ? 0 : rawNumber.length - decimalIndex - 1,
			leadingDot: rawNumber.startsWith('.'),
			signed: Boolean(sign),
		});
	}

	return null;
}

/** Build a `ParsedNumber` from a value and its span in `text`. */
function styleResult(value: number, start: number, end: number, text: string, style: NumberStyle): ParsedNumber | null {
	if (!Number.isFinite(value)) {
		return null;
	}
	return {
		value,
		start,
		end,
		raw: text.slice(start, end),
		style,
	};
}

/** True if a number parse can start at `index`. */
export function canStartNumber(text: string, index: number): boolean {
	const ch = text[index];
	if (ch >= '0' && ch <= '9') {
		return true;
	}
	if (ch === '.' && index + 1 < text.length && text[index + 1] >= '0' && text[index + 1] <= '9') {
		return true;
	}
	if (
		(ch === '+' || ch === '-') &&
		index + 1 < text.length &&
		(/\d/.test(text[index + 1]) || text[index + 1] === '.' || UNICODE_FRACTIONS[text[index + 1]])
	) {
		return true;
	}
	if (UNICODE_FRACTIONS[ch]) {
		return true;
	}
	return false;
}
