# multi-unit-converter

JavaScript library that detects all units in a string and converts them to SI units, or units specified by user.

## How it works

The `multi-unit-converter` JavaScript library simplifies the process of detecting and converting different units within a text string. Whether you want to convert units to the standard International System of Units (SI) or specify custom units, this library offers a straightforward solution.

1- All units and their values are detected using a Regural Expression
2- Then each unit is matched with its stored version in the library by comparing with the aliases of each
3- Finally the unit is converted by multiplying by the toSI value stored in the library then adding the offset
4- If the unit to convert to is different from the SI unit, then the previous value is divided by the toSI of that and the offset is subtracted.

## Installation

You can install this library using npm:

`npm install multi-unit-converter`

## Usage

To use this library in JS, import it into your project using require then initiliase it:

```js
const multiUnitConverter = require('multi-unit-converter');
const muc = new MultiUnitConverter();
```

For TS, import it into your project then initiliase it:

```ts
import { MultiUnitConverter } from 'multi-unit-converter';
const muc = new MultiUnitConverter();
```

You can then use the convertText(text) command to convert a text string to its SI equivalent:

```js
const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = muc.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80.45 km and used 0.019 m³ of gas.'
```

In this example, we pass the input text string 'The car traveled 50 miles and used 5 gallons of gas.' to the convertText() command, and store the output in the outputText variable. We then log the output using console.log(), which should return the string The car traveled 80470 m and used 0.019 m³ of gas.'.

```js
muc.setUnitLength('km'); // Now the unit of the length we convert to is meter (m) not kilemeter (km)
const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = muc.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80.47 km and used 0.019 m³ of gas.'
```

In this example, we copy the same process as example 1 but this time we switches the default length unit to meter, which should return the string 'The car traveled 80.47 km and used 0.019 m³ of gas.'.

## Input flexibility

This library works for the most common spelling of units, for example

```js
muc.setUnitLength('m');
muc.setUnitLength('meter');
muc.setUnitLength('meters');
```

All 3 function calls would all set the length unit value to 'm' as it is the abbreviation of the other 2.

```js
text = muc.convertText('5 cm');
text = muc.convertText('5 cms');
text = muc.convertText('5 centimeters');
text = muc.convertText('5 centimeter');
```

All 4 function calls would return "0.05 m" as all 4 are acceptable spelling of centimeter, therefore detected and converted to the specified length unit (in this case its meter).

## Functions available

```js
convertText(text); // Converts the units and values in a text (string) to specified units

setPrecision(number); // Sets the significant figures to round to (default is 3)

setTemplate(template); // Sets units to a template of the following [metric, US, imperial, recipe]
// Metric:- length: meter, weight: grams, liquid volume: liter, area: m², volume: m³
// Imperial:- length: inch, weight: pound, liquid volume: gallon, area: ft², volume: ft³
// US:- length: foot, weight: pound, liquid volume: liter, gallon:  ft², volume: ft³
// Recipe:-  weight: grams, liquid volume: cups

setUnitTime(time); // Sets the specified unit of time (SI unit if unspecified)

setUnitLength(length); // Sets the specified unit of length (SI unit if unspecified)

setUnitWeight(weight); // Sets the specified unit of weight (SI unit if unspecified)

setUnitLiquidVolume(liquidVolume); // Sets the specified unit of liquid volume (SI unit if unspecified)

setUnitTemperature(temperature); // Sets the specified unit of temperature (SI unit if unspecified)

setUnitElectricCurrent(electricCurrent); // Sets the specified unit of electric current (SI unit if unspecified)

setUnitPressure(pressure); // Sets the specified unit of pressure (SI unit if unspecified)

setUnitEnergy(energy); // Sets the specified unit of energy (SI unit if unspecified)

setUnitFrequency(frequency); // Sets the specified unit of frequency (SI unit if unspecified)

setUnitArea(area); // Sets the specified unit of area (SI unit if unspecified)

setUnitVolume(volume); // Sets the specified unit of volume (SI unit if unspecified)
```

## List of all supported units with their aliases

### Time units

