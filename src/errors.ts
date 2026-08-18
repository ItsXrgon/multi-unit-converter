/** Base error for this library. */
export class MucError extends Error {
	constructor(message: string) {
		super(message);
		this.name = new.target.name;
	}
}

/** Unknown unit, wrong category, or units that cannot convert to each other. */
export class InvalidUnitError extends MucError {}

/** `usePreset()` received a name that is not a known preset. */
export class InvalidPresetError extends MucError {}
