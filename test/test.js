"use strict";
const MultiUnitConverter = require('../src/MultiUnitConverter.js');

describe('multi-unit-converter', () => {
    
    // Test case for a long string with unit
    test('converts multiple values and units in a short string', () => {
        const muc = new MultiUnitConverter();
        const input = 'I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft. Today, the temperature is 72°F. I am 5\'11\" and my weight is 160lbs. We drank 2 gallons of water and 1.5 liters of soda. I also took 2 teaspoons of sugar in my coffee this morning. The length of the room is 12 feet and the width is 10 feet. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
        const expectedOutput = 'I have a 1.829 m tall friend who weighs 79.365 kg. Yesterday, we hiked for 8045 m and climbed 304.785 m. Today, the temperature is 295.372 K. I am 1.803 m and my weight is 72.562 kg. We drank 0.008 m³ of water and 0.002 m³ of soda. I also took 0.667 tbsp of sugar in my coffee this morning. The length of the room is 3.657 m and the width is 3.048 m. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.';
  
        expect(muc.convertText(input)).toBe(expectedOutput);
    });

    test('converts multiple values and units in a long string', () => {
        const muc = new MultiUnitConverter();
        const input = 'I have a 7ft long sofa that weighs 200lbs. Yesterday, I ran for 10 kilometers and climbed 500 meters. Today, the temperature is 20°C. I am 6 feet tall and my weight is 170lbs. I drank 1 gallon of water and 500 milliliters of juice. I also took 3 tablespoons of sugar in my tea this morning. The length of the kitchen is 15 feet and the width is 8 feet. The height of the ceiling is 3 meters. The weight of the water bottle is 1 kilogram. I have a 60-inch TV that weighs 50 pounds. The length of the garden hose is 50 feet and the width is 0.5 inches. The speed of the car is 60 miles per hour (mph), and it is traveling for 3 hours. The distance it covers is 180 miles';
        const expectedOutput = 'I have a 2.133 m long sofa that weighs 90.703 kg. Yesterday, I ran for 10000 m and climbed 500 meters. Today, the temperature is 293.15 K. I am 1.829 m tall and my weight is 77.098 kg. I drank 0.004 m³ of water and 0.001 m³ of juice. I also took 3 tablespoons of sugar in my tea this morning. The length of the kitchen is 4.572 m and the width is 2.438 m. The height of the ceiling is 3 meters. The weight of the water bottle is 1 kilogram. I have a 60-inch TV that weighs 22.676 kg. The length of the garden hose is 15.239 m and the width is 0.013 m. The speed of the car is 96540 m per hour (mph), and it is traveling for 3 hours. The distance it covers is 289620 m';
  
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
    
    // Test case for a string with units in a different order
    test('handles units in a different order', () => {
        const muc = new MultiUnitConverter();
        const input = 'The dimensions are 3m x 2m x 1m';
        const expectedOutput = 'The dimensions are 3m x 2m x 1m';
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