module.exports = function() {
  console.log('Private room middleware connected');
  return function middleware(req, res, next) {
    console.log('Private room middleware called');
    next();
  };
};
