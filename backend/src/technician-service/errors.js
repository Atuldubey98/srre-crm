export class TechnicianNotFound extends Error {
  constructor() {
    super("Technician Not found");
    this.code = 404;
    this.stack = Error.captureStackTrace(this);
    this.name = "TechnicianNotFound";
  }
}
