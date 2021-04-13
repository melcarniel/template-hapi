const express = require('express');
const path = require('path');
const app = express();

// Health Check
app.get('/ping', function (req, res, next) {
  res.send({ status: 'ok' });
});

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Redirect para todas as rotas
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});