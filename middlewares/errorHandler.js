const constants = {
  Bad_Request: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Not_Found: 404,
  Server_Error: 500,
  Not_Implemented: 501,
};

/**
 * Handles errors and sends appropriate error messages based on the status code.
 * @param {Error} err - The error object containing information about the error.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  const errorMessages = {
    [constants.Bad_Request]: "Bad Request",
    [constants.Unauthorized]: "Unauthorized",
    [constants.Forbidden]: "Forbidden",
    [constants.Not_Found]: "Not Found",
    [constants.Server_Error]: "Server Error",
    [constants.Not_Implemented]: "EndPoint Not Implemented",
  };

  const errorMessage = {
    title: errorMessages[statusCode],
    message: err.message,
    stackTrace: err.stack,
  };

  res.status(statusCode).send(errorMessage);
};

module.exports = errorHandler;