```json
{
 "millisecond": [
  "milliseconds",
  "millisecond",
  "ms",
  "msec",
  "msecs",
  "millisecs",
  "millisec"
 ],
 "second": ["seconds", "second", "s", "sec", "secs"],
 "minute": ["minutes", "minute", "mins", "min"],
 "hour": ["hours", "hour", "h", "hr", "hrs"],
 "day": ["days", "day", "d"],
 "week": ["weeks", "week", "w"],
 "month": ["months", "month"],
 "years": ["years", "year", "y", "yr", "yrs"]
}
```

### Length units

```json
{
 "millimeter": [
  "millimeters",
  "millimeter",
  "mm",
  "mms",
  "millimetres",
  "millimetre",
  "millimetres",
  "millimetre",
  "millim"
 ],
 "centimeter": [
  "centimeters",
  "centimeter",
  "cm",
  "cms",
  "centimetre",
  "centimetres",
  "centimetre"
 ],
 "inch": ["inches", "inch", "in", "\"", "''", "″", "″", "in."],
 "foot": ["feet", "foot", "ft", "'", "''", "′", "′", "ft."],
 "yard": ["yards", "yard", "yd", "yds", "y", "yd."],
 "meter": ["meters", "meter", "m", "metres", "metre", "met"],
 "kilometer": [
  "kilometers",
  "kilometer",
  "km",
  "kms",
  "kilometre",
  "kilometres",
  "kilometre",
  "kilo",
  "kilos"
 ],
 "mile": ["miles", "mile", "mi", "mi.", "miles."],
 "lightyear": ["lightyears", "light years", "lightyear", "light year", "ly"]
}
```

### Mass units

```json
{
 "milligram": ["milligrams", "milligram", "milligramme", "milligrammes", "mg"],
 "gram": ["grams", "gram", "gramme", "grammes", "g"],
 "ounce": ["ounces", "ounce", "oz", "oz.", "ozs", "ozs."],
 "pound": ["pounds", "pound", "lb", "lb.", "lbs", "lbs."],
 "kilogram": [
  "kilograms",
  "kilogram",
  "kilogramme",
  "kilogrammes",
  "kilo",
  "kilos",
  "kg"
 ],
 "tonne": ["tonnes", "tonne", "t"],
 "ton": ["tons", "ton", "tn"]
}
```

### Liquid volume units

```json
{
 "mm3": ["milimeters cubed", "milimeter cubed", "mm3", "mm³"],
 "cm3": ["centimeters cubed", "centimeter cubed", "cm3", "cm³"],
 "m3": ["meters cubed", "meter cubed", "m3", "m³"],
 "ml": ["milliliters", "milliliter", "ml"],
 "l": ["liters", "liter", "l"],
 "fl_oz": ["fluid ounces", "fluid ounce", "fl ozs", "fl oz"],
 "cup": ["cups", "cup"],
 "gal": ["gallons", "gallon", "gal"]
}
```

### Temperature units

```json
{
 "kelvin": ["kelvin", "k", "°k", "degk", "deg k", "K", "°K", "degK", "deg K"],
 "celsius": [
  "celsius",
  "c",
  "°c",
  "degc",
  "deg c",
  "C",
  "°C",
  "degC",
  "deg C"
 ],
 "fahrenheit": [
  "fahrenheit",
  "f",
  "°f",
  "degf",
  "deg f",
  "F",
  "°F",
  "degF",
  "deg F"
 ]
}
```

### Electric current units

```json
{
 "milliampere": [
  "milliamperes",
  "milliampere",
  "milliamp",
  "milliamps",
  "mA",
  "ma"
 ],
 "ampere": ["amperes", "ampere", "amp", "amps", "A"],
 "kiloampere": [
  "kiloamperes",
  "kiloampere",
  "kiloamper",
  "kiloamps",
  "kiloamp",
  "kiloa",
  "ka"
 ]
}
```

### Pressue units

