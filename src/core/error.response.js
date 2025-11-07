"use strict";

const StatusCodes = {
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ReasonStatusCode = {
  FORBIDDEN: "Forbidden",
  CONFLICT: "Conflict",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Not Found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message=ReasonStatusCode.CONFLICT, statusCode = StatusCodes.CONFLICT) { 
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message=ReasonStatusCode.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message=ReasonStatusCode.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message=ReasonStatusCode.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message=ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(message=ReasonStatusCode.INTERNAL_SERVER_ERROR, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  InternalServerError,
};