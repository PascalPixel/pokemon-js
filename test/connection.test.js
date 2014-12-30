var assert = require('assert');
var request = require('request');

describe('Pokemon-Mini connection project', function() {
  it('should be happy', function(done) {
    request('http://localhost:3000', function(err, res, body) {
      if (err) { return done(err); } 
      console.log(res);
      done(); 
    });
  });
});
