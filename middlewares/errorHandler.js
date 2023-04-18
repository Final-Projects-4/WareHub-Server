const errorHandler = (err, req, res, next) => {
    if(err.name === "ErrorNotFound") {
      res.status(404).json({
        message: "Error Not Found"
      })
    } else if(err.name === "InvalidCredential") {
      res.status(402).json({
        message: "Invalid Username or Password"
      })
    } else {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  };
  
  module.exports = errorHandler;
  