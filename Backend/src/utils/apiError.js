class apiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = "",
    stack = ""
  ) {
    super(message); //using the constructor of parent class(i.e Error class) to set the value of Error.message
    this.statusCode = statusCode;
    // this.message = message; //this line is reduntant
    this.errors = errors; 
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
