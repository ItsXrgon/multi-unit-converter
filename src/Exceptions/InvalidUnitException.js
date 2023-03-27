"use strict";
class InvalidUnitException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidUnitException';
    }
}

module.exports = {
    InvalidUnitException
}