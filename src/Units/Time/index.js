const day = require('./day');
const hour = require('./hour');
const minute = require('./minute');
const month = require('./month');
const second = require('./second');
const week = require('./week');
const year = require('./year');

module.exports = [new day(), new hour(), new minute(), new month(), new second(), new week(), new year()];
