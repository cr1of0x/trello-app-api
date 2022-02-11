class ApiError {
  constructor(message, key, status = 400) {
    this.message = message;
    this.status = status;
    this.key = key;
  }
}

module.exports = ApiError;
