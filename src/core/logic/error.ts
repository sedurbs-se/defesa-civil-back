export class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  possibleStatusCode = [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
    415, 416, 417, 418, 421, 422, 424, 428, 429, 500, 501, 502, 503, 504, 505,
  ];

  private validadeStatusCode(statusCode: number) {
    if (this.possibleStatusCode.indexOf(statusCode) === -1) {
      throw new AppError('Invalid status code', 500);
    }
  }

  constructor(message: string, statusCode = 400) {
    super();
    this.message = message;

    this.validadeStatusCode(statusCode);

    this.statusCode = statusCode;
  }
}
