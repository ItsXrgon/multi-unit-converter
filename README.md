# SI-Unit-Converter
This is a JS library that converts all units and values in a given text to user specified units or ti their SI equivalents if specified.

# Installation
You can install this library using npm:

```npm install js-unit-converter```

#Usage
To use this library, first import it into your project using require or import:

`const jsUnitConverter = require('si-unit-converter');
const cu = new jsUnitConverter();`

You can then use the convertText(text) command to convert a text string to its SI equivalent:

`const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = cu.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80.47 km and used 18.93 l of gas.'`
In this example, we pass the input text string 'The car traveled 50 miles and used 5 gallons of gas.' to the convertText() command, and store the output in the outputText variable. We then log the output using console.log(), which should return the string 'The car traveled 80.47 kilometers and used 18.93 liters of gas.'.


`
cu.setUnitLength(m);
const inputText = 'The car traveled 50 miles and used 5 gallons of gas.';
const outputText = cu.convertText(inputText);
console.log(outputText); // Output: 'The car traveled 80470 m and used 18.93 l of gas.'`

# API
convertText(text)
Converts all units and values in the input text string to their SI equivalents. Returns the converted text string.

# Parameters:

text (string): The input text string to be converted.
Returns:

(string): The converted text string.

#License
This library is released under the MIT License. See LICENSE for more information.

Contributing
Contributions to this library are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository.

Contact
If you have any questions or concerns about this library, please feel free to contact me at ali.koheil@gmail.com
