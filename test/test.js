const convertText = require('../src/convertText.js');

describe('js-unit-converter', () => {
    
    // Test case for a long string with unit
    test('converts multiple values and units in string', () => {
        cu = new convertText();
        const input = 'I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft. Today, the temperature is 72°F. I am 5\'11\" and my weight is 160lbs. We drank 2 gallons of water and 1.5 liters of soda. I also took 2 teaspoons of sugar in my coffee this morning. The length of the room is 12 feet and the width is 10 feet. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
        const expectedOutput = 'I have a 1.829 m tall friend who weighs 79.365 kg. Yesterday, we hiked for 8045 m and climbed 304.785 m. Today, the temperature is 295.372 K. I am 1.803 m and my weight is 72.562 kg. We drank 0.008 m³ of water and 0.002 m³ of soda. I also took 0.667 tbsp of sugar in my coffee this morning. The length of the room is 3.657 m and the width is 3.048 m. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
  
        expect(cu.convertText(input)).toBe(expectedOutput);
    });

    // Test case for a string with a single value and unit
    test('converts single value and unit in string', () => {
        cu = new convertText();
        cu.setUnitTemperature("C")
        const input = 'The temperature is 68°F';
        const expectedOutput = 'The temperature is 20°C';
        expect(cu.convertText(input)).toBe(expectedOutput);
    });
    
    // Test case for a string with units in a different order
    test('handles units in a different order', () => {
        cu = new convertText();
        const input = 'The dimensions are 3m x 2m x 1m';
        const expectedOutput = 'The dimensions are 3m x 2m x 1m';
        expect(cu.convertText(input)).toBe(expectedOutput);
    });
  
  // Test case for a string with unknown units
    test('handles unknown units', () => {
        cu = new convertText();
        const input = 'The voltage is 120VAC';
        const expectedOutput = 'The voltage is 120VAC';
        expect(cu.convertText(input)).toBe(expectedOutput);
    });
     
    test('function switches the default unit', () => {
        cu = new convertText();
        cu.setUnitTime("min");
        expect(cu.time).toBe('min');
    })

    test('function can handle aliases of units', () => {
        cu = new convertText();
        cu.setUnitLength("miles");
        expect(cu.length).toBe('mi');
    })

    test('function throws an InvalidUnitError', () => {
        cu = new convertText();
        expect(() => {
            cu.setUnitLength("day");
        }).toThrow('Input day is not a length unit!');
    });
});

