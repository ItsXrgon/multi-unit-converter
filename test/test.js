"use strict";
const MultiUnitConverter = require('../src/MultiUnitConverter.js');

describe('multi-unit-converter', () => {
    
    // Test case for a long string with unit
    test('converts multiple values and units in a string - 1', () => {
        const muc = new MultiUnitConverter();
        const input = 'I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft. Today, the temperature is 72°F. I am 5\'11\" and my weight is 160lbs. We drank 2 gallons of water and 1.5 liters of soda. I also took 2 teaspoons of sugar in my coffee this morning. The length of the room is 12 feet and the width is 10 feet. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
        const expectedOutput = 'I have a 1.83 m tall friend who weighs 79.4 kg. Yesterday, we hiked for 8045 m and climbed 305 m. Today, the temperature is 295 K. I am 1.8 m and my weight is 72.6 kg. We drank 0.00757 m³ of water and 0.0015 m³ of soda. I also took 0.667 tbsp of sugar in my coffee this morning. The length of the room is 3.66 m and the width is 3.05 m. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
  
        expect(muc.convertText(input)).toBe(expectedOutput);
    });

    test('converts multiple values and units in a string - 2', () => {
        const muc = new MultiUnitConverter();
        const input = 'I have a 7ft long sofa that weighs 200lbs. Yesterday, I ran for 10 kilometers and climbed 500 meters. Today, the temperature is 20°C. I am 6 feet tall and my weight is 170lbs. I drank 1 gallon of water and 500 milliliters of juice. I also took 3 tablespoons of sugar in my tea this morning. The length of the kitchen is 15 feet and the width is 8 feet. The height of the ceiling is 3 meters. The weight of the water bottle is 1 kilogram. I have a 60-inch TV that weighs 50 pounds. The length of the garden hose is 50 feet and the width is 0.5 inches. The speed of the car is 60 miles per hour (mph), and it is traveling for 3 hours. The distance it covers is 180 miles';
        const expectedOutput = 'I have a 2.13 m long sofa that weighs 90.7 kg. Yesterday, I ran for 10000 m and climbed 500 meters. Today, the temperature is 293.15 K. I am 1.83 m tall and my weight is 77.1 kg. I drank 0.00379 m³ of water and 0.0005 m³ of juice. I also took 3 tablespoons of sugar in my tea this morning. The length of the kitchen is 4.57 m and the width is 2.44 m. The height of the ceiling is 3 meters. The weight of the water bottle is 1 kilogram. I have a 60-inch TV that weighs 22.7 kg. The length of the garden hose is 15.2 m and the width is 0.0127 m. The speed of the car is 96540 m per hour (mph), and it is traveling for 10800 s. The distance it covers is 289620 m';
  
        expect(muc.convertText(input)).toBe(expectedOutput);
    });

    test('converts multiple values and units in a string - 3', () => {
        const muc = new MultiUnitConverter();
        const input = '2 cups and 3 teaspoons';
        const expectedOutput = '0.000473 m³ and 1 tbsp';
        expect(muc.convertText(input)).toBe(expectedOutput);
    });

    test('converts multiple values and units in a UPPERSCORE string - 3', () => {
        const muc = new MultiUnitConverter();
        const input = '2 CUPS AND 3 TEASPOONS';
        const expectedOutput = '0.000473 m³ AND 1 tbsp';
        expect(muc.convertText(input)).toBe(expectedOutput);
    });
    
    // Test case for a string with a single value and unit
    test('converts single value and unit in string', () => {
        const muc = new MultiUnitConverter();
        muc.setUnitTemperature("C")
        const input = 'The temperature is 68°F';
        const expectedOutput = 'The temperature is 20°C';
        expect(muc.convertText(input)).toBe(expectedOutput);
    });
  
  // Test case for a string with unknown units
    test('handles unknown units', () => {
        const muc = new MultiUnitConverter();
        const input = 'The voltage is 120VAC';
        const expectedOutput = 'The voltage is 120VAC';
        expect(muc.convertText(input)).toBe(expectedOutput);
    });
     
    test('function switches the default unit', () => {
        const muc = new MultiUnitConverter();
        muc.setUnitTime("min");
        expect(muc.time).toBe('min');
    })

    test('function can handle aliases of units', () => {
        const muc = new MultiUnitConverter();
        muc.setUnitLength("miles");
        expect(muc.length).toBe('mi');
    })

    test('function throws an InvalidUnitError', () => {
        const muc = new MultiUnitConverter();
        expect(() => {
            muc.setUnitLength("day");
        }).toThrow('Input day is not a length unit!');
    });

});