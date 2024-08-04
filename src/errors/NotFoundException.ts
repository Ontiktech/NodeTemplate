export class NotFoundException extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
    this.name = this.constructor.name;
  }
}