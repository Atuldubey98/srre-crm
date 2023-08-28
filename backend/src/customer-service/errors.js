export class CustomerNotFound extends Error {
  constructor() {
    super("Customer Not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "CustomerNotFound";
  }
}

export class AddressNotFound extends Error {
  constructor() {
    super("Address Not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "AddressNotFound";
  }
}

export class CustomerBeingUsedByReportError extends Error {
  constructor() {
    super("Reports exists for this customer");
    this.code = 400;
    this.stack = Error.captureStackTrace(this);
    this.name = "CUSTOMER_BEING_USED";
  }
}
