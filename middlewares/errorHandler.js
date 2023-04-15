const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (res.headersSent) {
      return next(err);
    }
  
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
  module.exports = errorHandler;
  