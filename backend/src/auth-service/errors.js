import httpStatusCodes from "http-status-codes";

class UserExistsError extends Error {
  constructor() {
    super("User already exists");
    this.code = httpStatusCodes.CONFLICT;
    this.stack = Error.captureStackTrace(this);
    this.name = "UserExists";
  }
}

class UserDoesNotExistsError extends Error {
  constructor() {
    super("email does not exists");
    this.code = httpStatusCodes.UNAUTHORIZED;
    this.stack = Error.captureStackTrace(this);
    this.name = "UserDoesNotExistsError";
  }
}

class EmployeeNotFound extends Error {
  constructor() {
    super("Employee not found");
    this.code = httpStatusCodes.NOT_FOUND;
    this.stack = Error.captureStackTrace(this);
    this.name = "EmployeeNotFound";
  }
}

class PasswordDoestNotMatchError extends Error {
  constructor() {
    super("password does not match");
    this.code = httpStatusCodes.UNAUTHORIZED;
    this.stack = Error.captureStackTrace(this);
    this.name = "PasswordDoestNotMatchError";
  }
}

class UnAuthenticatedUserError extends Error {
  constructor() {
    super("unauthenticated");
    this.code = httpStatusCodes.UNAUTHORIZED;
    this.stack = Error.captureStackTrace(this);
    this.name = "UnAuthenticatedUserError";
  }
}
export {
  UserExistsError,
  UserDoesNotExistsError,
  PasswordDoestNotMatchError,
  UnAuthenticatedUserError,
  EmployeeNotFound,
};
