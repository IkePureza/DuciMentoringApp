export default function duciError(errorType, errorContent = null, baseError = null) {
    if (baseError && baseError.constructor === duciError) { // Check if the error thrown is already a SquizError
        this.errorContent = baseError.errorContent;
        this.errorType = baseError.errorType;
        this.baseError = baseError.baseError;
    } else {
        this.errorType = errorType;
        this.errorContent = errorContent;
        this.baseError = baseError;
    }
}
