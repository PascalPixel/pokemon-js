var assert = require('assert');
var request = require('request');
var socket = require('socket.io-client');

describe('Pokemon-Mini connection project', function() {
  require('../index.js').server;
  
  it('should be happy', function(done) {
    request('http://localhost:3000', function(err, res, body) {
      if (err) { return done(err); } 
      return done(); 
    });
  });

  it('should be using socket.io', function(done) {
    var client = socket.connect('http://localhost:3000');
    client.on('connect', function() {
      client.disconnect();
      return done();
    });
  });

  it('should redirect to a unique url', function(done) {
    request('http://localhost:3000', function(err, res, body) {
      if (err) { return done(err); }
      console.log(res);
      return done();
    });
  });
});
