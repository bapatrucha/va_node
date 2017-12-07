module.exports = {
  createErrorDetails(error, statusCode, errorMessage) {
    var errorDetails = {
      "error": error,
      "statusCode": statusCode,
      "userMessage": errorMessage
    };
    return {"error": errorDetails};
  }
}
