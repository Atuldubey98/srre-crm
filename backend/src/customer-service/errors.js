export class CustomerNotFound extends Error {
  constructor() {
    super("Customer Not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "CustomerNotFound";
  }
}
