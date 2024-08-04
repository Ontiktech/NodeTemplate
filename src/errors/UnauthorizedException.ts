export class UnauthorizedException extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
    this.name = this.constructor.name;
  }
}