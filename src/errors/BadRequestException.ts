export class BadRequestException extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
    this.name = 'BadRequestException';
  }
}