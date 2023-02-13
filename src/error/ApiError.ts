class ApiError extends Error {
  message = '';
  status = 500;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}

export default ApiError;
