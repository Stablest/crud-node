import { CustomAPIError } from "./custom-api-error";

class AuthorizationError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export { AuthorizationError };
