# multi-unit-converter
This is a JS library that converts all units and values in a given text to user specified units or to their SI equivalents if specified.

## Installation
You can install this library using npm:

```npm install multi-unit-converter```

## Usage
To use this library in JS, first import it into your project using require then initiliase it:

```js
const multiUnitConverter = require('multi-unit-converter');
const muc = new multiUnitConverter();
```


For TS, Add the declaration to .d.ts file then import it into your project then initiliase it:

```ts
declare module 'multi-unit-converter'; // Add this to your .d.ts file
```

```ts
import MultiUnitConverter from 'multi-unit-converter'
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
muc.setUnitLength("km"); // Now the unit of the length we convert to is meter (m) not kilemeter (km)
const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = muc.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80.47 km and used 0.019 m³ of gas.'
```

In this example, we copy the same process as example 1 but this time we switches the default length unit to meter, which should return the string 'The car traveled 80.47 km and used 0.019 m³ of gas.'.

## Input flexibility 

This library works for the most common spelling of units, for example

```js
muc.setUnitLength("m");
muc.setUnitLength("meter");
muc.setUnitLength("meters");
```

All 3 function calls would all set the length unit value to 'm' as it is the abbreviation of the other 2.

```js
text = muc.convertText("5 cm");
text = muc.convertText("5 cms");
text = muc.convertText("5 centimeters");
text = muc.convertText("5 centimeter");
```

All 4 function calls would return "0.05 m" as all 4 are acceptable spelling of centimeter, therefore detected and converted to the specified length unit (in this case its meter).

## Functions available:
```js
convertText(text)  // Converts the units and values in a text (string) to specified units

setPrecision(number)  // Sets the significant figures to round to (default is 3)

setAllUnits(template) // Sets units to a template of the following [metric, us, imperial, recipe]
    // Metric:- length: meter, weight: grams, liquid volume: liter, area: m², volume: m³
    // Imperial:- length: inch, weight: pound, liquid volume: gallon, area: ft², volume: ft³
    // US:- length: foot, weight: pound, liquid volume: liter, gallon:  ft², volume: ft³
    // Recipe:- Spoon: tablespoon, weight: grams, liquid volume: cups

setUnitTime(time) // Sets the specified unit of time (SI unit if unspecified) 

setUnitLength(length) // Sets the specified unit of length (SI unit if unspecified) 

setUnitWeight(weight) // Sets the specified unit of weight (SI unit if unspecified) 

setUnitLiquidVolume(liquidVolume) // Sets the specified unit of liquid volume (SI unit if unspecified) 

setUnitTemperature(temperature) // Sets the specified unit of temperature (SI unit if unspecified) 

setUnitElectricCurrent(electricCurrent) // Sets the specified unit of electric current (SI unit if unspecified) 

setUnitSpoon(spoon) // Sets the specified unit of spoon (SI unit if unspecified) 

setUnitPressure(pressure) // Sets the specified unit of pressure (SI unit if unspecified) 

setUnitEnergy(energy) // Sets the specified unit of energy (SI unit if unspecified) 

setUnitFrequency(frequency) // Sets the specified unit of frequency (SI unit if unspecified)

setUnitArea(area) // Sets the specified unit of area (SI unit if unspecified) 

setUnitVolume(volume) // Sets the specified unit of volume (SI unit if unspecified) 
```

