const errorHandler = (err, req, res, next) => {
    console.log(err)
    if(err.name === "ErrorNotFound") {
      res.status(404).json({
        message: "Error Not Found"
      })
    } else if(err.name === "InvalidCredential") {
      res.status(402).json({
        message: "Invalid Username or Password"
      })
    } else if(err.name === "BadRequest") {
      res.status(400).json({
        message: "Bad Request"
      })
    } else if(err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "Unique Constraint Error"
      })
    } else {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  };
  
  module.exports = errorHandler;
  