class apiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = "",
    stack = ""
  ) {
    super(message); //using the constructor of parent: Error class to set the value of error message
    this.statusCode = statusCode;
    this.message = message;
    // this.errors = errors; //this line is reduntant
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { apiError };
