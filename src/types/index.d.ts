/**
 * Generated from: types/index.d.ts
 * @modName { multi-unit-converter }
 * @description Multi Unit Converter
 * @license MIT
 * @version 1.6.0
 * @exports Unit
 * @exports MultiUnitConverter
 * @exports MultiUnitConverterOptions
 * @fileoverview Multi Unit Converter
 */

declare module 'multi-unit-converter' {
	export interface MultiUnitConverterOptions {
		time?: string;
		length?: string;
		mass?: string;
		area?: string;
		volume?: string;
		liquidVolume?: string;
		temperature?: string;
		electricCurrent?: string;
		pressure?: string;
		energy?: string;
		frequency?: string;
		precision?: number;
		regex?: string;
	}

	export interface Unit {
		name: string;
		label: string;
		symbol: string;
		base: string;
		toSI: number;
		offset: number;
		type:
			| 'area'
			| 'current'
			| 'energy'
			| 'frequency'
			| 'length'
			| 'liquidVolume'
			| 'mass'
			| 'pressure'
			| 'temperature'
			| 'time'
			| 'volume';
		system: 'metric' | 'imperial';
		aliases: string[];
	}

	export class MultiUnitConverter {
		precision: number;
		units: {
			time: Unit;
			length: Unit;
			mass: Unit;
			area: Unit;
			volume: Unit;
			liquidVolume: Unit;
			temperature: Unit;
			electricCurrent: Unit;
			pressure: Unit;
			energy: Unit;
			frequency: Unit;
		};

		siUnits: {
			time: Unit;
			length: Unit;
			mass: Unit;
			area: Unit;
			volume: Unit;
			liquidVolume: Unit;
			temperature: Unit;
			electricCurrent: Unit;
			pressure: Unit;
			energy: Unit;
			frequency: Unit;
		};

		lengthUnits: Unit[];
		massUnits: Unit[];
		liquidVolumeUnits: Unit[];
		timeUnits: Unit[];
		temperatureUnits: Unit[];
		electricCurrentUnits: Unit[];
		pressureUnits: Unit[];
		energyUnits: Unit[];
		frequencyUnits: Unit[];
		volumeUnits: Unit[];
		areaUnits: Unit[];

		lengthAliases: string[];
		massAliases: string[];
		liquidVolumeAliases: string[];
		timeAliases: string[];
		temperatureAliases: string[];
		electricCurrentAliases: string[];
		pressureAliases: string[];
		energyAliases: string[];
		frequencyAliases: string[];
		volumeAliases: string[];
		areaAliases: string[];

		constructor(options?: MultiUnitConverterOptions);
		convertText(input: string): string;
		setTemplate(template: string): void;
		setPrecision(precision: number): void;
		setUnitTime(unit: string): void;
		setUnitLength(unit: string): void;
		setUnitMass(unit: string): void;
		setUnitArea(unit: string): void;
		setUnitVolume(unit: string): void;
		setUnitLiquidVolume(unit: string): void;
		setUnitTemperature(unit: string): void;
		setUnitElectricCurrent(unit: string): void;
		setUnitPressure(unit: string): void;
		setUnitEnergy(unit: string): void;
		setUnitFrequency(unit: string): void;
		resolveAliasesTime(unit: string): Unit;
		resolveAliasesLength(unit: string): Unit;
		resolveAliasesMass(unit: string): Unit;
		resolveAliasesArea(unit: string): Unit;
		resolveAliasesVolume(unit: string): Unit;
		resolveAliasesLiquidVolume(unit: string): Unit;
		resolveAliasesTemperature(unit: string): Unit;
		resolveAliasesElectricCurrent(unit: string): Unit;
		resolveAliasesPressure(unit: string): Unit;
	}
}
