const convertText = require('./convertText');

x = new convertText()
console.log(x.length)
x.convertText("10 ft")

module.exports = {convertText}