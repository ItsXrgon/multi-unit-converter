const convertText = require('./convertText');
const units = require("./units.json"); 

x = new convertText()
const text = x.convertText(`I have a 6ft tall friend who weighs 175lbs. Yesterday, we hiked for 5 miles and climbed 1000ft. Today, the temperature is 72°F. I am 5'11" and my weight is 160lbs. We drank 2 gallons of water and 1.5 liters of soda. I also took 2 teaspoons of sugar in my coffee this morning. The length of the room is 12 feet and the width is 10 feet. The height of the ceiling is 2.5 meters. The weight of the watermelon is 5 kilograms.`)
console.log(text)


module.exports = {convertText}