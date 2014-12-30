var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendfile("public/app.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("move selected", function(action) {
    console.log("move selected: " + action);
    io.emit("move selected", action);
  });
});

exports.server = http.listen(3000, function() {
  console.log("listening on *:3000");
});
