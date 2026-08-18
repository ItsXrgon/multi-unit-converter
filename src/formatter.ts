import type { FormatStyle, NumberStyle, UnitDefinition } from './types';

/** Write a scientific `toString()` value in plain decimal. */
function expandScientific(value: number): string {
	const text = String(value);
	if (!/[eE]/.test(text)) {
		return text;
	}
	const n = Number(value);
	if (!Number.isFinite(n)) {
		return text;
	}
	const str = n.toFixed(20).replace(/\.?0+$/, '');
	return str === '-0' ? '0' : str;
}

/** Round `value` to `precision` significant figures. */
export function formatNumber(value: number, precision = 3): string {
	if (!Number.isFinite(value)) {
		return String(value);
	}
	if (value === 0) {
		return '0';
	}

	const rounded = Number.parseFloat(value.toPrecision(precision));
	if (!Number.isFinite(rounded)) {
		return String(value);
	}

	const abs = Math.abs(rounded);
	if (abs >= 1e-6 && abs < 1e21) {
		const asString = rounded.toString();
		if (!/[eE]/.test(asString)) {
			return asString;
		}
		return expandScientific(rounded);
	}

	return rounded.toString();
}

/** Insert commas as thousands separators. */
export function addThousands(formatted: string): string {
	const negative = formatted.startsWith('-');
	const unsigned = negative ? formatted.slice(1) : formatted;
	const [intPart, frac] = unsigned.split('.');
	const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const withFrac = frac !== undefined ? `${grouped}.${frac}` : grouped;
	return negative ? `-${withFrac}` : withFrac;
}

/** Format a number, optionally keeping the source's thousands commas and decimal places. */
export function formatNumberWithStyle(
	value: number,
	precision: number,
	style: NumberStyle = {},
	options: { preserveNumberStyle?: boolean } = {},
): string {
	let formatted = formatNumber(value, precision);

	if (options.preserveNumberStyle && style) {
		if (style.thousandsComma) {
			formatted = addThousands(formatted);
		}
		if (style.decimalPlaces && style.decimalPlaces > 0 && !formatted.includes('.')) {
			const current = formatted.replace(/,/g, '');
			if (/^-?\d+$/.test(current)) {
				formatted = `${formatted}.${'0'.repeat(style.decimalPlaces)}`;
			}
		}
	}

	return formatted;
}

/** Unit symbol (`short`) or long name (`long`). */
export function formatUnit(unit: UnitDefinition | undefined, format: FormatStyle = 'short'): string {
	if (!unit) {
		return '';
	}
	if (format === 'long') {
		return unit.long || unit.name || unit.symbol;
	}
	return unit.symbol || unit.name;
}

/** Concatenate a formatted number and unit with `spacing` between them. */
export function joinValueAndUnit(formattedNumber: string, unitText: string, spacing: string): string {
	if (!unitText) {
		return formattedNumber;
	}
	return `${formattedNumber}${spacing}${unitText}`;
}
