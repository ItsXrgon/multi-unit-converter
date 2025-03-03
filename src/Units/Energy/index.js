const joule = require('./joule');
const kilojoule = require('./kilojoule');
const kilowatthour = require('./kilowatthour');
const megajoule = require('./megajoule');

module.exports = [new joule(), new kilojoule(), new kilowatthour(), new megajoule()];
