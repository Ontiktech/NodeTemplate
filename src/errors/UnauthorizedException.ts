import { CustomException } from "./CustomException";

export class UnauthorizedException extends CustomException {
  statusCode = 401;
  constructor(message: string) {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
    this.name = this.constructor.name;
  }
}