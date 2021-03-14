require("mongoose")

const errorHandler = (error, request, response, next) => {
  console.log("error handler: ", error)

  if (error.name === "CastError") {
    return response.status(400).send({ message: "malformatted id" })
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ message: error.message })
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    })
  }
  next(error)
}

module.exports = errorHandler
