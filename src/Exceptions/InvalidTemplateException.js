"use strict";
class InvalidTemplateException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTemplateException';
    }
}

module.exports = {
    InvalidTemplateException
}