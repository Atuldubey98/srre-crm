class UserExistsError extends Error {
  constructor() {
    super("User already exists");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "UserExists";
  }
}

class UserDoesNotExistsError extends Error {
  constructor() {
    super("email does not exists");
    this.code = 400;
    this.stack = Error.captureStackTrace(this);
    this.name = "UserDoesNotExistsError";
  }
}

class EmployeeNotFound extends Error {
  constructor() {
    super("Employee not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "EmployeeNotFound";
  }
}

class PasswordDoestNotMatchError extends Error {
  constructor() {
    super("password does not match");
    this.code = 400;
    this.stack = Error.captureStackTrace(this);
    this.name = "PasswordDoestNotMatchError";
  }
}

class UnAuthenticatedUserError extends Error {
  constructor() {
    super("unauthenticated");
    this.code = 401;
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
