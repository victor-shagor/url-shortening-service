/**
 * custom error class
 * @param {string} message - error message
 * @param {number} statusCode - error code
 * @returns {object} - returns error object of message and status code
 */
export class HttpError extends Error {
    statusCode = 400
    constructor(message: string, status: number) {
        super(message)
        this.statusCode = status
    }
}

/**
 * custom error class
 * @param {object} error - error object
 * @returns {object} - returns error object of message and status code
 */
export const ErrorResponseObject = (error: any) => {
    if (error instanceof HttpError) {
        const { message, statusCode } = error
        return { message, statusCode }
    }
    return { message: 'Something went wrong, try again later', statusCode: 500 }
}
