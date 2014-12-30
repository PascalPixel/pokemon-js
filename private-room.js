module.exports = function() {
  return function middleware(req, res, next) {
    next();
  };
};
