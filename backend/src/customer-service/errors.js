import httpStatusCodes from "http-status-codes";
export class CustomerNotFound extends Error {
  constructor() {
    super("Customer Not found");
    this.code = httpStatusCodes.NOT_FOUND;
    this.stack = Error.captureStackTrace(this);
    this.name = "CustomerNotFound";
  }
}

export class AddressNotFound extends Error {
  constructor() {
    super("Address Not found");
    this.code = httpStatusCodes.NOT_FOUND;
    this.stack = Error.captureStackTrace(this);
    this.name = "AddressNotFound";
  }
}

export class CustomerBeingUsedByReportError extends Error {
  constructor() {
    super("Reports exists for this customer");
    this.code = httpStatusCodes.BAD_REQUEST;
    this.stack = Error.captureStackTrace(this);
    this.name = "CUSTOMER_BEING_USED";
  }
}
