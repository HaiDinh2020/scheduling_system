'use strict'

const StatusCode = {
    FORBIDDENT: 403,
    CONFLICT: 409,
}

const ReasonStatusCode = {
    FORBIDDENT: 'Bad Request Error',
    CONFLICT: 'Conflict Request'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor (message = ReasonStatusCode.CONFLICT, status = StatusCode.CONFLICT ) {
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse {
    constructor (message = ReasonStatusCode.FORBIDDENT, status = StatusCode.FORBIDDENT ) {
        super(message, status)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}