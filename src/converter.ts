import Qty from 'js-quantities';
import { InvalidUnitError } from './errors';
import { KIND_TO_CATEGORY, SI_DISPLAY, VOLUME_CATEGORIES } from './registry';
import type { SiDisplay, UnitDefinition } from './types';

/** js-quantities unit id for a definition, or `null` for custom units. */
export function qtyOf(unit?: UnitDefinition | null): string | null {
	if (!unit || unit.custom) {
		return null;
	}
	return unit.qty || unit.symbol || unit.name;
}

/** SI display unit for a category. Falls back to length. */
export function siInfo(category: string): SiDisplay {
	return SI_DISPLAY[category] || SI_DISPLAY.length;
}

/** Convert `value` in `unit` to that category's SI unit. */
export function toSiValue(value: number, unit: UnitDefinition): number {
	if (unit.custom) {
		const offset = unit.offset || 0;
		return value * (unit.toSI as number) + offset;
	}
	const qtyName = qtyOf(unit);
	const si = siInfo(unit.category);
	try {
		return Qty(value, qtyName as string).to(si.qty).scalar;
	} catch (error) {
		try {
			return Qty(value, qtyName as string).toBase().scalar;
		} catch {
			const message = error instanceof Error ? error.message : String(error);
			throw new InvalidUnitError(`Cannot convert ${qtyName} to SI: ${message}`);
		}
	}
}

/** Convert an SI value into `unit`. */
export function fromSiValue(siValue: number, unit: UnitDefinition): number {
	if (unit.custom) {
		const offset = unit.offset || 0;
		return (siValue - offset) / (unit.toSI as number);
	}
	const qtyName = qtyOf(unit);
	const si = siInfo(unit.category);
	try {
		return Qty(siValue, si.qty).to(qtyName as string).scalar;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new InvalidUnitError(`Cannot convert SI to ${qtyName}: ${message}`);
	}
}

/** True if two units measure the same kind of quantity. */
function sameDimension(fromUnit: UnitDefinition, toUnit: UnitDefinition): boolean {
	if (fromUnit.category === toUnit.category) {
		return true;
	}
	return VOLUME_CATEGORIES.has(fromUnit.category) && VOLUME_CATEGORIES.has(toUnit.category);
}

/** Convert `value` from `fromUnit` to `toUnit`. Custom units go through SI. */
export function convertValue(value: number, fromUnit?: UnitDefinition | null, toUnit?: UnitDefinition | null): number {
	if (fromUnit === toUnit || (fromUnit && toUnit && fromUnit.name === toUnit.name && fromUnit.qty === toUnit.qty)) {
		return value;
	}
	if (!fromUnit || !toUnit) {
		throw new InvalidUnitError('Cannot convert: unknown unit');
	}
	if (!sameDimension(fromUnit, toUnit)) {
		throw new InvalidUnitError(`Cannot convert ${fromUnit.name} to ${toUnit.name}`);
	}

	if (fromUnit.custom || toUnit.custom) {
		const si = toSiValue(value, fromUnit);
		return fromSiValue(si, toUnit);
	}

	try {
		return Qty(value, qtyOf(fromUnit) as string).to(qtyOf(toUnit) as string).scalar;
	} catch {
		const si = toSiValue(value, fromUnit);
		return fromSiValue(si, toUnit);
	}
}

/** Convert to the category SI unit and return value plus display fields. */
export function convertToSi(
	value: number,
	fromUnit: UnitDefinition,
): { value: number; unit: string; symbol: string; name: string } {
	const si = siInfo(fromUnit.category);
	return {
		value: toSiValue(value, fromUnit),
		unit: si.qty,
		symbol: si.symbol,
		name: si.name,
	};
}

/** Map a js-quantities kind string to a category. */
export function kindToCategory(kind: string): string {
	return KIND_TO_CATEGORY[kind] || kind;
}

/** Parse a js-quantities string and return its kind, category, and SI value. */
export function inspectQty(value: number, qtyName: string) {
	const qty = Qty(value, qtyName);
	const kind = qty.kind();
	const category = kindToCategory(kind);
	const si = SI_DISPLAY[category];
	let siValue: number;
	let siUnit = si ? si.symbol : qty.toBase().units();
	if (si) {
		try {
			siValue = qty.to(si.qty).scalar;
			siUnit = si.symbol;
		} catch {
			siValue = qty.toBase().scalar;
		}
	} else {
		siValue = qty.toBase().scalar;
	}
	return {
		qty,
		kind,
		category,
		siValue,
		siUnit,
		siQty: si ? si.qty : qty.toBase().units(),
	};
}
