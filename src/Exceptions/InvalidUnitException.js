class InvalidUnitException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidUnitException';
    }
}

export default InvalidUnitException;