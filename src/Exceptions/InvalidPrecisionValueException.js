"use strict";
class InvalidPrecisionValueException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidPrecisionValueException';
    }
}

module.exports = {
    InvalidPrecisionValueException
}