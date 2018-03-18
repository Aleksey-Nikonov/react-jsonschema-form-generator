var express = require('express'),
  fs = require('fs'),
  app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/schemas/isbn', function(req, res) {
  var isbnSchema = fs.readFileSync('./examples/schemas/isbn-entity/isbn.json', 'utf8');
  res.send(isbnSchema);
});

app.listen(3000, function() {
  console.log('listening...');
});