```json
{
 "pascal": ["pascals", "pascal", "Pa", "P"],
 "kilopascal": ["kilopascals", "kilopascal", "kPa", "kP"],
 "megapascal": ["megapascals", "megapascal", "MPa", "MP"],
 "atmosphere": ["atmosphere", "atmosphere", "atm", "atms"],
 "psi": ["pounds per square inch", "pound per square inch", "psis", "psi"],
 "bar": ["bars", "bar"]
}
```

### Energy units

```json
{
 "joule": ["joules", "joule", "J"],
 "kilojoule": ["kilojoules", "kilojoule", "kJ"],
 "megajoule": ["megajoules", "megajoule", "mJ"],
 "kilowatthour": ["kilowatt-hours", "kilowatt-hour", "kwh"]
}
```

### Frequency units

```json
{
 "hertz": ["hertz", "hz"],
 "kilohertz": ["kilohertz", "khz"],
 "megahertz": ["megahertz", "mhz"],
 "gigahertz": ["gigahertz", "ghz"]
}
```

### Volume units

```json
{
 "millimetercubed": [
  "millimeterscubed",
  "millimetercubed",
  "millimeters cubed",
  "millimeter cubed",
  "mm³",
  "mm^3",
  "mm3",
  "mmcubed",
  "mmcubic"
 ],
 "centimetercubed": [
  "centimeterscubed",
  "centimetercubed",
  "centimeters cubed",
  "centimeter cubed",
  "centimeter^3",
  "centimeter3",
  "cm³",
  "cm^3",
  "cm3",
  "cmcubed"
 ],
 "metercubed": [
  "meterscubed",
  "metercubed",
  "meters cubed",
  "meter cubed",
  "m³",
  "m^3",
  "m3",
  "mcubed",
  "mcubic"
 ],
 "inchcubed": [
  "inchescubed",
  "inchescubed",
  "inches cubed",
  "inch cubed",
  "in³",
  "in^3",
  "in3",
  "incubed"
 ],
 "footcubed": [
  "feetcubed",
  "footcubed",
  "feet cubed",
  "foot cubed",
  "ft³",
  "ft^3",
  "ft3",
  "ftcubed"
 ],
 "yd3": [
  "yardscubed",
  "yardcubed",
  "yards cubed",
  "yard cubed",
  "yd³",
  "yd^3",
  "yd3",
  "ydcubed"
 ],
 "kilometercubed": [
  "kilometerscubed",
  "kilometercubed",
  "kilometers cubed",
  "kilometer cubed",
  "km³",
  "km^3",
  "km3",
  "kmcubed"
 ]
}
```

### Area units

```json
{
 "millimetersquared": [
  "millimeterssquared",
  "millimetersquared",
  "millimeters squared",
  "millimeters quared",
  "millimetersq",
  "mm2",
  "mm^2",
  "mm²"
 ],
 "centimetersquared": [
  "centimeterssquared",
  "centimetersquared",
  "centimeters squared",
  "centimeter squared",
  "centimetersq",
  "cm2",
  "cm^2",
  "cm²"
 ],
 "metersquared": [
  "meterssquared",
  "metersquared",
  "meters squared",
  "meter squared",
  "metersq",
  "m2",
  "m^2",
  "m²"
 ],
 "kilometersquared": [
  "kilometerssquared",
  "kilometersquared",
  "kilometers squared",
  "kilometer squared",
  "km²",
  "km^2",
  "km2"
 ],
 "inchsquared": [
  "inchessquared",
  "inchesquared",
  "inches squared",
  "inche squared",
  "in²",
  "in^2",
  "in2"
 ],
 "footsquared": [
  "feetsquared",
  "footsquared",
  "feet squared",
  "foot squared",
  "ft²",
  "ft^2",
  "ft2"
 ],
 "yardsquared": [
  "yardssquared",
  "yardsquared",
  "yards squared",
  "yard squared",
  "yd²",
  "yd^2",
  "yd2"
 ],
 "acre": ["acres", "acre", "ac"],
 "hectare": ["hectares", "hectare", "ha"]
}
```

### More units will be added in the future

## License

This library is released under the MIT License. See LICENSE for more information.

## Contributing

Contributions to this library are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

## Contact

If you have any questions or concerns about this library, please feel free to contact me at <ali.koheil@gmail.com>
