export class ForbiddenException extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
    this.name = this.constructor.name;
  }
}