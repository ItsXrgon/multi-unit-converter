# JS-Unit-Converter
This is a JS library that converts all units and values in a given text to user specified units or to their SI equivalents if specified.

## Installation
You can install this library using npm:

```npm install js-unit-converter```

## Usage
To use this library, first import it into your project using require or import then initiliase it:

```js
const jsUnitConverter = require('js-unit-converter');
const cu = new jsUnitConverter();
```

You can then use the convertText(text) command to convert a text string to its SI equivalent:

```js
const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = cu.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80.47 km and used 18.93 l of gas.'
```
In this example, we pass the input text string 'The car traveled 50 miles and used 5 gallons of gas.' to the convertText() command, and store the output in the outputText variable. We then log the output using console.log(), which should return the string 'The car traveled 80.47 kilometers and used 18.93 liters of gas.'.


```js
cu.setUnitLength("m"); // Now the unit of the length we convert to is meter (m) not kilemeter (km)
const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = cu.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80470 m and used 18.93 l of gas.
```

In this example, we copy the same process as example 1 but this time we switches the default length unit to meter, which should return the string 'The car traveled 80.47 kilometers and used 18.93 liters of gas.'.

## Input flexibility 

This library works for the most common spelling of units, for example

```js
cu.setUnitLength("m");
cu.setUnitLength("meter");
cu.setUnitLength("meters");
```

All 3 function calls would all set the length unit value to 'm' as it is the abbreviation of the other 2.

```js
text = cu.convertText("5 cm");
text = cu.convertText("5 cms");
text = cu.convertText("5 centimeters");
text = cu.convertText("5 centimeter");
```

All 3 function calls would return "0.05 m" as all 4 are acceptable spelling of centimeter, therefore detected and converted to the specified length unit (in this case its meter).

## Functions available:
```js
convertText(text)  // Converts the units and values in a text (string) to specified units

setUnitTime(time) // Sets the specified unit of time (SI unit if unspecified) 

setUnitLength(length) // Sets the specified unit of length (SI unit if unspecified) 

setUnitWeight(weight) // Sets the specified unit of weight (SI unit if unspecified) 

setUnitLiquidVolume(liquidVolume) // Sets the specified unit of liquid volume (SI unit if unspecified) 

setUnitTemperature(temperature) // Sets the specified unit of temperature (SI unit if unspecified) 

setUnitElectricCurrent(electricCurrent) // Sets the specified unit of electric current (SI unit if unspecified) 

setUnitSpoon(spoon) // Sets the specified unit of spoon (SI unit if unspecified) 

setUnitCurrency(currency) // Sets the specified currency (USD if unspecified) 
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
        "K": ["kelvins", "kelvin", "k"],
        "C": ["celsius", "c", "°c"],
        "F": ["fahrenheit", "f", "°f"]
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

    "currencyUnits" : {
        "USD": ["usd", "$"],
        "Euro": ["euro","€"],
        "GBP": ["gbp","£"],
        "JPY": ["JPY","¥"],
        "AED": ["AED"], 
        "CNY": ["CNY"], 
        "AUD": ["AUD"],
        "CAD": ["CAD"],
        "CHF": ["CHF"],
        "HKD": ["HKD"],
        "SGD": ["SGD"],
        "SEK": ["SEK"],
        "KRW": ["KRW"],
        "NOK": ["NOK"],
        "NZD": ["NZD"],
        "INR": ["INR"],
        "MXN": ["MXN"],
        "TWD": ["TWD"],
        "ZAR": ["ZAR"],
        "EGP": ["egp"]
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