## Current list of available units and their aliases:
```json
{
    "timeUnits" : {
        "ms": ["miliseconds", "milisecond", "ms"],
        "s": ["seconds", "second", "s", "sec", "secs"],
        "min": ["minutes", "minute", "min"],
        "h": ["hours", "hour", "h"],
        "day": ["days", "day", "d"]
    },

    "lengthUnits" : {
        "mm": ["milimeters", "milimeter", "mm", "mms"],
        "cm": ["centimeters", "centimeter","cm", "cms"],
        "in": ["inches", "inch", "in", "\""],
        "ft": ["feet", "foot", "ft", "'"],
        "yd": ["yards", "yard", "yd"],
        "m": ["meters", "meter", "m"],
        "km": ["kilometers", "kilometer","km"],
        "mi": ["miles", "mile", "mi"]
    },

    "weightUnits" : {
        "mg": ["miligrams", "miligram","mg"],
        "g": ["grams", "gram", "g"],
        "oz": ["ounces", "ounce", "ozs", "oz"],
        "lb": ["pounds", "pound", "lbs", "lb"],
        "kg": ["kilograms", "kilogram", "kg"],
        "ton": ["tonnes", "tonne", "tn"], 
        "tonnes": ["tons", "ton", "t"]
    },

    "liquidVolumeUnits" : {
        "mm3": ["milimeters cubed", "milimeter cubed", "mm3", "mm³"],
        "cm3": ["centimeters cubed", "centimeter cubed", "cm3", "cm³"],
        "m3": ["meters cubed", "meter cubed", "m3", "m³"],
        "ml": ["milliliters", "milliliter", "ml"],
        "l": ["liters", "liter","l"],
        "fl_oz": ["fluid ounces", "fluid ounce", "fl ozs", "fl oz"],
        "cup": ["cups", "cup"],
        "gal": ["gallons", "gallon", "gal"]
    },

    "temperatureUnits" : {
        "K": ["kelvins", "kelvin", "k", "K"],
        "C": ["celsius", "c", "°c", "C", "°C"],
        "F": ["fahrenheit", "f", "°f", "F", "°F"]
    },

    "electricCurrentUnits" : {
        "mA": ["milliamperes", "milliampere", "ma"],
        "A": ["amperes", "ampere", "a"],
        "kA": ["kiloamperes", "kiloampere", "ka"]
    },

    "spoonUnits" : {
        "tsp": ["teaspoons", "teaspoon", "tea spoon", "tsp"],
        "tbsp": ["tablespoons", "tablespoons", "table spoon", "tbsp"]
    },

    "pressureUnits": {
        "Pa": ["pascals", "pascal", "pa"],
        "kPa": ["kilopascals", "kilopascal","kpa"],
        "MPa": ["megapascals", "megapascal","mpa"],
        "atm": ["atmospheres", "atmosphere", "atm"],
        "psi": ["pounds per square inch", "pound per square inch", "psi"],
        "bar": ["bar"]
    },

    "energyUnits": {
        "J": ["joules", "joule", "j"],
        "kJ": ["kilojoules", "kilojoule","kJ"],
        "MJ": ["megajoules", "megajoule","mJ"],
        "kWh": ["kilowatt-hours", "kilowatt-hour","kwh"]
    },

    "frequencyUnits": {
        "Hz": ["hertz", "hertz", "hz"],
        "kHz": ["kilohertz", "kilohertz","khz"],
        "MHz": ["megahertz", "megahertz","mhz"],
        "GHz": ["gigahertz", "gigahertz","ghz"]
    },

    "volumeUnits": {
        "mm3": ["cubic millimeters", "cubic millimeter", "millimeter cubed", "millimeters cubed","mm3", "mm³"],
        "cm3": ["cubic centimeters", "cubic centimeter", "centimeter cubed", "centimeters cubed", "cm3", "cm³"],
        "m3": ["cubic meters", "cubic meter", "meter cubed", "meters cubed", "m3", "m³"],
        "in3": ["cubic inches", "cubic inch", "inch cubed", "inches cubed", "in3", "in³"],
        "ft3": ["cubic feet", "cubic foot", "ft3", "ft³"],
        "yd3": ["cubic yards", "cubic yard", "yard cubed", "yards cubed", "yd3", "yd³"]
    },

    "areaUnits": {
        "mm2": ["square millimeters", "square millimeter", "millimeter squared", "millimeters squared", "mm2", "mm²"],
        "cm2": ["square centimeters", "square centimeter", "centimeter squared", "centimeters squared", "cm²", "cm²"],
        "m2": ["square meters", "square meter", "meter squared", "meters squared", "m2", "m²"],
        "km2": ["square kilometers", "square kilometer", "kilometers squared", "kilometerss squared", "km²", "km²"],
        "in2": ["square inches", "square inch", "inche squared", "inches squared", "in2", "in²"],
        "ft2": ["square feet", "square foot", "ft2", "ft²"],
        "yd2": ["square yards", "square yard", "yd²2", "yd²"],
        "ac": ["acres", "acre", "ac"],
        "ha": ["hectares", "hectare", "ha"]
    }
}

```
### More units will be added in the future

## License
This library is released under the MIT License. See LICENSE for more information.

## Contributing
Contributions to this library are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

## Contact
If you have any questions or concerns about this library, please feel free to contact me at ali.koheil@gmail.com