// Create web server, handle GET and POST requests
// GET request: return all comments
// POST request: add a new comment
// The comments are stored in a JSON file

// Load required modules
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

// Create web server
http.createServer(function (req, res) {
  if (req.method === 'GET') {
    // Read and return all comments
    fs.readFile('comments.json', 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST') {
    // Read and store new comment
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var comment = qs.parse(body);
      fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var comments = JSON.parse(data);
          comments.push(comment);
          fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
            if (err) {
              console.log(err);
            } else {
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.end('Comment added');
            }
          });
        }
      });
    });
  } else {
    res.writeHead(501, { 'Content-Type': 'text/plain' });
    res.end(req.method + ' is not supported');
  }
}).listen(3000, '
