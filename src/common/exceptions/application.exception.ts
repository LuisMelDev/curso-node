export class ApplicationException extends Error {
    constructor(message = "an error has occurred") {
        super(message);
    }
}
