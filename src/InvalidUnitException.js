class InvalidUnitException extends Error {
    InvalidUnitException(message) {
        super(message);
        this.name = this.constuctor.name;
    }
}