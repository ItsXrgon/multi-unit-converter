"use strict";
class InvalidPrecisionValue extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidPrecisionValue';
    }
}

module.exports = {
    InvalidPrecisionValue
}