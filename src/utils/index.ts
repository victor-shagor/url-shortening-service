export class HttpError extends Error {
    statusCode = 400
    constructor(message: string, status: number) {
        super(message)
        this.statusCode = status
    }
}

export const ErrorResponseObject = (error: any) => {
    if (error instanceof HttpError) {
        const { message, statusCode } = error
        return { message, statusCode }
    }
    return { message: 'Something went wrong, try again later', statusCode: 500 }
}
