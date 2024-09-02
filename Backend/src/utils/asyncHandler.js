const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.code || error.statusCode || 500).json({
        success: false,
        message: error.message || "An unexpected error occurred",
        statusCode: error.code || error.statusCode || 500,
      });
    }
  };
};

export { asyncHandler };
